import {Actions} from '../actions/Actions'
import {AuthTypes, Tray} from '../domain/Tray'
import {ActionSetConfiguration} from '../actions/NevergreenActionCreators'
import {
  ActionHighlightTray,
  ActionProjectsFetched,
  ActionProjectsFetchError,
  ActionProjectsFetching,
  ActionRemoveTray,
  ActionSetIncludeNew,
  ActionSetServerType,
  ActionSetTrayAuthType,
  ActionSetTrayName,
  ActionSetTrayUrl,
  ActionSetTrayUsername,
  ActionTrayAdded
} from '../actions/TrackingActionCreators'
import {ActionEncryptingPassword, ActionPasswordEncryptError} from '../actions/PasswordActionCreators'
import {
  ActionEncryptingToken,
  ActionTokenEncrypted,
  ActionTokenEncryptError
} from '../actions/AccessTokenActionCreators'
import {createReducer, createSelector} from 'redux-starter-kit'
import {Draft} from 'immer'
import {State} from './Reducer'
import {get} from 'lodash'
import {isBlank} from '../common/Utils'

export interface TraysState {
  readonly [trayId: string]: Tray;
}

export const TRAYS_ROOT = 'trays'

const DEFAULT_STATE: TraysState = {}

export const reduce = createReducer<TraysState>(DEFAULT_STATE, {
  [Actions.SET_CONFIGURATION]: (draft: Draft<TraysState>, action: ActionSetConfiguration) => {
    const newState: Draft<TraysState> = {}
    const data = action.configuration[TRAYS_ROOT] as TraysState || draft
    Object.keys(data).forEach((trayId) => {
      newState[trayId] = data[trayId]
      newState[trayId].loaded = true
    })
    return newState
  },
  [Actions.TRAY_ADDED]: (draft, action: ActionTrayAdded) => {
    draft[action.trayId] = action.data
  },
  [Actions.HIGHLIGHT_TRAY]: (draft, action: ActionHighlightTray) => {
    draft[action.trayId].highlight = true
  },
  [Actions.NAVIGATED]: (draft) => {
    Object.keys(draft).forEach((trayId) => {
      draft[trayId].highlight = false
    })
  },
  [Actions.REMOVE_TRAY]: (draft, action: ActionRemoveTray) => {
    delete draft[action.trayId]
  },
  [Actions.ENCRYPTING_PASSWORD]: (draft, action: ActionEncryptingPassword) => {
    draft[action.trayId].loaded = false
    draft[action.trayId].requiresRefresh = false
    draft[action.trayId].errors = []
  },
  [Actions.PASSWORD_ENCRYPTED]: (draft, action: ActionEncryptingPassword) => {
    draft[action.trayId].loaded = true
    draft[action.trayId].password = action.password
    draft[action.trayId].requiresRefresh = true
    draft[action.trayId].errors = []
  },
  [Actions.PASSWORD_ENCRYPT_ERROR]: (draft, action: ActionPasswordEncryptError) => {
    draft[action.trayId].loaded = true
    draft[action.trayId].errors = action.errors
  },
  [Actions.ENCRYPTING_TOKEN]: (draft, action: ActionEncryptingToken) => {
    draft[action.trayId].loaded = false
    draft[action.trayId].requiresRefresh = false
    draft[action.trayId].errors = []
  },
  [Actions.TOKEN_ENCRYPTED]: (draft, action: ActionTokenEncrypted) => {
    draft[action.trayId].loaded = true
    draft[action.trayId].accessToken = action.accessToken
    draft[action.trayId].requiresRefresh = true
    draft[action.trayId].errors = []
  },
  [Actions.TOKEN_ENCRYPT_ERROR]: (draft, action: ActionTokenEncryptError) => {
    draft[action.trayId].loaded = true
    draft[action.trayId].errors = action.errors
  },
  [Actions.PROJECTS_FETCHING]: (draft, action: ActionProjectsFetching) => {
    draft[action.trayId].loaded = false
    draft[action.trayId].requiresRefresh = false
    draft[action.trayId].errors = []
  },
  [Actions.PROJECTS_FETCHED]: (draft, action: ActionProjectsFetched) => {
    draft[action.trayId].loaded = true
    draft[action.trayId].timestamp = action.timestamp
    draft[action.trayId].serverType = action.serverType
    draft[action.trayId].errors = []
  },
  [Actions.PROJECTS_FETCH_ERROR]: (draft, action: ActionProjectsFetchError) => {
    draft[action.trayId].loaded = true
    draft[action.trayId].errors = action.errors
  },
  [Actions.SET_TRAY_NAME]: (draft, action: ActionSetTrayName) => {
    draft[action.trayId].name = action.name
  },
  [Actions.SET_SERVER_TYPE]: (draft, action: ActionSetServerType) => {
    draft[action.trayId].serverType = action.serverType
  },
  [Actions.SET_TRAY_AUTH_TYPE]: (draft, action: ActionSetTrayAuthType) => {
    draft[action.trayId].requiresRefresh = draft[action.trayId].authType !== action.authType
    draft[action.trayId].authType = action.authType
  },
  [Actions.SET_TRAY_USERNAME]: (draft, action: ActionSetTrayUsername) => {
    draft[action.trayId].requiresRefresh = draft[action.trayId].username !== action.username
    draft[action.trayId].username = action.username
  },
  [Actions.SET_TRAY_URL]: (draft, action: ActionSetTrayUrl) => {
    draft[action.trayId].requiresRefresh = draft[action.trayId].url !== action.url
    draft[action.trayId].url = action.url
  },
  [Actions.SET_INCLUDE_NEW]: (draft, action: ActionSetIncludeNew) => {
    draft[action.trayId].includeNew = action.value
  }
})

export const getTrays = createSelector<State, Tray[]>([TRAYS_ROOT], (trays) => Object.values(trays))
export const getTrayIds = createSelector<State, string[]>([TRAYS_ROOT], (trays) => Object.keys(trays))

export function getTray(state: State, trayId: string): Tray {
  return get(state, [TRAYS_ROOT, trayId])
}

export function getTrayLoaded(state: State, trayId: string): boolean {
  return get(state, [TRAYS_ROOT, trayId, 'loaded'])
}

export function getTrayName(state: State, trayId: string): string {
  return get(state, [TRAYS_ROOT, trayId, 'name']) || ''
}

export function getTrayUrl(state: State, trayId: string): string {
  return get(state, [TRAYS_ROOT, trayId, 'url'])
}

export function getTrayUsername(state: State, trayId: string): string {
  return get(state, [TRAYS_ROOT, trayId, 'username']) || ''
}

export function getTrayPassword(state: State, trayId: string): string {
  return get(state, [TRAYS_ROOT, trayId, 'password']) || ''
}

export function getTrayAuthType(state: State, trayId: string): AuthTypes {
  // TODO: This should be moved to a data migration
  const username = getTrayUsername(state, trayId)
  const password = getTrayPassword(state, trayId)
  const defaultAuthType = !isBlank(username) || !isBlank(password)
    ? AuthTypes.basic
    : AuthTypes.none

  return get(state, [TRAYS_ROOT, trayId, 'authType']) || defaultAuthType
}

export function getTrayAccessToken(state: State, trayId: string): string {
  return get(state, [TRAYS_ROOT, trayId, 'accessToken']) || ''
}

export function getTrayServerType(state: State, trayId: string): string {
  return get(state, [TRAYS_ROOT, trayId, 'serverType'])
}

export function getTrayIncludeNew(state: State, trayId: string): boolean {
  return get(state, [TRAYS_ROOT, trayId, 'includeNew'])
}

export function getTrayHighlight(state: State, trayId: string): boolean {
  return get(state, [TRAYS_ROOT, trayId, 'highlight'])
}

export function getTrayErrors(state: State, trayId: string): string[] {
  return get(state, [TRAYS_ROOT, trayId, 'errors'])
}

export function getTrayTimestamp(state: State, trayId: string): string {
  return get(state, [TRAYS_ROOT, trayId, 'timestamp']) || ''
}

export function getTrayRequiresRefresh(state: State, trayId: string): boolean {
  return get(state, [TRAYS_ROOT, trayId, 'requiresRefresh'])
}
