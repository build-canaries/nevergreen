import {isBlank} from '../common/Utils'
import {highlightTray, trayAdded} from './TrackingActionCreators'
import {encryptPassword} from './PasswordThunkActionCreators'
import {refreshTray} from './RefreshThunkActionCreators'
import {createId} from '../domain/Tray'
import {tray, trays} from '../reducers/Selectors'
import {ensureHasScheme, removeScheme} from '../domain/Url'

function urlMatches(tray, url) {
  return removeScheme(url) === removeScheme(tray.url)
}

export function addTray(enteredUrl, username, rawPassword) {
  return async (dispatch, getState) => {
    if (isBlank(enteredUrl)) {
      return
    }

    const existingTrays = trays(getState())

    const url = ensureHasScheme(enteredUrl)
    const existingTray = existingTrays.find((tray) => urlMatches(tray, url))

    if (existingTray) {
      dispatch(highlightTray(existingTray.trayId))

    } else {
      const trayId = createId()

      dispatch(trayAdded(trayId, url, username))

      if (!isBlank(rawPassword)) {
        await dispatch(encryptPassword(trayId, rawPassword))
      }

      dispatch(refreshTray(trayId, true))
    }
  }
}

export function checkRefresh(trayId) {
  return (dispatch, getState) => {
    if (tray(getState(), trayId).requiresRefresh) {
      dispatch(refreshTray(trayId))
    }
  }
}
