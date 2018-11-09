import {isBlank} from '../common/Utils'
import {highlightTray, trayAdded} from './TrackingActionCreators'
import {encryptPassword} from './PasswordThunkActionCreators'
import {refreshTray} from './RefreshThunkActionCreators'
import {createId} from '../domain/Tray'
import {trays} from '../reducers/Selectors'
import {hasScheme, removeScheme} from '../domain/Url'

function urlMatches(tray, url) {
  return removeScheme(url) === removeScheme(tray.url)
}

export function addTray(enteredUrl, username, rawPassword) {
  return async (dispatch, getState) => {
    const existingTrays = trays(getState())

    const url = hasScheme(enteredUrl) ? enteredUrl : `http://${enteredUrl}`
    const existingTray = existingTrays.find((tray) => urlMatches(tray, url))

    if (existingTray) {
      dispatch(highlightTray(existingTray.trayId))

    } else {
      const trayId = createId(url)

      dispatch(trayAdded(trayId, url, username))

      if (!isBlank(rawPassword)) {
        await dispatch(encryptPassword(trayId, rawPassword))
      }

      dispatch(refreshTray(trayId, true))
    }
  }
}
