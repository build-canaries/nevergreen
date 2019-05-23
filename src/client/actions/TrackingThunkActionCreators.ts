import {isBlank} from '../common/Utils'
import {highlightTray, removeTray, trayAdded} from './TrackingActionCreators'
import {encryptPassword} from './PasswordThunkActionCreators'
import {refreshTray} from './RefreshThunkActionCreators'
import {createId, Tray} from '../domain/Tray'
import {getTrayRequiresRefresh, getTrays} from '../reducers/Selectors'
import {ensureHasScheme, removeScheme} from '../domain/Url'
import {State} from '../reducers/Reducer'
import {AnyAction} from 'redux'
import {ThunkDispatch} from 'redux-thunk'
import {abortPendingRequest} from './NevergreenThunkActionCreators'

function urlMatches(tray: Tray, url: string) {
  return removeScheme(url) === removeScheme(tray.url)
}

export function addTray(enteredUrl: string, username?: string, rawPassword?: string) {
  return async (dispatch: ThunkDispatch<State, {}, AnyAction>, getState: () => State) => {
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

export function removeTrayThunk(trayId: string) {
  return (dispatch: ThunkDispatch<State, {}, AnyAction>) => {
    dispatch(abortPendingRequest(trayId))
    dispatch(removeTray(trayId))
  }
}

export function checkRefresh(trayId: string) {
  return (dispatch: ThunkDispatch<State, {}, AnyAction>, getState: () => State) => {
    if (getTrayRequiresRefresh(getState(), trayId)) {
      dispatch(refreshTray(trayId))
    }
  }
}
