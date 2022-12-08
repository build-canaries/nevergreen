import { nanoid } from '@reduxjs/toolkit'
import isNil from 'lodash/isNil'
import { isNotBlank, randomFrom } from '../common/Utils'
import { ADJECTIVES, NOUNS } from './Words'

export enum AuthTypes {
  none = 'none',
  basic = 'basic',
  token = 'token',
}

export enum TrackingMode {
  everything = 'everything',
  selected = 'selected',
}

export interface Feed {
  readonly authType: AuthTypes
  readonly encryptedAccessToken?: string
  readonly encryptedPassword?: string
  readonly name?: string
  readonly serverType: string
  readonly trayId: string
  readonly url: string
  readonly username?: string
  readonly trackingMode: TrackingMode
}

export const CI_OPTIONS = [
  { value: '', display: 'Generic' },
  { value: 'circle', display: 'CircleCI' },
  { value: 'go', display: 'GoCD' },
]

export const AUTH_TYPE_OPTIONS = [
  { value: AuthTypes.none, display: 'No auth' },
  { value: AuthTypes.basic, display: 'Basic auth' },
  { value: AuthTypes.token, display: 'Access token' },
]

export const TRACKING_MODE_OPTIONS = [
  { value: TrackingMode.everything, display: 'Everything' },
  { value: TrackingMode.selected, display: 'Selected' },
]

export function authTypeDisplay(authType: AuthTypes): string {
  const match = AUTH_TYPE_OPTIONS.find((option) => option.value === authType)
  return match ? match.display : 'Unknown'
}

export function trackingModeDisplay(trackingMode: TrackingMode): string {
  const match = TRACKING_MODE_OPTIONS.find(
    (option) => option.value === trackingMode
  )
  return match ? match.display : 'Unknown'
}

export function generateRandomName(): string {
  return `${randomFrom(ADJECTIVES)} ${randomFrom(NOUNS)}`
}

export function createId(): string {
  return nanoid(10)
}

export function createFeed(
  trayId: string,
  url: string,
  additional: Partial<Feed> = {}
): Feed {
  return {
    authType: AuthTypes.none,
    name: generateRandomName(),
    serverType: '',
    trayId,
    trackingMode: TrackingMode.everything,
    url,
    ...additional,
  }
}

export function feedIdentifier(feed?: Feed | null): string {
  return isNil(feed)
    ? 'Nevergreen'
    : isNotBlank(feed.name)
    ? feed.name
    : feed.url
}
