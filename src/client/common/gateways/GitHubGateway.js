import {get, patch, post} from './Gateway'

const gistApiUrl = 'https://api.github.com/gists'
const mimeType = 'application/vnd.github.v3+json'

export function createGist(description, configuration, oauthToken) {
  const data = {
    description,
    'public': false,
    files: {
      'configuration.json': {
        content: configuration
      }
    }
  }

  return post(gistApiUrl, data, {Authorization: `token ${oauthToken}`, Accept: mimeType})
}

export function updateGist(gistId, description, configuration, oauthToken) {
  const data = {
    description,
    files: {
      'configuration.json': {
        content: configuration
      }
    }
  }

  return patch(`${gistApiUrl}/${gistId}`, data, {Authorization: `token ${oauthToken}`, Accept: mimeType})
}

export function getGist(gistId) {
  return get(`${gistApiUrl}/${gistId}`, {Accept: mimeType})
}

export function getTruncatedFile(url) {
  return get(url, {Accept: 'text/plain; charset=utf-8'})
}
