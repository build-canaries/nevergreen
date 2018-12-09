import {post} from './Gateway'

export function encryptPassword(password) {
  return post('/api/encrypt', {password})
}
