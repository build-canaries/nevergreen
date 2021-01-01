import {v4 as uuid} from 'uuid'
import isNil from 'lodash/isNil'
import {isNotBlank, randomFrom} from '../common/Utils'
import {adjectives, nouns} from './Words'

export enum AuthTypes {
  none = 'none',
  basic = 'basic',
  token = 'token'
}

export interface Tray {
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

export function generateRandomName(): string {
  return `${randomFrom(adjectives)} ${randomFrom(nouns)}`
}

export function createId(): string {
  return uuid()
}

export function createTray(trayId: string, url: string, additional: Partial<Tray> = {}): Tray {
  return {
    authType: AuthTypes.none,
    encryptedAccessToken: '',
    encryptedPassword: '',
    includeNew: true,
    name: generateRandomName(),
    serverType: '',
    trayId,
    url,
    username: '',
    ...additional
  }
}

export function trayIdentifier(tray?: Tray | null): string {
  return isNil(tray)
    ? 'Nevergreen'
    : isNotBlank(tray.name)
      ? tray.name
      : tray.url
}
