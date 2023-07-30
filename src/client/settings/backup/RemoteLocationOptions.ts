import { RemoteLocation } from './RemoteLocationsReducer'

export const DEFAULT_GITHUB_URL = 'https://api.github.com'
export const DEFAULT_GITLAB_URL = 'https://gitlab.com'

export enum RemoteLocationOptions {
  custom = 'custom',
  gitHub = 'github',
  gitLab = 'gitlab',
}

export function isCustomServer(
  location?: RemoteLocation,
): location is RemoteLocation {
  return location?.where === RemoteLocationOptions.custom
}

export function isGitHub(
  location?: RemoteLocation,
): location is RemoteLocation {
  return location?.where === RemoteLocationOptions.gitHub
}

export function isGitHubEnterprise(
  location?: RemoteLocation,
): location is RemoteLocation {
  return (
    location?.where === RemoteLocationOptions.gitHub &&
    location.url !== DEFAULT_GITHUB_URL
  )
}

export function isGitLab(
  location?: RemoteLocation,
): location is RemoteLocation {
  return location?.where === RemoteLocationOptions.gitLab
}
