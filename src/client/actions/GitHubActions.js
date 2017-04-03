export const GITHUB_SET_URL = 'GITHUB_SET_URL'
export function gitHubSetUrl(url) {
  return {type: GITHUB_SET_URL, url}
}

export const GITHUB_SET_DESCRIPTION = 'GITHUB_SET_DESCRIPTION'
export function gitHubSetDescription(description) {
  return {type: GITHUB_SET_DESCRIPTION, description}
}
