// We don't use `transformer` prop in `input({ ... })` because that makes the input quite laggy.

import { input, select } from '@inquirer/prompts'
import dayjs from 'dayjs'
import dotenv from 'dotenv'

import { initializeConsole } from './utils/initializeConsole.js'
import { isEmpty } from './utils/isEmpty.js'
import { validateDateInput } from './validators/validateDateInput.js'
import { validateRepositoryInput } from './validators/validateRepositoryInput.js'

import './utils/disableNodeExperimentalWarnings.js'
import { getGithubRepository } from './api/getGithubRepository.js'
import { Source } from './types.js'

dotenv.config()

export async function promptUserForOptions(): Promise<{
  from: Date | null
  repositoryDefaultBranch: string
  repositoryName: string
  repositoryOwner: string
  source: Source
  targetLanguage: string | null
  to: Date | null
}> {
  initializeConsole()

  // ---------------------------------------------------------------------------
  // Prompt user for repository owner and name

  const rawRepository = await input({
    message: 'Repository (i.e.: "betagouv/api.gouv.fr" or "https://github.com/betagouv/api.gouv.fr"):\n',
    validate: validateRepositoryInput,
  })
  const repository = rawRepository.trim().replace(/\/+$/, '')
  console.log()

  const [repositoryOwner, repositoryName] = repository.split('/').splice(-2)
  const { default_branch: repositoryDefaultBranch } = await getGithubRepository(repositoryOwner, repositoryName)

  // ---------------------------------------------------------------------------
  // Prompt user for repository owner and name

  const source = await select({
    message: 'What source do you want to use to generate the Deliverable contents?',
    choices: [
      {
        name: `Commit Messages History (from \`${repositoryDefaultBranch}\` branch)`,
        value: Source.COMMIT_MESSAGE_HISTORY,
      },
      {
        disabled: "# Disabled because it's not implemented yet.",
        name: `Merged Pull Requests History (from \`${repositoryDefaultBranch}\` branch)`,
        value: Source.MERGED_PULL_REQUEST_HISTORY,
      },
      {
        name: `Releases History (excluding drafts and pre-releases)`,
        value: Source.RELEASE_HISTORY,
      },
    ],
  })

  // ---------------------------------------------------------------------------
  // Prompt user for start and end dates (month and year)

  const rawFromAsString = await input({
    message: 'From month ("YYYY/MM", "YYYYMM", or just leave empty to skip it):\n',
    validate: validateDateInput,
  })
  const fromAsString = rawFromAsString.trim()
  if (fromAsString.length) console.log()

  const rawToAsString = await input({
    message: 'To month ("YYYY/MM", "YYYYMM", or just leave empty to skip it):\n',
    validate: validateDateInput,
  })
  const toAsString = rawToAsString.trim()
  if (toAsString.length) console.log()

  // ---------------------------------------------------------------------------
  // Prompt user for Deliverable target language (for auto-translation)

  const rawTargetLanguage = await input({
    message: 'Target language (i.e.: "fr", "jp", or just leave empty to skip it):\n',
  })
  const targetLanguage = !isEmpty(rawTargetLanguage) ? rawTargetLanguage.trim().toLowerCase() : null
  if (targetLanguage) console.log()

  const from = !isEmpty(fromAsString) ? dayjs(fromAsString).startOf('month').toDate() : null
  const to = !isEmpty(toAsString) ? dayjs(toAsString).endOf('month').toDate() : null

  return {
    from,
    repositoryDefaultBranch,
    repositoryName,
    repositoryOwner,
    source,
    targetLanguage,
    to,
  }
}
