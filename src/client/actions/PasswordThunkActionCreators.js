import {encryptPassword as encrypt} from '../common/gateways/SecurityGateway'
import {abortPendingRequest} from '../common/gateways/Gateway'
import {send} from '../common/gateways/NevergreenGateway'
import {isBlank} from '../common/Utils'
import {encryptingPassword, passwordEncrypted, passwordEncryptError} from './PasswordActionCreators'

export function encryptPassword(trayId, password, pendingRequest) {
  abortPendingRequest(pendingRequest)

  return function (dispatch) {
    if (!isBlank(password)) {
      const request = encrypt(password)

      dispatch(encryptingPassword(trayId, password, request))

      return send(request).then((data) => {
        dispatch(passwordEncrypted(trayId, data.password))
        return data.password
      }).catch((error) => {
        return dispatch(passwordEncryptError(trayId, [error.message]))
      })
    } else {
      dispatch(passwordEncrypted(trayId, ''))
      return Promise.resolve('')
    }
  }
}
