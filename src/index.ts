// We don't use `transformer` prop in `input({ ... })` because that makes the input quite laggy.

import { input } from '@inquirer/prompts'
import { translate } from '@vitalets/google-translate-api'
import dayjs from 'dayjs'
import dotenv from 'dotenv'
import { writeFile } from 'fs/promises'
import { isEmpty } from 'ramda'

import { getGithubRepositoryReleases } from './api/getGithubRepositoryReleases.js'
import { mapDeliverableChaptersToMarkdownRows } from './mappers/mapDeliverableChaptersToMarkdownRows.js'
import { mapGithubRepositoryReleasesToDeliverableChapters } from './mappers/mapGithubRepositoryReleasesToDeliverableChapters.js'
import { validateDateInput } from './validators/validateDateInput.js'
import { validateRepositoryInput } from './validators/validateRepositoryInput.js'

dotenv.config()

async function start() {
  const rawRepository = await input({
    message: 'Repository (i.e.: "betagouv/api.gouv.fr" or "https://github.com/betagouv/api.gouv.fr"):',
    validate: validateRepositoryInput,
  })
  const repository = rawRepository.trim().replace(/\/+$/, '')

  const rawFromAsString = await input({
    message: 'From month ("YYYY/MM", "YYYYMM", or just leave empty to skip it):',
    validate: validateDateInput,
  })
  const fromAsString = rawFromAsString.trim()

  const rawToAsString = await input({
    message: 'To month ("YYYY/MM", "YYYYMM", or just leave empty to skip it):',
    validate: validateDateInput,
  })
  const toAsString = rawToAsString.trim()

  const rawTargetLanguage = await input({
    message: 'Target language (i.e.: "fr", "jp", or just leave empty to skip it):',
  })
  const targetLanguage = !isEmpty(rawTargetLanguage.trim()) ? rawTargetLanguage.trim().toLowerCase() : null

  // We fetch the GitHub repository releases
  const [repositoryOwner, repositoryName] = repository.split('/').splice(-2)
  const from = !isEmpty(fromAsString) ? dayjs(fromAsString).startOf('month').toDate() : null
  const to = !isEmpty(toAsString) ? dayjs(toAsString).endOf('month').toDate() : null
  console.log(from?.toISOString())
  console.log(to?.toISOString())
  /*const githubRepositoryReleases = await getGithubRepositoryReleases(repositoryOwner, repositoryName, from, to)

  console.debug(`Parsing and formatting chapters...`)

  // We map the GitHub repository releases to clean and normalized Markdown rows
  const deliverableChapters = mapGithubRepositoryReleasesToDeliverableChapters(githubRepositoryReleases)
  const deliverableMarkdownRows = mapDeliverableChaptersToMarkdownRows(deliverableChapters)

  // We merge the Markdown rows into a single Markdown source
  const deliverableMarkdownSource = deliverableMarkdownRows.join('\n')

  // We translate it into the target language
  console.debug(`Translating Markdown output from "en" to "${targetLanguage}"...`)
  const { text: translatedDeliverableMarkdownSource } = targetLanguage
    ? await translate(deliverableMarkdownSource, { to: targetLanguage })
    : { text: deliverableMarkdownSource }

  // We write the translated Markdown source into a file
  const deliverableFilePath = `${process.cwd()}/Deliverable.md`
  console.debug(`Writting Markdown output to "${deliverableFilePath}"...`)
  await writeFile(deliverableFilePath, translatedDeliverableMarkdownSource, 'utf-8')

  console.debug(`Done:\n\n`)
  console.debug(translatedDeliverableMarkdownSource)*/
}

start()
