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
  UPDATING_TRAY
} from '../actions/TrackingActions'
import {INITIALISED} from '../actions/NevergreenActions'
import {IMPORTED_DATA} from '../actions/BackupActions'

const DefaultState = Immutable.OrderedMap()

export function reduce(state = DefaultState, action) {
  switch (action.type) {
    case INITIALISED:
    case IMPORTED_DATA: {
      const trays = action.data.get('trays')
      return trays ? Immutable.Map(trays).map((tray) => tray.set('loaded', true)) : state
    }

    case TRAY_ADDED:
      return state.set(action.trayId, action.data)

    case REMOVE_TRAY:
      return state.delete(action.trayId)

    case ENCRYPTING_PASSWORD:
    case PROJECTS_FETCHING:
      return state.update(action.trayId, (tray) => tray.set('loaded', false))

    case PASSWORD_ENCRYPTED:
      return state.update(action.trayId, (tray) =>
        tray.withMutations((map) =>
          map.set('loaded', true).set('password', action.password).delete('errors')))

    case PROJECTS_FETCHED:
      return state.update(action.trayId, (tray) =>
        tray.withMutations((map) =>
          map.set('loaded', true).set('timestamp', action.timestamp).delete('errors')))

    case PASSWORD_ENCRYPT_ERROR:
    case PROJECTS_FETCH_ERROR:
      return state.update(action.trayId, (tray) =>
        tray.withMutations((map) =>
          map.set('loaded', true).set('errors', action.errors)))

    case UPDATING_TRAY:
      return state.update(action.trayId, (tray) => tray.merge(action.data))

    default:
      return state
  }
}
