import {encryptPassword as encrypt} from '../common/gateways/SecurityGateway'
import {fetchAll} from '../common/gateways/ProjectsGateway'
import {abortPendingRequest, send} from '../common/gateways/Gateway'
import {isBlank} from '../common/Utils'
import _ from 'lodash'
import {
  encryptingPassword,
  highlightTray,
  passwordEncrypted,
  passwordEncryptError,
  projectsFetched,
  projectsFetchError,
  projectsFetching,
  setTrayId,
  trayAdded
} from './TrackingActionCreators'

function hasScheme(url) {
  return _.size(_.split(url, '://')) > 1
}

// TODO: [#195] move functions that call other functions (in this module) to another module so we can mock and validate the calls

export function updateTrayId(tray, newTrayId, pendingRequest) {
  return function (dispatch) {
    dispatch(setTrayId(tray.trayId, newTrayId))
    const updatedTray = {...tray, trayId: newTrayId}
    return dispatch(refreshTray(updatedTray, pendingRequest))
  }
}

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
        dispatch(passwordEncryptError(trayId, [`Nevergreen ${error.message}`]))
      })
    } else {
      dispatch(passwordEncrypted(trayId, ''))
      return Promise.resolve('')
    }
  }
}

export function addTray(enteredUrl, username, rawPassword, existingTrays) {
  return function (dispatch) {
    const url = hasScheme(enteredUrl) ? enteredUrl : 'http://' + enteredUrl
    const trayId = url

    if (_.includes(existingTrays, trayId)) {
      dispatch(highlightTray(trayId))
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

export function refreshTray(tray, pendingRequest) {
  abortPendingRequest(pendingRequest)

  return function (dispatch) {
    const trayId = tray.trayId
    const request = fetchAll([tray])

    dispatch(projectsFetching(trayId, request))

    return send(request).then((json) => {
      const filteredProjects = json.filter((project) => !project.job)
      const errors = json
        .filter((project) => project.message)
        .map((project) => project.message)

      if (_.isEmpty(errors)) {
        return dispatch(projectsFetched(trayId, filteredProjects))
      } else {
        return dispatch(projectsFetchError(trayId, errors))
      }
    }).catch((error) => {
      dispatch(projectsFetchError(trayId, [`Nevergreen ${error.message}`]))
    })
  }
}
