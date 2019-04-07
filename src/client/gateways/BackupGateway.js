import {post} from './Gateway'

export function exportConfiguration(where, id, description, configuration, token) {
  return post('/api/export', {where, id, description, configuration, token})
}

export function importConfiguration(from, id, token) {
  return post('/api/import', {from, id, token})
}
