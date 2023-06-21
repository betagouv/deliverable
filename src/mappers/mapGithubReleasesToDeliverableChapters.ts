import dayjs from 'dayjs'

import { GithubRelease } from '../api/types'
import { DeliverableChapter } from '../types'
import { isEmpty } from '../utils/isEmpty.js'

interface GithubReleaseWithPublishedAt extends GithubRelease {
  published_at: string
}

const hasPublishedAt = (
  githubRepositoryRelease: GithubRelease,
): githubRepositoryRelease is GithubReleaseWithPublishedAt => typeof githubRepositoryRelease.published_at === 'string'

export function mapGithubReleasesToDeliverableChapters(
  githubRepositoryReleases: GithubRelease[],
): DeliverableChapter[] {
  const deliverableChapters: DeliverableChapter[] = githubRepositoryReleases
    .filter(hasPublishedAt)
    .map(({ body, name, published_at, tag_name }) => ({
      at: dayjs(published_at).toDate(),
      body: (!isEmpty(body) ? body : null) as string | null,
      title: `${name} (${tag_name})`,
    }))

  return deliverableChapters
}
