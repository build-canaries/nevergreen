import {isBlank} from '../common/Utils'
import _ from 'lodash'
import {highlightTray, setTrayId, trayAdded} from './TrackingActionCreators'
import {encryptPassword} from './PasswordThunkActionCreators'
import {refreshTray} from './RefreshThunkActionCreators'
import {createId} from '../domain/Tray'

function hasScheme(url) {
  return _.size(_.split(url, '://')) > 1
}

export function updateTrayId(tray, newTrayId, pendingRequest) {
  return function (dispatch) {
    dispatch(setTrayId(tray.trayId, newTrayId))
    const updatedTray = {...tray, trayId: newTrayId}
    return dispatch(refreshTray(updatedTray, pendingRequest))
  }
}

export function addTray(enteredUrl, username, rawPassword, existingTrays) {
  return function (dispatch) {
    const url = hasScheme(enteredUrl) ? enteredUrl : 'http://' + enteredUrl
    const trayId = createId(url)

    if (_.includes(existingTrays, trayId)) {
      return dispatch(highlightTray(trayId))
    } else {
      dispatch(trayAdded(trayId, url, username))

      if (!isBlank(rawPassword)) {
        return dispatch(encryptPassword(trayId, rawPassword)).then((encryptedPassword) => {
          return dispatch(refreshTray({trayId, url, username, password: encryptedPassword}))
        })
      } else {
        return dispatch(refreshTray({trayId, url, username}))
      }
    }
  }
}
