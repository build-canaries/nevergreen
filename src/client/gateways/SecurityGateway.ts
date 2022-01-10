import {post, Request} from './Gateway'

export function encrypt(value: string): Request<string> {
  return post<string>('/api/encrypt', value, {'Content-Type': 'text/plain'})
}
