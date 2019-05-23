import {Actions} from './Actions'
import {Request} from 'superagent'
import {Action} from 'redux'

export interface ActionEncryptingPassword extends Action<Actions.ENCRYPTING_PASSWORD> {
  readonly trayId: string;
  readonly password: string;
  readonly request: Request;
}

export interface ActionPasswordEncryted extends Action<Actions.PASSWORD_ENCRYPTED> {
  readonly trayId: string;
  readonly password: string;
}

export interface ActionPasswordEncryptError extends Action<Actions.PASSWORD_ENCRYPT_ERROR> {
  trayId: string;
  errors: string[];
}

export function encryptingPassword(trayId: string, password: string, request: Request): ActionEncryptingPassword {
  return {type: Actions.ENCRYPTING_PASSWORD, trayId, password, request}
}

export function passwordEncrypted(trayId: string, password: string): ActionPasswordEncryted {
  return {type: Actions.PASSWORD_ENCRYPTED, trayId, password}
}

export function passwordEncryptError(trayId: string, errors: string[]): ActionPasswordEncryptError {
  return {type: Actions.PASSWORD_ENCRYPT_ERROR, trayId, errors}
}
