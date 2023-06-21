// We don't use `transformer` prop in `input({ ... })` because that makes the input quite laggy.

import { translate } from '@vitalets/google-translate-api'
import dotenv from 'dotenv'
import { $ } from 'execa'
import { writeFile } from 'fs/promises'

import { getGithubRepository } from './api/getGithubRepository.js'
import { getGithubRepositoryReleases } from './api/getGithubRepositoryReleases.js'
import { mapDeliverableChaptersToMarkdownRows } from './mappers/mapDeliverableChaptersToMarkdownRows.js'
import { mapGithubCommitsToDeliverableChapters } from './mappers/mapGithubCommitsToDeliverableChapters.js'
import { mapGithubReleasesToDeliverableChapters } from './mappers/mapGithubReleasesToDeliverableChapters.js'
import { hasPandoc } from './utils/hasPandoc.js'
import { spinner } from './utils/spinner.js'

import './utils/disableNodeExperimentalWarnings.js'
import { promptUserForOptions } from './promptUserForOptions.js'
import { DeliverableChapter, Source } from './types.js'
import { getGithubRepositoryCommits } from './api/getGithubRepositoryCommits.js'

dotenv.config()

async function start() {
  const { from, repositoryDefaultBranch, repositoryName, repositoryOwner, source, targetLanguage, to } =
    await promptUserForOptions()

  let deliverableChapters: DeliverableChapter[]

  switch (source) {
    case Source.COMMIT_MESSAGE_HISTORY:
      // Fetch GitHub repository commits
      spinner.start(`Fetching GitHub commits from "${repositoryOwner}/${repositoryName}#${repositoryDefaultBranch}"...`)
      const githubCommits = await getGithubRepositoryCommits(
        repositoryDefaultBranch,
        repositoryOwner,
        repositoryName,
        from,
        to,
      )
      spinner.succeed(
        `Fetched ${githubCommits.length} GitHub commits from "${repositoryOwner}/${repositoryName}#${repositoryDefaultBranch}".`,
      )

      spinner.start(`Generating Deliverable Markdown source...`)
      // Map GitHub repository releases to Deliverable chapters
      deliverableChapters = mapGithubCommitsToDeliverableChapters(githubCommits)

      break

    case Source.RELEASE_HISTORY:
      // Fetch GitHub repository releases
      spinner.start(`Fetching GitHub releases from "${repositoryOwner}/${repositoryName}"...`)
      const githubReleases = await getGithubRepositoryReleases(repositoryOwner, repositoryName, from, to)
      spinner.succeed(`Fetched ${githubReleases.length} GitHub releases from "${repositoryOwner}/${repositoryName}".`)

      spinner.start(`Generating Deliverable Markdown source...`)
      // Map GitHub repository releases to Deliverable chapters
      deliverableChapters = mapGithubReleasesToDeliverableChapters(githubReleases)

      break

    default:
      throw new Error(`Unknown source "${source}".`)
  }

  // Generate and merge Deliverable Markdown rows into a single Markdown source
  const deliverableMarkdownRows = mapDeliverableChaptersToMarkdownRows(deliverableChapters)
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
  const deliverableMarkdownFilePath = `${process.cwd()}/Deliverable.md`
  spinner.start(`Writting Deliverable Markdown source to "${deliverableMarkdownFilePath}"...`)
  await writeFile(deliverableMarkdownFilePath, translatedDeliverableMarkdownSource, 'utf-8')
  spinner.succeed(`Deliverable Markdown source written to "${deliverableMarkdownFilePath}".`)

  // ---------------------------------------------------------------------------
  // Generate Deliverable DOCX file

  if (await hasPandoc()) {
    const deliverableDocxFilePath = `${process.cwd()}/Deliverable.docx`
    spinner.start(`Writting Deliverable DOCX source to "${deliverableDocxFilePath}"...`)
    await $`pandoc ${deliverableMarkdownFilePath} -f markdown -t docx -s -o ${deliverableDocxFilePath}`
    spinner.succeed(`Deliverable DOCX source written to "${deliverableDocxFilePath} done.`)
  }

  spinner.stop()
  console.log('\n')
}

start()

// async function test() {
//   const res = await getGithubRepository('betagouv', 'api.gouv.fr')

//   console.log(res)
// }

// test()
