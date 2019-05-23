import {Actions} from '../actions/Actions'
import {INTERESTING_ROOT} from './InterestingReducer'
import {omit} from 'lodash'
import {ActionInterestingProjects, ActionInterestingProjectsFetching} from '../actions/MonitorActionCreators'
import {
  ActionEncryptingPassword,
  ActionPasswordEncryptError,
  ActionPasswordEncryted
} from '../actions/PasswordActionCreators'
import {
  ActionProjectsFetched,
  ActionProjectsFetchError,
  ActionProjectsFetching,
  ActionRemoveTray
} from '../actions/TrackingActionCreators'
import {ActionAbortPendingRequest} from '../actions/NevergreenActionCreators'

export interface PendingRequestsState {
  readonly [key: string]: () => void;
}

type SupportedActions = ActionInterestingProjectsFetching
  | ActionInterestingProjects
  | ActionEncryptingPassword
  | ActionProjectsFetching
  | ActionRemoveTray
  | ActionPasswordEncryted
  | ActionPasswordEncryptError
  | ActionProjectsFetched
  | ActionProjectsFetchError
  | ActionAbortPendingRequest

export const PENDING_REQUESTS_ROOT = 'pendingRequests'

const DEFAULT_STATE: PendingRequestsState = {}

export function reduce(state = DEFAULT_STATE, action: SupportedActions): PendingRequestsState {
  switch (action.type) {
    case Actions.INTERESTING_PROJECTS_FETCHING:
      return {...state, [INTERESTING_ROOT]: action.request.abort}

    case Actions.INTERESTING_PROJECTS:
      return omit(state, INTERESTING_ROOT)

    case Actions.ENCRYPTING_PASSWORD:
    case Actions.PROJECTS_FETCHING:
      return {...state, [action.trayId]: action.request.abort}

    case Actions.REMOVE_TRAY:
    case Actions.PASSWORD_ENCRYPTED:
    case Actions.PASSWORD_ENCRYPT_ERROR:
    case Actions.PROJECTS_FETCHED:
    case Actions.PROJECTS_FETCH_ERROR:
      return omit(state, action.trayId)

    case Actions.ABORT_PENDING_REQUEST:
      return omit(state, action.id)

    default:
      return state
  }
}
