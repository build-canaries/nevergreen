import {Actions} from '../Actions'
import {
  ActionBackupSetDescription,
  ActionBackupSetId,
  ActionBackupSetUrl,
  ActionConfigurationImported,
  BackupLocation
} from './BackupActionCreators'
import {get, merge} from 'lodash'
import {createReducer} from '@reduxjs/toolkit'
import {State} from '../Reducer'

export type BackupState = {
  readonly [key in BackupLocation]: {
    readonly id: string;
    readonly description: string;
    readonly url: string;
  };
}

export const BACKUP_ROOT = 'backup'

const DEFAULT_STATE: BackupState = {
  [BackupLocation.GITHUB]: {
    id: '',
    description: 'Nevergreen configuration backup',
    url: 'https://api.github.com'
  },
  [BackupLocation.GITLAB]: {
    id: '',
    description: 'Nevergreen configuration backup',
    url: 'https://gitlab.com'
  }
}

export const reduce = createReducer<BackupState>(DEFAULT_STATE, {
  [Actions.CONFIGURATION_IMPORTED]: (draft, action: ActionConfigurationImported) => {
    const importedState = get(action.configuration, [BACKUP_ROOT], {})
    return merge(draft, importedState)
  },
  [Actions.BACKUP_SET_DESCRIPTION]: (draft, action: ActionBackupSetDescription) => {
    draft[action.location].description = action.description
  },
  [Actions.BACKUP_SET_ID]: (draft, action: ActionBackupSetId) => {
    draft[action.location].id = action.id
  },
  [Actions.BACKUP_SET_URL]: (draft, action: ActionBackupSetUrl) => {
    draft[action.location].url = action.url
  }
})

export function getBackupId(location: BackupLocation, state: State): string {
  return get(state, [BACKUP_ROOT, location, 'id'])
}

export function getBackupUrl(location: BackupLocation, state: State): string {
  return get(state, [BACKUP_ROOT, location, 'url'])
}

export function getBackupDescription(location: BackupLocation, state: State): string {
  return get(state, [BACKUP_ROOT, location, 'description'])
}
