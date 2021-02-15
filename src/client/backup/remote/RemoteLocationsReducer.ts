import {Actions} from '../../Actions'
import get from 'lodash/get'
import isNil from 'lodash/isNil'
import merge from 'lodash/merge'
import {createReducer} from '@reduxjs/toolkit'
import {State} from '../../Reducer'
import {ActionConfigurationImported} from '../BackupActionCreators'
import {
  ActionAddBackup,
  ActionBackupExported,
  ActionBackupImported,
  ActionRemoveBackup,
  ActionSetAutomaticExport
} from './RemoteLocationActionCreators'
import {RemoteLocationOptions} from './RemoteLocationOptions'

export interface RemoteLocation {
  readonly internalId: string;
  readonly where: RemoteLocationOptions;
  readonly url: string;
  readonly exportTimestamp: string;
  readonly importTimestamp: string;
  readonly automaticallyExport: boolean;
  readonly externalId: string;
  readonly encryptedAccessToken: string;
  readonly description: string;
}

export type RemoteLocationsState = {
  [id: string]: RemoteLocation;
}

export const BACKUP_REMOTE_LOCATIONS_ROOT = 'backupRemoteLocations'

const DEFAULT_STATE: RemoteLocationsState = {}

function handleImportedConfiguration(draft: RemoteLocationsState, action: ActionConfigurationImported) {
  const importedState = get(action.configuration, [BACKUP_REMOTE_LOCATIONS_ROOT], DEFAULT_STATE)

  // TS thinks importedLocation can be undefined because Configuration is a RecursivePartial<State>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  Object.values(importedState).forEach((importedLocation: RemoteLocation) => {
    const internalId = importedLocation.internalId

    if (isNil(draft[internalId])) {
      const matchingLocation = Object.values(draft).find((existingLocation) => {
        return existingLocation.where === importedLocation.where
          && existingLocation.url === importedLocation.url
          && existingLocation.externalId === importedLocation.externalId
      })
      if (isNil(matchingLocation)) {
        draft[internalId] = importedLocation
      } else {
        draft[internalId] = {...matchingLocation, ...importedLocation}
        delete draft[matchingLocation.internalId]
      }
    } else {
      merge(draft[internalId], importedLocation)
    }
  })
}

export const reduce = createReducer<RemoteLocationsState>(DEFAULT_STATE, {
  [Actions.CONFIGURATION_IMPORTED]: handleImportedConfiguration,
  [Actions.ADD_BACKUP]: (draft, action: ActionAddBackup) => {
    draft[action.data.internalId] = action.data
  },
  [Actions.BACKUP_SET_AUTOMATIC_EXPORT]: (draft, action: ActionSetAutomaticExport) => {
    draft[action.internalId].automaticallyExport = action.value
  },
  [Actions.BACKUP_EXPORTED]: (draft, action: ActionBackupExported) => {
    draft[action.internalId].externalId = action.externalId
    draft[action.internalId].exportTimestamp = action.timestamp
  },
  [Actions.BACKUP_IMPORTED]: (draft, action: ActionBackupImported) => {
    draft[action.internalId].importTimestamp = action.timestamp
  },
  [Actions.BACKUP_REMOVE]: (draft, action: ActionRemoveBackup) => {
    delete draft[action.internalId]
  }
})

export function getBackupLocations(state: State): RemoteLocationsState {
  return get(state, [BACKUP_REMOTE_LOCATIONS_ROOT])
}
