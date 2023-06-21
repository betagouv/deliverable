export interface GithubCommit {
  author: {
    login: string
  } | null
  commit: {
    author: {
      date?: string
      name?: string
    } | null
    message: string
  }
  html_url: string
  sha: string
}

export interface GithubRepository {
  default_branch: string
}

export interface GithubRelease {
  body?: string | null | undefined
  draft: boolean
  name: string | null
  prerelease: boolean
  published_at: string | null
  tag_name: string
  url: string
}
