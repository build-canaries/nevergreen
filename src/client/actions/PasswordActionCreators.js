import Immutable from 'immutable'
import {ENCRYPTING_PASSWORD, PASSWORD_ENCRYPT_ERROR, PASSWORD_ENCRYPTED} from './Actions'

export function encryptingPassword(trayId, password, request) {
  return {type: ENCRYPTING_PASSWORD, trayId, password, request}
}

export function passwordEncrypted(trayId, password) {
  return {type: PASSWORD_ENCRYPTED, trayId, password}
}

export function passwordEncryptError(trayId, errors) {
  return {type: PASSWORD_ENCRYPT_ERROR, trayId, errors: Immutable.List(errors)}
}
