import Immutable from 'immutable'
import {encryptPassword as encrypt} from '../common/gateways/SecurityGateway'
import {fetchAll} from '../common/gateways/ProjectsGateway'
import moment from 'moment'
import _ from 'lodash'
import nameGenerator from 'project-name-generator'

function hasScheme(url) {
  return _.size(_.split(url, '://')) > 1
}

function isNotBlank(value) {
  return _.size(value) > 0
}

function generateRandomName() {
  return _.lowerCase(nameGenerator().spaced)
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

export const CLEAR_TRAY_HIGHLIGHT = 'CLEAR_TRAY_HIGHLIGHT'
export function clearTrayHighlight(trayId) {
  return {type: CLEAR_TRAY_HIGHLIGHT, trayId}
}

export const ENCRYPTING_PASSWORD = 'ENCRYPTING_PASSWORD'
export function encryptingPassword(trayId, password) {
  return {type: ENCRYPTING_PASSWORD, trayId, password}
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
export function removeTray(trayId) {
  return {type: REMOVE_TRAY, trayId}
}

export const PROJECTS_FETCHING = 'PROJECTS_FETCHING'
export function projectsFetching(trayId) {
  return {type: PROJECTS_FETCHING, trayId}
}

export const PROJECTS_FETCHED = 'PROJECTS_FETCHED'
export function projectsFetched(trayId, projects) {
  return {type: PROJECTS_FETCHED, trayId, data: Immutable.fromJS(projects), timestamp: moment().format()}
}

export const PROJECTS_FETCH_ERROR = 'PROJECTS_FETCH_ERROR'
export function projectsFetchError(trayId, errors) {
  return {type: PROJECTS_FETCH_ERROR, trayId, errors: Immutable.List(errors)}
}

export const UPDATING_TRAY = 'UPDATING_TRAY'
export function updatingTray(trayId, name, url, username) {
  return {type: UPDATING_TRAY, trayId, data: Immutable.Map({trayId, name, url, username}), timestamp: moment().format()}
}

export const SELECT_PROJECT = 'SELECT_PROJECT'
export function selectProject(trayId, projectId, selected) {
  return {type: SELECT_PROJECT, trayId, projectId, selected}
}

export function encryptPassword(trayId, password) {
  return function (dispatch) {
    dispatch(encryptingPassword(trayId, password))
    return encrypt(password)
      .then((data) => {
        dispatch(passwordEncrypted(trayId, data.password))
        return data.password
      }).catch((error) => dispatch(passwordEncryptError(trayId, [
        'Unable to encrypt password because of an error:',
        `${error.status} - ${error.message}`
      ])))
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

export function updateTray(trayId, name, url, username, oldPassword, newPassword) {
  return function (dispatch) {
    dispatch(updatingTray(trayId, name, url, username))

    if (isNotBlank(newPassword)) {
      return dispatch(encryptPassword(trayId, newPassword))
        .then((encryptedPassword) => dispatch(refreshTray({trayId, url, username, password: encryptedPassword})))
    } else {
      return dispatch(refreshTray({trayId, url, username, password: oldPassword}))
    }
  }
}

export function refreshTray(tray) {
  return function (dispatch) {
    const trayId = tray.trayId
    dispatch(projectsFetching(trayId))
    return fetchAll([tray])
      .then((json) => {
        const filteredProjects = json.filter((project) => !project.job)
        return dispatch(projectsFetched(trayId, filteredProjects))
      })
      .catch((error) => dispatch(projectsFetchError(trayId, [
        'Unable to fetch projects because of an error:',
        `${error.status} - ${error.message}`
      ])))
  }
}
