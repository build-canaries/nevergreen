import {post} from './Gateway'

export interface EncryptResponse {
  password: string;
}

export interface EncryptTokenResponse {
  accessToken: string;
}

export function encryptPassword(password: string) {
  return post('/api/encrypt', {password})
}

export function encryptAccessToken(accessToken: string) {
  return post('/api/encrypt', {accessToken})
}
