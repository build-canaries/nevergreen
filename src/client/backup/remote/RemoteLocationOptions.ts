import {RemoteLocation} from './RemoteLocationsReducer'

export const DEFAULT_GITHUB_URL = 'https://api.github.com'
export const DEFAULT_GITLAB_URL = 'https://gitlab.com'

export enum RemoteLocationOptions {
  Custom = 'custom',
  GitHub = 'github',
  GitLab = 'gitlab'
}

export function isCustomServer(location: RemoteLocation): boolean {
  return location.where === RemoteLocationOptions.Custom
}

export function isGitHub(location: RemoteLocation): boolean {
  return location.where === RemoteLocationOptions.GitHub
}

export function isGitLab(location: RemoteLocation): boolean {
  return location.where === RemoteLocationOptions.GitLab
}
