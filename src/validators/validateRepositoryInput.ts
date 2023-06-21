import { getGithubRepository } from '../api/getGithubRepository.js'
import { isEmpty } from '../utils/isEmpty.js'

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
    await getGithubRepository(repositoryOwnerInput, repositoryNameInput)
  } catch (err: any) {
    if (err && err.status === 404) {
      return 'This Github repository does not exist.'
    }

    console.error(err)
    throw new Error('Something went wrong.')
  }

  return true
}
