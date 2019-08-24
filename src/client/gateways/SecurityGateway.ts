import {Request} from 'superagent'
import {post} from './Gateway'

export type EncryptResponse = string;

export function encrypt(value: string): Request {
  return post('/api/encrypt', value, {'Content-Type': 'text/plain'})
}
