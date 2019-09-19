import {Actions} from './Actions'
import {get} from 'lodash'
import {ActionEncryptingPassword, ActionPasswordEncryted} from './tracking/PasswordActionCreators'
import {
  ActionProjectsFetched,
  ActionProjectsFetchError,
  ActionProjectsFetching,
  ActionRemoveTray
} from './tracking/TrackingActionCreators'
import {ActionAbortPendingRequest} from './NevergreenActionCreators'
import {State} from './Reducer'
import {createReducer} from 'redux-starter-kit'

export interface PendingRequestsState {
  readonly [key: string]: () => void;
}

export const PENDING_REQUESTS_ROOT = 'pendingRequests'

const DEFAULT_STATE: PendingRequestsState = {}

export const reduce = createReducer<PendingRequestsState>(DEFAULT_STATE, {
  [Actions.ENCRYPTING_PASSWORD]: (draft, action: ActionEncryptingPassword) => {
    draft[action.trayId] = action.request.abort.bind(action.request)
  },
  [Actions.PROJECTS_FETCHING]: (draft, action: ActionProjectsFetching) => {
    draft[action.trayId] = action.request.abort.bind(action.request)
  },
  [Actions.REMOVE_TRAY]: (draft, action: ActionRemoveTray) => {
    delete draft[action.trayId]
  },
  [Actions.PASSWORD_ENCRYPTED]: (draft, action: ActionPasswordEncryted) => {
    delete draft[action.trayId]
  },
  [Actions.PASSWORD_ENCRYPT_ERROR]: (draft, action: ActionProjectsFetchError) => {
    delete draft[action.trayId]
  },
  [Actions.PROJECTS_FETCHED]: (draft, action: ActionProjectsFetched) => {
    delete draft[action.trayId]
  },
  [Actions.PROJECTS_FETCH_ERROR]: (draft, action: ActionProjectsFetchError) => {
    delete draft[action.trayId]
  },
  [Actions.ABORT_PENDING_REQUEST]: (draft, action: ActionAbortPendingRequest) => {
    delete draft[action.id]
  }
})

export function getPendingRequest(state: State, id: string): () => void | undefined {
  return get(state, [PENDING_REQUESTS_ROOT, id])
}
