import { Octokit } from '@octokit/rest'
import { createTokenAuth } from '@octokit/auth-token'

export const octokit = new Octokit(
  process.env.GITHUB_PAT
    ? {
        authStrategy: createTokenAuth(process.env.GITHUB_PAT),
      }
    : {},
)
