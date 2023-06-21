import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween.js'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter.js'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore.js'

import { octokit } from './octokit.js'
import { GithubRepositoryRelease } from './types'
import { spinner } from '../utils/spinner.js'
import { waitFor } from '../utils/waitFor.js'

dayjs.extend(isBetween)
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

type GetGithubRepositoryReleasesInternals = {
  page: number
  previousGithubApiRepositoryReleases: GithubRepositoryRelease[]
}

export async function getGithubRepositoryReleases(
  repositoryOwner: string,
  repositoryName: string,
  from: Date | null,
  to: Date | null,
  { page, previousGithubApiRepositoryReleases }: GetGithubRepositoryReleasesInternals = {
    page: 0,
    previousGithubApiRepositoryReleases: [],
  },
): Promise<GithubRepositoryRelease[]> {
  if (page > 0) {
    // Prevent Github API throttling
    await waitFor(1000)
  }

  spinner.text = `Fetching GitHub repository releases from "${repositoryOwner}/${repositoryName}" (page ${page + 1})...`

  const { data: nextGithubApiRepositoryReleases } = await octokit.rest.repos.listReleases({
    owner: repositoryOwner,
    per_page: 100,
    page,
    repo: repositoryName,
  })

  const currentGithubApiRepositoryReleases = [
    ...previousGithubApiRepositoryReleases,
    ...nextGithubApiRepositoryReleases,
  ]

  if (nextGithubApiRepositoryReleases.length === 100) {
    return await getGithubRepositoryReleases(repositoryOwner, repositoryName, from, to, {
      page: page + 1,
      previousGithubApiRepositoryReleases: currentGithubApiRepositoryReleases,
    })
  }

  const githubRepositoryReleases: GithubRepositoryRelease[] = currentGithubApiRepositoryReleases
    .filter(({ draft, prerelease }) => !draft && !prerelease)
    .filter(({ published_at }) => {
      if (from) {
        if (to) {
          return dayjs(published_at).isBetween(from, to, 'day')
        }

        return dayjs(published_at).isSameOrAfter(from, 'day')
      }

      if (to) {
        return dayjs(published_at).isSameOrBefore(to, 'day')
      }

      return true
    })
    .map(({ body, draft, name, prerelease, published_at, tag_name, url }) => ({
      body,
      draft,
      name,
      prerelease,
      published_at,
      tag_name,
      url,
    }))

  return githubRepositoryReleases
}
