import {get, post, put, send as gatewaySend} from './Gateway'
import {isImmutable} from 'immutable'
import _ from 'lodash'

export function createSnippet(url, configuration, accessToken) {
  const data = {
    title: 'Nevergreen configuration backup',
    visibility: 'public',
    file_name: 'configuration.json',  
    content: configuration
  }

  return post(`${url}/api/v4/snippets?private_token=${accessToken}`, data)
}

export function updateSnippet(url, snippetId, configuration, accessToken) {
  const data = {
    file_name: 'configuration.json',  
    content: configuration
  }

  return put(`${url}/api/v4/snippets/${snippetId}/?private_token=${accessToken}`, data)
}

export function getSnippetMeta(url, snippetId, accessToken) {
  return get(`${url}/api/v4/snippets/${snippetId}?private_token=${accessToken}`)
}

export function getSnippetContent(url, snippetId, accessToken) {
  return get(`${url}/api/v4/snippets/${snippetId}/raw?private_token=${accessToken}`)
}

export async function send(request) {
  try {
    return await gatewaySend(request)
  } catch (error) {
    // GitHub errors look like this {"message": ""  } or {"error": ""  }
    if(isImmutable(error.body)) {
      const serverMessage = error.body.get('message')
      const serverError = error.body.get('error')
      const displayMessage = _.compact([serverMessage, serverError]).join('')
      const message = `${error.status} - ${displayMessage}`
      throw new Error(message)
    }

    const message = `${error.status} - ${error.body}`
    throw new Error(message)
  }
}
