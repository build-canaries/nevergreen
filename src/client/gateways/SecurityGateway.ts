import {post, Request} from './Gateway'

export type EncryptResponse = string;

export function encrypt(value: string): Request<string> {
  return post<string>('/api/encrypt', value, {'Content-Type': 'text/plain'})
}
