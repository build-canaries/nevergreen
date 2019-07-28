import {Actions} from './Actions'
import {Request} from 'superagent'
import {Action} from 'redux'

export interface ActionEncryptingToken extends Action<Actions.ENCRYPTING_TOKEN> {
  readonly trayId: string;
  readonly accessToken: string;
  readonly request: Request;
}

export interface ActionTokenEncrypted extends Action<Actions.TOKEN_ENCRYPTED> {
  readonly trayId: string;
  readonly accessToken: string;
}

export interface ActionTokenEncryptError extends Action<Actions.TOKEN_ENCRYPT_ERROR> {
  trayId: string;
  errors: string[];
}


export function encryptingToken(trayId: string, accessToken: string, request: Request): ActionEncryptingToken {
  return {type: Actions.ENCRYPTING_TOKEN, trayId, accessToken, request}
}

export function tokenEncrypted(trayId: string, accessToken: string): ActionTokenEncrypted {
  return {type: Actions.TOKEN_ENCRYPTED, trayId, accessToken}
}

export function tokenEncryptError(trayId: string, errors: string[]): ActionTokenEncryptError {
  return {type: Actions.TOKEN_ENCRYPT_ERROR, trayId, errors}
}
