import { isEmpty } from 'ramda'

import { octokit } from '../api/octokit.js'

export async function validateRepositoryInput(rawRepositoryInput: string): Promise<boolean | string> {
  const repositoryInput = rawRepositoryInput.trim().replace(/\/+$/, '')

  if (isEmpty(repositoryInput)) {
    return 'The repository is mandatory.'
  }

  const [repositoryOwnerInput, repositoryNameInput] = repositoryInput.split('/').splice(-2)
  if (!repositoryNameInput || isEmpty(repositoryOwnerInput) || !repositoryNameInput || isEmpty(repositoryNameInput)) {
    return 'The repository must be in the format "owner/repository" or "https://github.com/owner/repository".'
  }

  try {
    await octokit.rest.repos.get({
      owner: repositoryOwnerInput,
      repo: repositoryNameInput,
    })
  } catch (err: any) {
    if (err && err.status === 404) {
      return 'The Github repository does not exist.'
    }

    console.log(err)
    throw new Error('Something went wrong.')
  }

  return true
}
