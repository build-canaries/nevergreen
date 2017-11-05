import {GITHUB_SET_DESCRIPTION, GITHUB_SET_GIST_ID} from './Actions'

export function gitHubSetGistId(gistId) {
  return {type: GITHUB_SET_GIST_ID, gistId}
}

export function gitHubSetDescription(description) {
  return {type: GITHUB_SET_DESCRIPTION, description}
}
