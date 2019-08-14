import {post} from './Gateway'

export type EncryptResponse = string;

export function encrypt(value: string) {
  return post('/api/encrypt', value, {'Content-Type': 'text/plain'})
}
