import {GITHUB_SET_DESCRIPTION, GITHUB_SET_GIST_ID, GITHUB_SET_URL} from './Actions'

export function gitHubSetGistId(gistId) {
  return {type: GITHUB_SET_GIST_ID, gistId}
}

export function gitHubSetDescription(description) {
  return {type: GITHUB_SET_DESCRIPTION, description}
}

export function gitHubSetUrl(url) {
  return {type: GITHUB_SET_URL, url}
}
