import {OrderedMap} from 'immutable'
import {
  ENCRYPTING_PASSWORD,
  HIGHLIGHT_TRAY,
  IMPORT_SUCCESS,
  INITIALISED,
  NAVIGATED,
  PASSWORD_ENCRYPT_ERROR,
  PASSWORD_ENCRYPTED,
  PROJECTS_FETCH_ERROR,
  PROJECTS_FETCHED,
  PROJECTS_FETCHING,
  REMOVE_TRAY,
  SET_SERVER_TYPE,
  SET_TRAY_NAME,
  SET_TRAY_URL,
  SET_TRAY_USERNAME,
  TRAY_ADDED
} from '../actions/Actions'
import {Tray} from '../domain/Tray'

export const TRAYS_ROOT = 'trays'

const DEFAULT_STATE = OrderedMap()

function updateState(action, state) {
  const trays = action.data.get(TRAYS_ROOT)
  return trays
    ? OrderedMap(trays).map((tray) => new Tray(tray).set('loaded', true))
    : state
}

function updateRequired(state, action, prop) {
  return state.getIn([action.trayId, prop]) !== action[prop]
}

function updateUsername(state, action) {
  if (updateRequired(state, action, 'username')) {
    return state.update(action.trayId, (tray) => tray
      .set('username', action.username)
      .set('requiresRefresh', true))
  }
  return state
}

function updateUrl(state, action) {
  if (updateRequired(state, action, 'url')) {
    return state.update(action.trayId, (tray) => tray
      .set('url', action.url)
      .set('requiresRefresh', true))
  }
  return state
}

function updateFetching(state, action) {
  return state.update(action.trayId, (tray) => tray
    .withMutations((map) => map
      .set('loaded', false)
      .set('requiresRefresh', false)
      .delete('errors')))
}

function updatePassword(state, action) {
  return state.update(action.trayId, (tray) => tray
    .withMutations((map) => map
      .set('loaded', true)
      .set('password', action.password)
      .set('requiresRefresh', true)
      .delete('errors')))
}

function updateProjects(state, action) {
  return state.update(action.trayId, (tray) => tray
    .withMutations((map) => map
      .set('loaded', true)
      .set('timestamp', action.timestamp)
      .set('serverType', action.serverType)
      .delete('errors')))
}

function updateErrors(state, action) {
  return state.update(action.trayId, (tray) => tray
    .withMutations((map) => map
      .set('loaded', true)
      .set('errors', action.errors)))
}

export function reduce(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case INITIALISED:
    case IMPORT_SUCCESS:
      return updateState(action, state)

    case TRAY_ADDED:
      return state.set(action.trayId, action.data)

    case HIGHLIGHT_TRAY:
      return state.update(action.trayId, (tray) => tray
        .set('highlight', true))

    case NAVIGATED:
      return state.map((tray) => tray
        .set('highlight', false))

    case REMOVE_TRAY:
      return state.delete(action.trayId)

    case ENCRYPTING_PASSWORD:
    case PROJECTS_FETCHING:
      return updateFetching(state, action)

    case PASSWORD_ENCRYPTED:
      return updatePassword(state, action)

    case PROJECTS_FETCHED:
      return updateProjects(state, action)

    case PASSWORD_ENCRYPT_ERROR:
    case PROJECTS_FETCH_ERROR:
      return updateErrors(state, action)

    case SET_TRAY_NAME:
      return state.update(action.trayId, (tray) => tray
        .set('name', action.name))

    case SET_SERVER_TYPE:
      return state.update(action.trayId, (tray) => tray
        .set('serverType', action.serverType))

    case SET_TRAY_USERNAME:
      return updateUsername(state, action)

    case SET_TRAY_URL:
      return updateUrl(state, action)

    default:
      return state
  }
}
