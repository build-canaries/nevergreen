import {encryptPassword as encrypt, EncryptResponse} from '../gateways/SecurityGateway'
import {send} from '../gateways/Gateway'
import {isBlank} from '../common/Utils'
import {encryptingPassword, passwordEncrypted, passwordEncryptError} from './PasswordActionCreators'
import {AnyAction} from 'redux'
import {State} from '../reducers/Reducer'
import {abortPendingRequest} from './NevergreenThunkActionCreators'
import {ThunkAction} from 'redux-thunk'

export function encryptPassword(trayId: string, rawPassword: string): ThunkAction<Promise<void>, State, undefined, AnyAction> {
  return async (dispatch) => {
    dispatch(abortPendingRequest(trayId))

    if (!isBlank(rawPassword)) {
      const request = encrypt(rawPassword)

      dispatch(encryptingPassword(trayId, rawPassword, request))

      try {
        const data = await send<EncryptResponse>(request)
        dispatch(passwordEncrypted(trayId, data.password))
      } catch (error) {
        dispatch(passwordEncryptError(trayId, [error.message]))
      }
    } else {
      dispatch(passwordEncrypted(trayId, ''))
    }
  }
}
