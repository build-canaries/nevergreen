import {post} from './Gateway'

export interface EncryptResponse {
  password: string;
}

export function encryptPassword(password: string) {
  return post('/api/encrypt', {password})
}
