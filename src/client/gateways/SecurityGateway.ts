import { post } from './Gateway'

export function encrypt(data: string, signal?: AbortSignal): Promise<string> {
  return post<string>({
    url: '/api/encrypt',
    data,
    headers: { 'Content-Type': 'text/plain' },
    signal,
  })
}
