import {get, post, put} from './Gateway'

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
