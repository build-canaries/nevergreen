import {isBlank} from '../common/Utils'
import _ from 'lodash'
import {highlightTray, setTrayId, trayAdded} from './TrackingActionCreators'
import {encryptPassword} from './PasswordThunkActionCreators'
import {refreshTray} from './RefreshThunkActionCreators'
import {createId} from '../domain/Tray'
import {trayIds} from '../Selectors'

function hasScheme(url) {
  return _.size(_.split(url, '://')) > 1
}

export function updateTrayId(originalTrayId, newTrayId) {
  return (dispatch) => {
    dispatch(setTrayId(originalTrayId, newTrayId))
    dispatch(refreshTray(newTrayId))
  }
}

export function addTray(enteredUrl, username, rawPassword) {
  return async (dispatch, getState) => {
    const existingTrays = trayIds(getState())

    const url = hasScheme(enteredUrl) ? enteredUrl : `http://${enteredUrl}`
    const trayId = createId(url)

    if (existingTrays.includes(trayId)) {
      dispatch(highlightTray(trayId))
    } else {
      dispatch(trayAdded(trayId, url, username))

      if (!isBlank(rawPassword)) {
        await dispatch(encryptPassword(trayId, rawPassword))
      }

      dispatch(refreshTray(trayId, true))
    }
  }
}
