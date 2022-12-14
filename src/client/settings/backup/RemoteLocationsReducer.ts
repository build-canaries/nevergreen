import type { RootState } from '../../configuration/ReduxStore'
import isNil from 'lodash/isNil'
import merge from 'lodash/merge'
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { configurationImported } from './BackupActionCreators'
import { RemoteLocationOptions } from './RemoteLocationOptions'
import * as t from 'io-ts'
import {
  addBackupLocation,
  backupExported,
  removeBackupLocation,
} from './RemoteLocationsActions'

export const remoteLocationsRoot = 'backupRemoteLocations'

const RemoteLocation = t.exact(
  t.intersection([
    t.type({
      internalId: t.readonly(t.string),
      url: t.readonly(t.string),
      where: t.readonly(
        t.keyof({
          [RemoteLocationOptions.custom]: null,
          [RemoteLocationOptions.gitHub]: null,
          [RemoteLocationOptions.gitLab]: null,
        })
      ),
    }),
    t.partial({
      automaticallyExport: t.readonly(t.boolean),
      externalId: t.readonly(t.string),
      encryptedAccessToken: t.readonly(t.string),
      description: t.readonly(t.string),
    }),
  ])
)

export const RemoteLocationsState = t.record(
  t.string,
  RemoteLocation,
  remoteLocationsRoot
)

export type RemoteLocation = t.TypeOf<typeof RemoteLocation>
export type RemoteLocationsState = t.TypeOf<typeof RemoteLocationsState>

const initialState: RemoteLocationsState = {}

const slice = createSlice({
  name: remoteLocationsRoot,
  initialState,
  reducers: {
    setAutomaticExport: (
      draft,
      action: PayloadAction<{ internalId: string; value: boolean }>
    ) => {
      draft[action.payload.internalId].automaticallyExport =
        action.payload.value
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(configurationImported, (draft, action) => {
        const importedState = action.payload.backupRemoteLocations ?? {}

        Object.values(importedState).forEach(
          (importedLocation: RemoteLocation) => {
            const internalId = importedLocation.internalId

            if (isNil(draft[internalId])) {
              const matchingLocation = Object.values(draft).find(
                (existingLocation) => {
                  return (
                    existingLocation.where === importedLocation.where &&
                    existingLocation.url === importedLocation.url &&
                    existingLocation.externalId === importedLocation.externalId
                  )
                }
              )
              if (isNil(matchingLocation)) {
                draft[internalId] = importedLocation
              } else {
                draft[internalId] = { ...matchingLocation, ...importedLocation }
                delete draft[matchingLocation.internalId]
              }
            } else {
              merge(draft[internalId], importedLocation)
            }
          }
        )
      })
      .addCase(addBackupLocation, (draft, action) => {
        draft[action.payload.internalId] = action.payload
      })
      .addCase(removeBackupLocation, (draft, action) => {
        delete draft[action.payload]
      })
      .addCase(backupExported, (draft, action) => {
        draft[action.payload.internalId].externalId = action.payload.externalId
      })
  },
})

export const { reducer } = slice
export const { setAutomaticExport } = slice.actions

export function getBackupLocations(state: RootState): RemoteLocationsState {
  return state.backupRemoteLocations
}

export function getBackupLocation(
  internalId: string
): (state: RootState) => RemoteLocation | undefined {
  return createSelector(
    getBackupLocations,
    (locations) => locations[internalId]
  )
}
