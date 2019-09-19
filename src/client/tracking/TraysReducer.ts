import {Actions} from '../Actions'
import {AuthTypes, Tray} from '../domain/Tray'
import {ActionSetConfiguration} from '../NevergreenActionCreators'
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
} from './TrackingActionCreators'
import {ActionEncryptingPassword, ActionPasswordEncryptError} from './PasswordActionCreators'
import {ActionEncryptingToken, ActionTokenEncrypted, ActionTokenEncryptError} from './AccessTokenActionCreators'
import {createReducer, createSelector} from 'redux-starter-kit'
import {Draft} from 'immer'
import {State} from '../Reducer'
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
      newState[trayId] = data[trayId] as Draft<Tray>
      newState[trayId].loaded = true
    })
    return newState
  },
  [Actions.TRAY_ADDED]: (draft, action: ActionTrayAdded) => {
    draft[action.trayId] = action.data as Draft<Tray>
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
    draft[action.trayId].errors = action.errors as string[]
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
    draft[action.trayId].errors = action.errors as string[]
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
    draft[action.trayId].errors = action.errors as string[]
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

const getTracking = (state: State) => state[TRAYS_ROOT]
export const getTrays = createSelector(getTracking, (trays) => Object.values(trays))
export const getTrayIds = createSelector(getTracking, (trays) => Object.keys(trays))
export const getTray = (trayId: string) => createSelector(getTracking, (trays) => trays[trayId])
export const getTrayLoaded = (trayId: string) => createSelector(getTray(trayId), (tray) => tray.loaded)
export const getTrayName = (trayId: string) => createSelector(getTray(trayId), (tray) => tray.name || '')
export const getTrayUrl = (trayId: string) => createSelector(getTray(trayId), (tray) => tray.url)
export const getTrayUsername = (trayId: string) => createSelector(getTray(trayId), (tray) => tray.username || '')
export const getTrayPassword = (trayId: string) => createSelector(getTray(trayId), (tray) => tray.password || '')
export const getTrayAccessToken = (trayId: string) => createSelector(getTray(trayId), (tray) => tray.accessToken || '')
export const getTrayServerType = (trayId: string) => createSelector(getTray(trayId), (tray) => tray.serverType)
export const getTrayIncludeNew = (trayId: string) => createSelector(getTray(trayId), (tray) => tray.includeNew)
export const getTrayHighlight = (trayId: string) => createSelector(getTray(trayId), (tray) => tray.highlight)
export const getTrayErrors = (trayId: string) => createSelector(getTray(trayId), (tray) => tray.errors)
export const getTrayTimestamp = (trayId: string) => createSelector(getTray(trayId), (tray) => tray.timestamp || '')
export const getTrayRequiresRefresh = (trayId: string) => createSelector(getTray(trayId), (tray) => tray.requiresRefresh)
export const getTrayAuthType = (trayId: string) => createSelector(getTray(trayId), (tray) => {
  // TODO: This should be moved to a data migration
  const username = tray.username
  const password = tray.password
  const defaultAuthType = !isBlank(username) || !isBlank(password)
    ? AuthTypes.basic
    : AuthTypes.none

  return tray.authType || defaultAuthType
})
