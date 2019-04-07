import {post} from './Gateway'

export function exportConfiguration(where, id, description, configuration, token, url) {
  return post('/api/export', {where, id, description, configuration, token, url})
}

export function importConfiguration(from, id, token, url) {
  return post('/api/import', {from, id, token, url})
}
