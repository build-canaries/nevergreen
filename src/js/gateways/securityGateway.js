import {post} from './gateway'

export function encryptPassword(password) {
  return post('/api/encrypt', {password})
}
