import {
  encryptAccessToken,
  encryptPassword as encrypt,
  EncryptResponse,
  EncryptTokenResponse
} from '../gateways/SecurityGateway'
import {send} from '../gateways/Gateway'
import {isBlank} from '../common/Utils'
import {encryptingPassword, passwordEncrypted, passwordEncryptError} from './PasswordActionCreators'
import {encryptingToken, tokenEncrypted, tokenEncryptError} from './AccessTokenActionCreators'
import {AnyAction} from 'redux'
import {State} from '../reducers/Reducer'
import {abortPendingRequest} from './NevergreenThunkActionCreators'
import {ThunkAction} from 'redux-thunk'
import {AuthDetails, AuthTypes} from '../domain/Tray'
import {setAuthType, setTrayUsername} from './TrackingActionCreators'

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

export function encryptToken(trayId: string, accessToken: string): ThunkAction<Promise<void>, State, undefined, AnyAction> {
  return async (dispatch) => {
    dispatch(abortPendingRequest(trayId))

    if (!isBlank(accessToken)) {
      const request = encryptAccessToken(accessToken)

      dispatch(encryptingToken(trayId, accessToken, request))

      try {
        const data = await send<EncryptTokenResponse>(request)
        dispatch(tokenEncrypted(trayId, data.accessToken))
      } catch (error) {
        dispatch(tokenEncryptError(trayId, [error.message]))
      }
    } else {
      dispatch(tokenEncrypted(trayId, ''))
    }
  }
}

export function setAuth(trayId: string, auth: AuthDetails): ThunkAction<Promise<void>, State, undefined, AnyAction> {
  return async (dispatch) => {
    dispatch(setAuthType(trayId, auth.type))

    switch (auth.type) {
      case AuthTypes.none: {
        dispatch(passwordEncrypted(trayId, ''))
        dispatch(tokenEncrypted(trayId, ''))
        dispatch(setTrayUsername(trayId, ''))
        break
      }
      case AuthTypes.basic: {
        dispatch(setTrayUsername(trayId, auth.username))
        dispatch(encryptPassword(trayId, auth.password))
        dispatch(tokenEncrypted(trayId, ''))
        break
      }
      case AuthTypes.token: {
        dispatch(encryptToken(trayId, auth.accessToken))
        dispatch(passwordEncrypted(trayId, ''))
        dispatch(setTrayUsername(trayId, ''))
        break
      }
    }
  }
}
