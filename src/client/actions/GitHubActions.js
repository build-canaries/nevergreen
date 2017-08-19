export const GITHUB_SET_GIST_ID = 'GITHUB_SET_GIST_ID'
export function gitHubSetGistId(gistId) {
  return {type: GITHUB_SET_GIST_ID, gistId}
}

export const GITHUB_SET_DESCRIPTION = 'GITHUB_SET_DESCRIPTION'
export function gitHubSetDescription(description) {
  return {type: GITHUB_SET_DESCRIPTION, description}
}
