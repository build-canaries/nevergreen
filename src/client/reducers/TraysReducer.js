import Immutable from 'immutable'
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
  SET_TRAY_ID,
  SET_TRAY_NAME,
  SET_TRAY_URL,
  SET_TRAY_USERNAME,
  TRAY_ADDED
} from '../actions/Actions'

const DEFAULT_STATE = Immutable.OrderedMap()

export function reduce(state = DEFAULT_STATE, action) {
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

    case NAVIGATED:
      return state.map((tray) => tray.set('highlight', false))

    case REMOVE_TRAY:
      return state.delete(action.trayId)

    case ENCRYPTING_PASSWORD:
    case PROJECTS_FETCHING:
      return state.update(action.trayId, (tray) =>
        tray.withMutations((map) =>
          map.set('loaded', false)
            .delete('errors')
            .set('pendingRequest', action.request)))

    case PASSWORD_ENCRYPTED:
      return state.update(action.trayId, (tray) =>
        tray.withMutations((map) =>
          map.set('loaded', true)
            .set('password', action.password)
            .delete('errors')
            .delete('pendingRequest')))

    case PROJECTS_FETCHED:
      return state.update(action.trayId, (tray) =>
        tray.withMutations((map) =>
          map.set('loaded', true)
            .set('timestamp', action.timestamp)
            .set('serverType', action.serverType)
            .delete('errors')
            .delete('pendingRequest')))

    case PASSWORD_ENCRYPT_ERROR:
    case PROJECTS_FETCH_ERROR:
      return state.update(action.trayId, (tray) =>
        tray.withMutations((map) =>
          map.set('loaded', true)
            .set('errors', action.errors)
            .delete('pendingRequest')))

    case SET_TRAY_NAME:
      return state.update(action.trayId, (tray) => tray.set('name', action.name))

    case SET_SERVER_TYPE:
      return state.update(action.trayId, (tray) => tray.set('serverType', action.serverType))

    case SET_TRAY_USERNAME:
      return state.update(action.trayId, (tray) => tray.set('username', action.username))

    case SET_TRAY_URL:
      return state.update(action.trayId, (tray) => tray.set('url', action.url))

    case SET_TRAY_ID:
      return state.update(action.originalTrayId, (tray) => tray.set('trayId', action.newTrayId))
        .mapKeys((key) => key === action.originalTrayId ? action.newTrayId : key)

    default:
      return state
  }
}
