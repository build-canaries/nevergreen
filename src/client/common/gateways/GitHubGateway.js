import {get, patch, post} from './Gateway'

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

  return post('https://api.github.com/gists', data, {Authorization: `token ${oauthToken}`, Accept: mimeType})
}

export function updateGist(url, configuration, oauthToken) {
  const data = {
    files: {
      'configuration.json': {
        content: configuration
      }
    }
  }

  return patch(url, data, {Authorization: `token ${oauthToken}`, Accept: mimeType})
}

export function getGist(location) {
  return get(location, {Accept: mimeType})
}
