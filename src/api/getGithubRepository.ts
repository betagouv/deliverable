import { octokit } from './octokit.js'
import { GithubRepository } from './types.js'

export async function getGithubRepository(repositoryOwner: string, repositoryName: string): Promise<GithubRepository> {
  const { data: githubApiRepository } = await octokit.rest.repos.get({
    owner: repositoryOwner,
    repo: repositoryName,
  })

  return githubApiRepository
}
