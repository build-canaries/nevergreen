import {v4 as uuid} from 'uuid'
import isNil from 'lodash/isNil'
import {isNotBlank, randomFrom} from '../common/Utils'
import {ADJECTIVES, NOUNS} from './Words'

export enum AuthTypes {
  none = 'none',
  basic = 'basic',
  token = 'token'
}

export interface Feed {
  readonly authType: AuthTypes;
  readonly encryptedAccessToken?: string;
  readonly encryptedPassword?: string;
  readonly includeNew: boolean;
  readonly name?: string;
  readonly serverType: string;
  readonly timestamp?: string;
  readonly trayId: string;
  readonly url: string;
  readonly username?: string;
}

export const CI_OPTIONS = [
  {value: '', display: 'Generic'},
  {value: 'circle', display: 'CircleCI'},
  {value: 'go', display: 'GoCD'}
]

export const AUTH_TYPE_OPTIONS = [
  {value: AuthTypes.none, display: 'No auth'},
  {value: AuthTypes.basic, display: 'Basic auth'},
  {value: AuthTypes.token, display: 'Access token'}
]

export function authTypeDisplay(authType: AuthTypes): string {
  const match = AUTH_TYPE_OPTIONS.find((option) => option.value === authType)
  return match ? match.display : 'Unknown'
}

export function generateRandomName(): string {
  return `${randomFrom(ADJECTIVES)} ${randomFrom(NOUNS)}`
}

export function createId(): string {
  return uuid()
}

export function createFeed(trayId: string, url: string, additional: Partial<Feed> = {}): Feed {
  return {
    authType: AuthTypes.none,
    includeNew: true,
    name: generateRandomName(),
    serverType: '',
    trayId,
    url,
    ...additional
  }
}

export function feedIdentifier(feed?: Feed | null): string {
  return isNil(feed)
    ? 'Nevergreen'
    : isNotBlank(feed.name)
      ? feed.name
      : feed.url
}
