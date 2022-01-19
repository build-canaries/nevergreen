import {v4 as uuid} from 'uuid'
import isNil from 'lodash/isNil'
import {isNotBlank, randomFrom} from '../common/Utils'
import {adjectives, nouns} from './Words'

export enum AuthTypes {
  none = 'none',
  basic = 'basic',
  token = 'token'
}

interface BaseFeed {
  readonly authType: AuthTypes;
  readonly includeNew: boolean;
  readonly name?: string;
  readonly serverType: string;
  readonly timestamp?: string;
  readonly trayId: string;
  readonly url: string;
}

interface UnauthenticatedFeed extends BaseFeed {
  readonly authType: AuthTypes.none;
}

interface BasicFeed extends BaseFeed {
  readonly authType: AuthTypes.basic;
  readonly encryptedPassword: string;
  readonly username: string;
}

interface TokenFeed extends BaseFeed {
  readonly authType: AuthTypes.token;
  readonly encryptedAccessToken: string;
}

export type Feed = UnauthenticatedFeed | BasicFeed | TokenFeed

export function isBasicFeed(feed?: Feed): feed is BasicFeed {
  return feed?.authType === AuthTypes.basic
}

export function isTokenFeed(feed?: Feed): feed is TokenFeed {
  return feed?.authType === AuthTypes.token
}

export const CI_OPTIONS = [
  {value: '', display: 'Generic'},
  {value: 'circle', display: 'CircleCI'},
  {value: 'go', display: 'GoCD'}
]

export function serverTypeDisplay(serverType: string): string {
  const match = CI_OPTIONS.find((option) => option.value === serverType)
  return match ? match.display : 'Unknown'
}

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
  return `${randomFrom(adjectives)} ${randomFrom(nouns)}`
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
  } as Feed
}

export function feedIdentifier(feed?: Feed | null): string {
  return isNil(feed)
    ? 'Nevergreen'
    : isNotBlank(feed.name)
      ? feed.name
      : feed.url
}

interface ConnectionDetails {
  readonly url: string;
  readonly authType: AuthTypes;
  readonly username?: string;
  readonly encryptedPassword?: string;
  readonly encryptedAccessToken?: string;
}

export function connectionDetails(feed: Feed): ConnectionDetails {
  if (isBasicFeed(feed)) {
    return {
      authType: feed.authType,
      url: feed.url,
      username: feed.username,
      encryptedPassword: feed.encryptedPassword
    }
  } else if (isTokenFeed(feed)) {
    return {
      authType: feed.authType,
      url: feed.url,
      encryptedAccessToken: feed.encryptedAccessToken
    }
  } else {
    return {
      authType: feed.authType,
      url: feed.url
    }
  }
}
