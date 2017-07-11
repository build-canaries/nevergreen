import Immutable from 'immutable'
import {encryptPassword as encrypt} from '../common/gateways/SecurityGateway'
import {fetchAll} from '../common/gateways/ProjectsGateway'
import {send} from '../common/gateways/Gateway'
import moment from 'moment'
import {generateRandomName} from '../common/project/Name'
import _ from 'lodash'

function hasScheme(url) {
  return _.size(_.split(url, '://')) > 1
}

function isNotBlank(value) {
  return _.size(_.trim(value)) > 0
}

function abortPendingRequest(req) {
  if (req) {
    req.abort()
  }
}

export const TRAY_ADDED = 'TRAY_ADDED'
export function trayAdded(trayId, url, username) {
  return {
    type: TRAY_ADDED,
    trayId,
    data: Immutable.Map({trayId, url, username, name: generateRandomName(), highlight: true})
  }
}

export const HIGHLIGHT_TRAY = 'HIGHLIGHT_TRAY'
export function highlightTray(trayId) {
  return {type: HIGHLIGHT_TRAY, trayId}
}

export const ENCRYPTING_PASSWORD = 'ENCRYPTING_PASSWORD'
export function encryptingPassword(trayId, password, request) {
  return {type: ENCRYPTING_PASSWORD, trayId, password, request}
}

export const PASSWORD_ENCRYPTED = 'PASSWORD_ENCRYPTED'
export function passwordEncrypted(trayId, password) {
  return {type: PASSWORD_ENCRYPTED, trayId, password}
}

export const PASSWORD_ENCRYPT_ERROR = 'PASSWORD_ENCRYPT_ERROR'
export function passwordEncryptError(trayId, errors) {
  return {type: PASSWORD_ENCRYPT_ERROR, trayId, errors: Immutable.List(errors)}
}

export const REMOVE_TRAY = 'REMOVE_TRAY'
export function removeTray(trayId, pendingRequest) {
  abortPendingRequest(pendingRequest)
  return {type: REMOVE_TRAY, trayId}
}

export const PROJECTS_FETCHING = 'PROJECTS_FETCHING'
export function projectsFetching(trayId, request) {
  return {type: PROJECTS_FETCHING, trayId, request}
}

export const PROJECTS_FETCHED = 'PROJECTS_FETCHED'
export function projectsFetched(trayId, projects) {
  const data = Immutable.fromJS(projects)
  const serverType = data.first() ? data.first().get('serverType') : ''
  return {type: PROJECTS_FETCHED, trayId, data, serverType, timestamp: moment().format()}
}

export const PROJECTS_FETCH_ERROR = 'PROJECTS_FETCH_ERROR'
export function projectsFetchError(trayId, errors) {
  return {type: PROJECTS_FETCH_ERROR, trayId, errors: Immutable.List(errors)}
}

export const SET_TRAY_NAME = 'SET_TRAY_NAME'
export function setTrayName(trayId, name) {
  return {type: SET_TRAY_NAME, trayId, name}
}

export const SET_SERVER_TYPE = 'SET_SERVER_TYPE'
export function setServerType(trayId, serverType) {
  return {type: SET_SERVER_TYPE, trayId, serverType}
}

export const SET_TRAY_USERNAME = 'SET_TRAY_USERNAME'
export function setTrayUsername(trayId, username) {
  return {type: SET_TRAY_USERNAME, trayId, username}
}

export const SET_TRAY_URL = 'SET_TRAY_URL'
export function setTrayUrl(trayId, url) {
  return {type: SET_TRAY_URL, trayId, url}
}

export const SET_TRAY_ID = 'SET_TRAY_ID'
export function setTrayId(originalTrayId, newTrayId) {
  return {type: SET_TRAY_ID, originalTrayId, newTrayId}
}

export const SELECT_PROJECT = 'SELECT_PROJECT'
export function selectProject(trayId, projectId, selected) {
  return {type: SELECT_PROJECT, trayId, projectId, selected}
}

export function updateTrayId(tray, newTrayId, pendingRequest) {
  return function (dispatch) {
    dispatch(setTrayId(tray.trayId, newTrayId))
    const updatedTray = Object.assign({}, tray, {trayId: newTrayId})
    dispatch(refreshTray(updatedTray, pendingRequest))
  }
}

export function encryptPassword(trayId, password, pendingRequest) {
  abortPendingRequest(pendingRequest)

  return function (dispatch) {
    if (isNotBlank(password)) {
      const request = encrypt(password)

      dispatch(encryptingPassword(trayId, password, request))

      return send(request)
        .then((data) => {
          dispatch(passwordEncrypted(trayId, data.password))
          return data.password
        }).catch((error) => dispatch(passwordEncryptError(trayId, [
          'Unable to encrypt password because of an error:',
          `${error.status} - ${error.message}`
        ])))
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

      if (isNotBlank(rawPassword)) {
        return dispatch(encryptPassword(trayId, rawPassword))
          .then((encryptedPassword) => dispatch(refreshTray({trayId, url, username, password: encryptedPassword})))
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

    return send(request)
      .then((json) => {
        const filteredProjects = json.filter((project) => !project.job)
        return dispatch(projectsFetched(trayId, filteredProjects))
      }).catch((error) => dispatch(projectsFetchError(trayId, [
        'Unable to fetch projects because of an error:',
        `${error.status} - ${error.message}`
      ])))
  }
}
