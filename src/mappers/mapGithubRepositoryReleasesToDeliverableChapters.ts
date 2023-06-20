import dayjs from 'dayjs'
import { GithubRepositoryRelease } from '../api/types'
import { DeliverableChapter } from '../types'
import { isEmpty } from 'ramda'

interface GithubRepositoryReleaseWithPublishedAt extends GithubRepositoryRelease {
  published_at: string
}

const hasPublishedAt = (
  githubRepositoryRelease: GithubRepositoryRelease,
): githubRepositoryRelease is GithubRepositoryReleaseWithPublishedAt =>
  typeof githubRepositoryRelease.published_at === 'string'

export function mapGithubRepositoryReleasesToDeliverableChapters(
  githubRepositoryReleases: GithubRepositoryRelease[],
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
