import {Map} from 'immutable'
import {
  ENCRYPTING_PASSWORD,
  INTERESTING_PROJECTS,
  INTERESTING_PROJECTS_FETCHING,
  PASSWORD_ENCRYPT_ERROR,
  PASSWORD_ENCRYPTED,
  PROJECTS_FETCH_ERROR,
  PROJECTS_FETCHED,
  PROJECTS_FETCHING,
  REMOVE_TRAY
} from '../actions/Actions'
import {INTERESTING_ROOT} from './InterestingReducer'

export const PENDING_REQUESTS_ROOT = 'pendingRequests'

const DEFAULT_STATE = Map()

export function reduce(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case INTERESTING_PROJECTS_FETCHING:
      return state.set(INTERESTING_ROOT, action.request)

    case INTERESTING_PROJECTS:
      return state.delete(INTERESTING_ROOT)

    case ENCRYPTING_PASSWORD:
    case PROJECTS_FETCHING:
      return state.set(action.trayId, action.request)

    case REMOVE_TRAY:
    case PASSWORD_ENCRYPTED:
    case PASSWORD_ENCRYPT_ERROR:
    case PROJECTS_FETCHED:
    case PROJECTS_FETCH_ERROR:
      return state.delete(action.trayId)

    default:
      return state
  }
}
