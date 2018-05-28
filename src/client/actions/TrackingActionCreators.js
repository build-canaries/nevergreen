import Immutable from 'immutable'
import {now} from '../common/DateTime'
import {generateRandomName} from '../domain/Tray'
import {
  HIGHLIGHT_TRAY,
  PROJECTS_FETCH_ERROR,
  PROJECTS_FETCHED,
  PROJECTS_FETCHING,
  REMOVE_TRAY,
  SELECT_PROJECT,
  SET_SERVER_TYPE,
  SET_TRAY_ID,
  SET_TRAY_NAME,
  SET_TRAY_URL,
  SET_TRAY_USERNAME,
  TRAY_ADDED
} from './Actions'
import {abortPendingRequest} from '../common/gateways/Gateway'

export function trayAdded(trayId, url, username) {
  return {
    type: TRAY_ADDED,
    trayId,
    data: Immutable.Map({trayId, url, username, name: generateRandomName(), highlight: true})
  }
}

export function highlightTray(trayId) {
  return {type: HIGHLIGHT_TRAY, trayId}
}

export function removeTray(trayId, pendingRequest) {
  abortPendingRequest(pendingRequest)
  return {type: REMOVE_TRAY, trayId}
}

export function projectsFetching(trayId, request) {
  return {type: PROJECTS_FETCHING, trayId, request}
}

export function projectsFetched(trayId, projects, selectAll) {
  const data = Immutable.fromJS(projects)
  const serverType = data.first() ? data.first().get('serverType') : ''

  return {
    type: PROJECTS_FETCHED,
    trayId,
    data,
    serverType,
    timestamp: now(),
    selectAll
  }
}

export function projectsFetchError(trayId, errors) {
  return {type: PROJECTS_FETCH_ERROR, trayId, errors: Immutable.List(errors)}
}

export function setTrayName(trayId, name) {
  return {type: SET_TRAY_NAME, trayId, name}
}

export function setServerType(trayId, serverType) {
  return {type: SET_SERVER_TYPE, trayId, serverType}
}

export function setTrayUsername(trayId, username) {
  return {type: SET_TRAY_USERNAME, trayId, username}
}

export function setTrayUrl(trayId, url) {
  return {type: SET_TRAY_URL, trayId, url}
}

export function setTrayId(originalTrayId, newTrayId) {
  return {type: SET_TRAY_ID, originalTrayId, newTrayId}
}

export function selectProject(trayId, projectId, selected) {
  return {type: SELECT_PROJECT, trayId, projectId, selected}
}
