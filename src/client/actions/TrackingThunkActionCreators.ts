import {isBlank} from '../common/Utils'
import {highlightTray, removeTray, trayAdded} from './TrackingActionCreators'
import {encryptPassword, encryptToken} from './AuthenticationThunkActionCreators'
import {refreshTray} from './RefreshThunkActionCreators'
import {createId, Tray} from '../domain/Tray'
import {ensureHasScheme, removeScheme} from '../domain/Url'
import {State} from '../reducers/Reducer'
import {AnyAction} from 'redux'
import {ThunkAction} from 'redux-thunk'
import {abortPendingRequest} from './NevergreenThunkActionCreators'
import {getTrayRequiresRefresh, getTrays} from '../reducers/TraysReducer'

function urlMatches(tray: Tray, url: string): boolean {
  return removeScheme(url) === removeScheme(tray.url)
}

export function addTray(enteredUrl: string, username?: string, rawPassword?: string): ThunkAction<Promise<void>, State, undefined, AnyAction> {
  return async (dispatch, getState) => {
    if (isBlank(enteredUrl)) {
      return
    }

    const existingTrays = getTrays(getState())

    const url = ensureHasScheme(enteredUrl)
    const existingTray = existingTrays.find((tray: Tray) => urlMatches(tray, url))

    if (existingTray) {
      dispatch(highlightTray(existingTray.trayId))

    } else {
      const trayId = createId()

      dispatch(trayAdded(trayId, url, username))

      if (rawPassword && !isBlank(rawPassword)) {
        await dispatch(encryptPassword(trayId, rawPassword))
      }

      dispatch(refreshTray(trayId))
    }
  }
}

export function addTrayUsingToken(enteredUrl: string, accessToken?: string): ThunkAction<Promise<void>, State, undefined, AnyAction> {
  return async (dispatch, getState) => {
    if (isBlank(enteredUrl)) {
      return
    }

    const existingTrays = getTrays(getState())

    const url = ensureHasScheme(enteredUrl)
    const existingTray = existingTrays.find((tray: Tray) => urlMatches(tray, url))

    if (existingTray) {
      dispatch(highlightTray(existingTray.trayId))

    } else {
      const trayId = createId()

      dispatch(trayAdded(trayId, url, undefined))

      if (accessToken && !isBlank(accessToken)) {
        await dispatch(encryptToken(trayId, accessToken))
      }

      dispatch(refreshTray(trayId))
    }
  }
}

export function removeTrayThunk(trayId: string): ThunkAction<void, State, undefined, AnyAction> {
  return (dispatch) => {
    dispatch(abortPendingRequest(trayId))
    dispatch(removeTray(trayId))
  }
}

export function checkRefresh(trayId: string): ThunkAction<void, State, undefined, AnyAction> {
  return (dispatch, getState) => {
    if (getTrayRequiresRefresh(getState(), trayId)) {
      dispatch(refreshTray(trayId))
    }
  }
}
