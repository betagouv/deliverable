export interface DeliverableChapter {
  at: Date
  body: string | null
  title: string
}

export enum Source {
  COMMIT_MESSAGE_HISTORY = 'COMMIT_MESSAGE_HISTORY',
  MERGED_PULL_REQUEST_HISTORY = 'MERGED_PULL_REQUEST_HISTORY',
  RELEASE_HISTORY = 'RELEASE_HISTORY',
}
