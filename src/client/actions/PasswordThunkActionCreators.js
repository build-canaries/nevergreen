import {encryptPassword as encrypt} from '../common/gateways/SecurityGateway'
import {abortPendingRequest} from '../common/gateways/Gateway'
import {send} from '../common/gateways/NevergreenGateway'
import {isBlank} from '../common/Utils'
import {encryptingPassword, passwordEncrypted, passwordEncryptError} from './PasswordActionCreators'
import {pendingRequest} from '../reducers/Selectors'
import {List} from 'immutable'

export function encryptPassword(trayId, rawPassword) {

  return async (dispatch, getState) => {
    abortPendingRequest(pendingRequest(getState(), trayId))

    if (!isBlank(rawPassword)) {
      const request = encrypt(rawPassword)

      dispatch(encryptingPassword(trayId, rawPassword, request))

      try {
        const data = await send(request)
        dispatch(passwordEncrypted(trayId, data.get('password')))
      } catch (error) {
        dispatch(passwordEncryptError(trayId, List.of(error.message)))
      }
    } else {
      dispatch(passwordEncrypted(trayId, ''))
    }
  }
}
