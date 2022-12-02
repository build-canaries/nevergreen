import type {RootState} from '../../configuration/ReduxStore'
import isNil from 'lodash/isNil'
import merge from 'lodash/merge'
import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {configurationImported} from './BackupActionCreators'
import {RemoteLocationOptions} from './RemoteLocationOptions'
import {now} from '../../common/DateTime'

export interface RemoteLocation {
  readonly internalId: string;
  readonly where: RemoteLocationOptions;
  readonly url: string;
  readonly exportTimestamp?: string;
  readonly importTimestamp?: string;
  readonly automaticallyExport?: boolean;
  readonly externalId?: string;
  readonly encryptedAccessToken?: string;
  readonly description?: string;
}

export type RemoteLocationsState = {
  [id: string]: RemoteLocation;
}

export const remoteLocationsRoot = 'backupRemoteLocations'

const initialState: RemoteLocationsState = {}

function handleImportedConfiguration(draft: RemoteLocationsState, action: ReturnType<typeof configurationImported>) {
  const importedState = action.payload.backupRemoteLocations ?? {}

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

interface AddBackup {
  readonly internalId: string;
  readonly where: RemoteLocationOptions;
  readonly url: string;
  readonly description?: string;
  readonly encryptedAccessToken?: string;
  readonly externalId?: string;
}

const slice = createSlice({
  name: remoteLocationsRoot,
  initialState,
  reducers: {
    addBackup: {
      reducer: (draft, action: PayloadAction<RemoteLocation>) => {
        draft[action.payload.internalId] = action.payload
      },
      prepare: ({
                  internalId,
                  where,
                  url,
                  externalId = '',
                  description = '',
                  encryptedAccessToken = ''
                }: AddBackup) => {
        return {
          payload: {
            where,
            internalId,
            url,
            description,
            encryptedAccessToken,
            automaticallyExport: false,
            externalId,
            exportTimestamp: '',
            importTimestamp: ''
          }
        }
      }
    },
    setAutomaticExport: (draft, action: PayloadAction<{ internalId: string, value: boolean }>) => {
      draft[action.payload.internalId].automaticallyExport = action.payload.value
    },
    backupExported: {
      reducer: (draft, action: PayloadAction<{ internalId: string, externalId: string, timestamp: string }>) => {
        draft[action.payload.internalId].externalId = action.payload.externalId
        draft[action.payload.internalId].exportTimestamp = action.payload.timestamp
      },
      prepare: (internalId: string, externalId: string) => {
        return {
          payload: {
            internalId,
            externalId,
            timestamp: now()
          }
        }
      }
    },
    backupImported: {
      reducer: (draft, action: PayloadAction<{ internalId: string, timestamp: string }>) => {
        draft[action.payload.internalId].importTimestamp = action.payload.timestamp
      }, prepare: (internalId: string) => {
        return {
          payload: {
            internalId,
            timestamp: now()
          }
        }
      }
    },
    removeBackup: (draft, action: PayloadAction<string>) => {
      delete draft[action.payload]
    }
  },
  extraReducers: (builder) => {
    builder.addCase(configurationImported, handleImportedConfiguration)
  }
})

export const {reducer} = slice
export const {
  addBackup,
  setAutomaticExport,
  backupImported,
  backupExported,
  removeBackup
} = slice.actions

export function getBackupLocations(state: RootState): RemoteLocationsState {
  return state.backupRemoteLocations
}

export function getBackupLocation(internalId: string): (state: RootState) => RemoteLocation | undefined {
  return createSelector(getBackupLocations, (locations) => locations[internalId])
}
