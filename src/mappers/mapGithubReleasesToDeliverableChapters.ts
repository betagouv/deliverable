import dayjs from 'dayjs'

import { GithubRelease } from '../api/types'
import { isEmpty } from '../utils/isEmpty.js'
import { DeliverableChapter } from '../types'

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
    .map(({ body, name, tag_name, published_at }) => ({
      at: dayjs(published_at).toDate(),
      body: (!isEmpty(body) ? body : null) as string | null,
      title: `${name} (${tag_name})`,
    }))

  return deliverableChapters
}
