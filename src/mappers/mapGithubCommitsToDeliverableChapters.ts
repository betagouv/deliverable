import dayjs from 'dayjs'

import { GithubCommit } from '../api/types'
import { DeliverableChapter } from '../types'

interface GithubCommitWithAuthor extends GithubCommit {
  author: {
    login: string
  }
  commit: {
    author: {
      date: string
      name: string
    }
    message: string
  }
}

const hasAuthor = (githubCommit: GithubCommit): githubCommit is GithubCommitWithAuthor =>
  typeof githubCommit.author?.login === 'string' &&
  typeof githubCommit.commit.author?.date === 'string' &&
  typeof githubCommit.commit.author?.name === 'string'

export function mapGithubCommitsToDeliverableChapters(githubCommits: GithubCommit[]): DeliverableChapter[] {
  const deliverableChapters: DeliverableChapter[] = githubCommits.filter(hasAuthor).map(
    ({
      commit: {
        author: { date, name },
        message,
      },
    }) => ({
      at: dayjs(date).toDate(),
      body: null,
      // We only keep the first line of the commit message as the chapter title
      title: `${message.split('\n')[0]} (${name})`,
    }),
  )

  return deliverableChapters
}
