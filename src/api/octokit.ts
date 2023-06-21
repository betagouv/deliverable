import { createTokenAuth } from '@octokit/auth-token'
import { Octokit } from '@octokit/rest'

export const octokit = new Octokit(
  process.env.GITHUB_PAT
    ? {
        authStrategy: createTokenAuth(process.env.GITHUB_PAT),
      }
    : {},
)
