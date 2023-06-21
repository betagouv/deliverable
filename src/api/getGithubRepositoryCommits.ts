import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween.js'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter.js'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore.js'

import { octokit } from './octokit.js'
import { GithubCommit } from './types'
import { spinner } from '../utils/spinner.js'
import { waitFor } from '../utils/waitFor.js'

dayjs.extend(isBetween)
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

type GetGithubRepositoryCommitsInternals = {
  page: number
  previousGithubApiRepositoryCommits: GithubCommit[]
}

export async function getGithubRepositoryCommits(
  repositoryBranch: string,
  repositoryOwner: string,
  repositoryName: string,
  fromDate: Date | null,
  toDate: Date | null,
  { page, previousGithubApiRepositoryCommits }: GetGithubRepositoryCommitsInternals = {
    page: 0,
    previousGithubApiRepositoryCommits: [],
  },
): Promise<GithubCommit[]> {
  if (page > 0) {
    // Prevent Github API throttling
    await waitFor(1000)
  }

  spinner.text = `Fetching GitHub repository commits from "${repositoryOwner}/${repositoryName}" (page ${page + 1})...`

  const { data: nextGithubApiRepositoryCommits } = await octokit.rest.repos.listCommits({
    owner: repositoryOwner,
    page,
    per_page: 100,
    repo: repositoryName,
    // SHA or branch to start listing commits from. Default: the repository’s default branch (usually main).
    // Meaning it's unnecessary for our current case. But it can be useful later on.
    sha: repositoryBranch,
    since: fromDate?.toISOString(),
    until: toDate?.toISOString(),
  })

  const currentGithubApiRepositoryCommits = [...previousGithubApiRepositoryCommits, ...nextGithubApiRepositoryCommits]

  if (nextGithubApiRepositoryCommits.length === 100) {
    return getGithubRepositoryCommits(repositoryBranch, repositoryOwner, repositoryName, fromDate, toDate, {
      page: page + 1,
      previousGithubApiRepositoryCommits: currentGithubApiRepositoryCommits,
    })
  }

  const githubRepositoryCommits: GithubCommit[] = currentGithubApiRepositoryCommits.map(
    ({ author, commit, html_url, sha }) => ({
      author,
      commit,
      html_url,
      sha,
    }),
  )

  return githubRepositoryCommits
}
