import Immutable from 'immutable'
import {
  TRAY_ADDED,
  REMOVE_TRAY,
  ENCRYPTING_PASSWORD,
  PASSWORD_ENCRYPTED,
  PASSWORD_ENCRYPT_ERROR,
  PROJECTS_FETCHING,
  PROJECTS_FETCH_ERROR,
  PROJECTS_FETCHED,
  HIGHLIGHT_TRAY,
  CLEAR_TRAY_HIGHLIGHT,
  SET_TRAY_NAME,
  SET_SERVER_TYPE,
  SET_TRAY_USERNAME
} from '../actions/TrackingActions'
import {INITIALISED} from '../actions/NevergreenActions'
import {IMPORT_SUCCESS} from '../actions/ImportActions'

const DefaultState = Immutable.OrderedMap()

export function reduce(state = DefaultState, action) {
  switch (action.type) {
    case INITIALISED:
    case IMPORT_SUCCESS: {
      const trays = action.data.get('trays')
      return trays ? Immutable.Map(trays).map((tray) => tray.set('loaded', true)) : state
    }

    case TRAY_ADDED:
      return state.set(action.trayId, action.data)

    case HIGHLIGHT_TRAY:
      return state.update(action.trayId, (tray) => tray.set('highlight', true))

    case CLEAR_TRAY_HIGHLIGHT:
      return state.has(action.trayId) ? state.update(action.trayId, (tray) => tray.set('highlight', false)) : state

    case REMOVE_TRAY:
      return state.delete(action.trayId)

    case ENCRYPTING_PASSWORD:
    case PROJECTS_FETCHING:
      return state.update(action.trayId, (tray) =>
        tray.withMutations((map) =>
          map.set('loaded', false).delete('errors').set('pendingRequest', action.request)))

    case PASSWORD_ENCRYPTED:
      return state.update(action.trayId, (tray) =>
        tray.withMutations((map) =>
          map.set('loaded', true).set('password', action.password).delete('errors').delete('pendingRequest')))

    case PROJECTS_FETCHED:
      return state.update(action.trayId, (tray) =>
        tray.withMutations((map) =>
          map.set('loaded', true).set('timestamp', action.timestamp).set('serverType', action.serverType).delete('errors').delete('pendingRequest')))

    case PASSWORD_ENCRYPT_ERROR:
    case PROJECTS_FETCH_ERROR:
      return state.update(action.trayId, (tray) =>
        tray.withMutations((map) =>
          map.set('loaded', true).set('errors', action.errors).delete('pendingRequest')))

    case SET_TRAY_NAME:
      return state.update(action.trayId, (tray) => tray.set('name', action.name))

    case SET_SERVER_TYPE:
      return state.update(action.trayId, (tray) => tray.set('serverType', action.serverType))

    case SET_TRAY_USERNAME:
      return state.update(action.trayId, (tray) => tray.set('username', action.username))

    default:
      return state
  }
}
