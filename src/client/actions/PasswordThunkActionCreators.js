import {encryptPassword as encrypt} from '../common/gateways/SecurityGateway'
import {abortPendingRequest} from '../common/gateways/Gateway'
import {send} from '../common/gateways/NevergreenGateway'
import {isBlank} from '../common/Utils'
import {encryptingPassword, passwordEncrypted, passwordEncryptError} from './PasswordActionCreators'
import {trayPendingRequest} from '../Selectors'

export function encryptPassword(trayId, password) {

  return async (dispatch, getState) => {
    abortPendingRequest(trayPendingRequest(getState(), trayId))

    if (!isBlank(password)) {
      const request = encrypt(password)

      dispatch(encryptingPassword(trayId, password, request))

      try {
        const data = await send(request)
        dispatch(passwordEncrypted(trayId, data.password))
      } catch (error) {
        dispatch(passwordEncryptError(trayId, [error.message]))
      }
    } else {
      dispatch(passwordEncrypted(trayId, ''))
    }
  }
}
