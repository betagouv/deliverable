// We don't use `transformer` prop in `input({ ... })` because that makes the input quite laggy.

import { input } from '@inquirer/prompts'
import { translate } from '@vitalets/google-translate-api'
import dayjs from 'dayjs'
import dotenv from 'dotenv'
import { writeFile } from 'fs/promises'

import { getGithubRepositoryReleases } from './api/getGithubRepositoryReleases.js'
import { mapDeliverableChaptersToMarkdownRows } from './mappers/mapDeliverableChaptersToMarkdownRows.js'
import { mapGithubRepositoryReleasesToDeliverableChapters } from './mappers/mapGithubRepositoryReleasesToDeliverableChapters.js'
import { initializeConsole } from './utils/initializeConsole.js'
import { spinner } from './utils/spinner.js'
import { validateDateInput } from './validators/validateDateInput.js'
import { validateRepositoryInput } from './validators/validateRepositoryInput.js'

import './utils/disableNodeExperimentalWarnings.js'
import { isEmpty } from './utils/isEmpty.js'

dotenv.config()

async function start() {
  initializeConsole()

  // ---------------------------------------------------------------------------
  // Ask user for input

  const rawRepository = await input({
    message: 'Repository (i.e.: "betagouv/api.gouv.fr" or "https://github.com/betagouv/api.gouv.fr"):\n',
    validate: validateRepositoryInput,
  })
  const repository = rawRepository.trim().replace(/\/+$/, '')
  console.log()

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

  const rawTargetLanguage = await input({
    message: 'Target language (i.e.: "fr", "jp", or just leave empty to skip it):\n',
  })
  const targetLanguage = !isEmpty(rawTargetLanguage) ? rawTargetLanguage.trim().toLowerCase() : null
  if (targetLanguage) console.log()

  // ---------------------------------------------------------------------------
  // Generate deliverable Markdown file

  // Fetch GitHub repository releases
  const [repositoryOwner, repositoryName] = repository.split('/').splice(-2)
  spinner.start(`Fetching GitHub repository releases from "${repositoryOwner}/${repositoryName}"...`)
  const from = !isEmpty(fromAsString) ? dayjs(fromAsString).startOf('month').toDate() : null
  const to = !isEmpty(toAsString) ? dayjs(toAsString).endOf('month').toDate() : null
  const githubRepositoryReleases = await getGithubRepositoryReleases(repositoryOwner, repositoryName, from, to)
  spinner.succeed(
    `Fetched ${githubRepositoryReleases.length} GitHub repository releases from "${repositoryOwner}/${repositoryName}".`,
  )

  spinner.start(`Generating Deliverable Markdown source...`)
  // Map GitHub repository releases to clean and normalized Markdown rows
  const deliverableChapters = mapGithubRepositoryReleasesToDeliverableChapters(githubRepositoryReleases)
  const deliverableMarkdownRows = mapDeliverableChaptersToMarkdownRows(deliverableChapters)
  // Merge Markdown rows into a single Markdown source
  const deliverableMarkdownSource = deliverableMarkdownRows.join('\n')
  spinner.succeed(`Deliverable Markdown source generated.`)

  let translatedDeliverableMarkdownSource = deliverableMarkdownSource
  if (targetLanguage) {
    // Translate Markdown source to target language
    spinner.start(`Translating Deliverable from "en" to "${targetLanguage}"...`)
    const { text } = await translate(deliverableMarkdownSource, { to: targetLanguage })
    translatedDeliverableMarkdownSource = text
    spinner.succeed(`Deliverable translated into "${targetLanguage}".`)
  }

  // Write translated Markdown source into a file
  const deliverableFilePath = `${process.cwd()}/Deliverable.md`
  spinner.start(`Writting Deliverable Markdown source to "${deliverableFilePath}"...`)
  await writeFile(deliverableFilePath, translatedDeliverableMarkdownSource, 'utf-8')
  spinner.succeed(`Deliverable Markdown source written to "${deliverableFilePath}".`)

  spinner.succeed(`Done.\n\n`).stop()
}

start()
