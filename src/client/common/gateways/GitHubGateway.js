import {get, patch, post, send as gatewaySend} from './Gateway'
import {isImmutable} from 'immutable'

const GIST_URL = 'https://api.github.com/gists'
const MIME_TYPE = 'application/vnd.github.v3+json'

export function createGist(description, configuration, oauthToken) {
  const data = {
    description,
    public: false,
    files: {
      'configuration.json': {
        content: configuration
      }
    }
  }

  return post(GIST_URL, data, {Authorization: `token ${oauthToken}`, Accept: MIME_TYPE})
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

  return patch(`${GIST_URL}/${gistId}`, data, {Authorization: `token ${oauthToken}`, Accept: MIME_TYPE})
}

export function getGist(gistId) {
  return get(`${GIST_URL}/${gistId}`, {Accept: MIME_TYPE})
}

export function getTruncatedFile(url) {
  return get(url, {Accept: 'text/plain; charset=utf-8'})
}

export async function send(request) {
  try {
    return await gatewaySend(request)
  } catch (error) {
    // GitHub errors look like this {"message": "", "documentation_url": ""}
    const serverMessage = isImmutable(error.body)
      ? error.body.get('message')
      : error.body
    const message = `${error.status} - ${serverMessage}`

    throw new Error(message)
  }
}
