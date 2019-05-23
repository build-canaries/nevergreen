import {Actions} from '../actions/Actions'
import {combineReducers} from 'redux'
import {
  ActionBackupSetDescription,
  ActionBackupSetId,
  ActionBackupSetUrl,
  BackupLocation
} from '../actions/BackupActionCreators'
import {ActionInitalised} from '../actions/NevergreenActionCreators'
import {get} from 'lodash'

export interface BackupLocationState {
  readonly id: string;
  readonly description: string;
  readonly url: string;
}

export type BackupState = {
  readonly [key in BackupLocation]: BackupLocationState;
}

export const BACKUP_ROOT = 'backup'

type SupportedActions = ActionInitalised | ActionBackupSetUrl | ActionBackupSetDescription | ActionBackupSetId

const DEFAULT_GITHUB_STATE: BackupLocationState = {
  id: '',
  description: 'Nevergreen configuration backup',
  url: 'https://api.github.com'
}

const DEFAULT_GITLAB_STATE: BackupLocationState = {
  id: '',
  description: 'Nevergreen configuration backup',
  url: 'https://gitlab.com'
}

export function createReducer(location: BackupLocation, defaultState: BackupLocationState) {
  return function reduceLocation(state = defaultState, action: SupportedActions) {
    switch (action.type) {
      case Actions.INITIALISED:
        return {...state, ...get(action.data, [BACKUP_ROOT, location])}
      case Actions.BACKUP_SET_DESCRIPTION:
        return {...state, description: action.description}
      case Actions.BACKUP_SET_ID:
        return {...state, id: action.id}
      case Actions.BACKUP_SET_URL:
        return {...state, url: action.url}
      default:
        return state
    }
  }
}

export const reduce = combineReducers<BackupState>({
  [BackupLocation.GITHUB]: createReducer(BackupLocation.GITHUB, DEFAULT_GITHUB_STATE),
  [BackupLocation.GITLAB]: createReducer(BackupLocation.GITLAB, DEFAULT_GITLAB_STATE)
})
