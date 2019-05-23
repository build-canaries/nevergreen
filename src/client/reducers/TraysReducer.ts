import {Actions} from '../actions/Actions'
import {Tray} from '../domain/Tray'
import {ActionInitalised, ActionNavigated} from '../actions/NevergreenActionCreators'
import {ActionImportSuccess} from '../actions/ImportActionCreators'
import {
  ActionHighlightTray,
  ActionProjectsFetched,
  ActionProjectsFetchError,
  ActionProjectsFetching,
  ActionRemoveTray,
  ActionSetIncludeNew,
  ActionSetServerType,
  ActionSetTrayName,
  ActionSetTrayUrl,
  ActionSetTrayUsername,
  ActionTrayAdded
} from '../actions/TrackingActionCreators'
import {
  ActionEncryptingPassword,
  ActionPasswordEncryptError,
  ActionPasswordEncryted
} from '../actions/PasswordActionCreators'
import {omit} from 'lodash'

export interface TraysState {
  readonly [trayId: string]: Tray;
}

type SupportedActions = ActionInitalised
  | ActionImportSuccess
  | ActionTrayAdded
  | ActionHighlightTray
  | ActionNavigated
  | ActionRemoveTray
  | ActionEncryptingPassword
  | ActionProjectsFetching
  | ActionPasswordEncryted
  | ActionProjectsFetched
  | ActionPasswordEncryptError
  | ActionProjectsFetchError
  | ActionSetTrayName
  | ActionSetServerType
  | ActionSetTrayUsername
  | ActionSetTrayUrl
  | ActionSetIncludeNew

export const TRAYS_ROOT = 'trays'

const DEFAULT_STATE: TraysState = {}

export function reduce(state = DEFAULT_STATE, action: SupportedActions): TraysState {
  switch (action.type) {
    case Actions.INITIALISED:
    case Actions.IMPORT_SUCCESS:
      return action.data[TRAYS_ROOT]
        ? Object.values(action.data[TRAYS_ROOT] as TraysState).reduce((acc, tray) => {
          // @ts-ignore
          acc[tray.trayId] = {...tray, loaded: true}
          return acc
        }, {})
        : state

    case Actions.TRAY_ADDED:
      return {...state, [action.trayId]: action.data}

    case Actions.HIGHLIGHT_TRAY:
      return {
        ...state,
        [action.trayId]: {
          ...state[action.trayId],
          highlight: true
        }
      }

    case Actions.NAVIGATED: {
      const newState: { [trayId: string]: Tray } = {}
      return Object.keys(state).reduce((acc, trayId) => {
        acc[trayId] = {...state[trayId], highlight: false}
        return acc
      }, newState)
    }

    case Actions.REMOVE_TRAY:
      return omit(state, action.trayId)

    case Actions.ENCRYPTING_PASSWORD:
    case Actions.PROJECTS_FETCHING:
      return {
        ...state,
        [action.trayId]: {
          ...state[action.trayId],
          loaded: false,
          requiresRefresh: false,
          errors: []
        }
      }

    case Actions.PASSWORD_ENCRYPTED:
      return {
        ...state,
        [action.trayId]: {
          ...state[action.trayId],
          loaded: true,
          password: action.password,
          requiresRefresh: true,
          errors: []
        }
      }

    case Actions.PROJECTS_FETCHED:
      return {
        ...state,
        [action.trayId]: {
          ...state[action.trayId],
          loaded: true,
          timestamp: action.timestamp,
          serverType: action.serverType,
          errors: []
        }
      }

    case Actions.PASSWORD_ENCRYPT_ERROR:
    case Actions.PROJECTS_FETCH_ERROR:
      return {
        ...state,
        [action.trayId]: {
          ...state[action.trayId],
          loaded: true,
          errors: action.errors
        }
      }

    case Actions.SET_TRAY_NAME:
      return {
        ...state,
        [action.trayId]: {
          ...state[action.trayId],
          name: action.name
        }
      }

    case Actions.SET_SERVER_TYPE :
      return {
        ...state,
        [action.trayId]: {
          ...state[action.trayId],
          serverType: action.serverType
        }
      }

    case Actions.SET_TRAY_USERNAME :
      return {
        ...state,
        [action.trayId]: {
          ...state[action.trayId],
          username: action.username,
          requiresRefresh: state[action.trayId].username !== action.username
        }
      }

    case Actions.SET_TRAY_URL :
      return {
        ...state,
        [action.trayId]: {
          ...state[action.trayId],
          url: action.url,
          requiresRefresh: state[action.trayId].url !== action.url
        }
      }

    case Actions.SET_INCLUDE_NEW :
      return {
        ...state,
        [action.trayId]: {
          ...state[action.trayId],
          includeNew: action.value
        }
      }

    default:
      return state
  }
}
