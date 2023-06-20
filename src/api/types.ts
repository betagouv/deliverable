export interface GithubRepositoryRelease {
  body?: string | null | undefined
  draft: boolean
  name: string | null
  prerelease: boolean
  published_at: string | null
  tag_name: string
  url: string
}
