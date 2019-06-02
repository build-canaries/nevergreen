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
import {createReducer, createSelector} from 'redux-starter-kit'
import {State} from './Reducer'

export interface BackupLocationState {
  readonly id: string;
  readonly description: string;
  readonly url: string;
}

export type BackupState = {
  readonly [key in BackupLocation]: BackupLocationState;
}

export const BACKUP_ROOT = 'backup'

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

export function createBackupReducer(location: BackupLocation, defaultState: BackupLocationState) {
  return createReducer<BackupLocationState>(defaultState, {
    [Actions.INITIALISED]: (draft, action: ActionInitalised) => {
      return {...draft, ...get(action.data, [BACKUP_ROOT, location])}
    },
    [Actions.BACKUP_SET_DESCRIPTION]: (draft, action: ActionBackupSetDescription) => {
      draft.description = action.description
    },
    [Actions.BACKUP_SET_ID]: (draft, action: ActionBackupSetId) => {
      draft.id = action.id
    },
    [Actions.BACKUP_SET_URL]: (draft, action: ActionBackupSetUrl) => {
      draft.url = action.url
    }
  })
}

export const reduce = combineReducers<BackupState>({
  [BackupLocation.GITHUB]: createBackupReducer(BackupLocation.GITHUB, DEFAULT_GITHUB_STATE),
  [BackupLocation.GITLAB]: createBackupReducer(BackupLocation.GITLAB, DEFAULT_GITLAB_STATE)
})

export const getGistId = createSelector<State, string>([[BACKUP_ROOT, BackupLocation.GITHUB, 'id']])
export const getGistDescription = createSelector<State, string>([[BACKUP_ROOT, BackupLocation.GITHUB, 'description']])
export const getGitHubUrl = createSelector<State, string>([[BACKUP_ROOT, BackupLocation.GITHUB, 'url']])
export const getSnippetId = createSelector<State, string>([[BACKUP_ROOT, BackupLocation.GITLAB, 'id']])
export const getSnippetDescription = createSelector<State, string>([[BACKUP_ROOT, BackupLocation.GITLAB, 'description']])
export const getGitlabUrl = createSelector<State, string>([[BACKUP_ROOT, BackupLocation.GITLAB, 'url']])

export function getBackupId(location: BackupLocation, state: State) {
  return location === BackupLocation.GITHUB
    ? getGistId(state)
    : getSnippetId(state)
}

export function getBackupUrl(location: BackupLocation, state: State) {
  return location === BackupLocation.GITHUB
    ? getGitHubUrl(state)
    : getGitlabUrl(state)
}

export function getBackupDescription(location: BackupLocation, state: State) {
  return location === BackupLocation.GITHUB
    ? getGistDescription(state)
    : getSnippetDescription(state)
}
