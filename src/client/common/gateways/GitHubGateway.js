import {post, get, patch} from './Gateway'

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

  return post('https://api.github.com/gists', data, {Authorization: `token ${oauthToken}`, Accept: 'application/vnd.github.v3+json'})
}

export function updateGist(url, configuration, oauthToken) {
  const data = {
    files: {
      'configuration.json': {
        content: configuration
      }
    }
  }

  return patch(url, data, {Authorization: `token ${oauthToken}`, Accept: 'application/vnd.github.v3+json'})
}

export function getGist(location, oauthToken) {
  return get(location, {Authorization: `token ${oauthToken}`})
}
