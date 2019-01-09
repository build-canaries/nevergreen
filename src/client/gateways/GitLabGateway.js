import {get, post, put, send as gatewaySend} from './Gateway'

export function createSnippet(url, title, configuration, accessToken) {
  const data = {
    title,
    visibility: 'public',
    file_name: 'configuration.json',  
    content: configuration
  }

  return post(`${url}/api/v4/snippets?private_token=${accessToken}`, data)
}

export function updateSnippet(url, snippetId, title, configuration, accessToken) {
  const data = {
    title,
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
    // TODO: Check if GitLab gives helpful error messages when things go wrong
    throw error
  }
}
