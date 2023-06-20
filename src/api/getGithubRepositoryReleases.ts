import { pick } from 'ramda'
import { GithubRepositoryRelease } from './types'
import { writeFile } from 'fs/promises'
import { waitFor } from '../utils/waitFor.js'
import { octokit } from './octokit.js'

import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween.js'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter.js'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore.js'

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
  console.debug(`Fetching Github repository releases for ${repositoryOwner}/${repositoryName} (page ${page + 1})...`)

  // Prevent Github API throttling
  await waitFor(1000)

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
    .map(pick(['body', 'name', 'published_at', 'tag_name', 'url']) as any)

  return githubRepositoryReleases
}
