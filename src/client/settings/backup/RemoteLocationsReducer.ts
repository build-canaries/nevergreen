import type { RootState } from '../../configuration/ReduxStore'
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { configurationImported } from './BackupActionCreators'
import { RemoteLocationOptions } from './RemoteLocationOptions'
import {
  addBackupLocation,
  backupExported,
  removeBackupLocation,
} from './RemoteLocationsActions'
import { z } from 'zod'

export const remoteLocationsRoot = 'backupRemoteLocations'

const RemoteLocation = z.object({
  internalId: z.string(),
  url: z.string(),
  where: z.nativeEnum(RemoteLocationOptions),
  automaticallyExport: z.boolean().optional(),
  externalId: z.string().optional(),
  encryptedAccessToken: z.string().optional(),
  description: z.string().optional(),
})

export const RemoteLocationsState = z.record(RemoteLocation)

export type RemoteLocation = z.infer<typeof RemoteLocation>
export type RemoteLocationsState = z.infer<typeof RemoteLocationsState>

const initialState: RemoteLocationsState = {}

const slice = createSlice({
  name: remoteLocationsRoot,
  initialState,
  reducers: {
    setAutomaticExport: (
      draft,
      action: PayloadAction<{ internalId: string; value: boolean }>,
    ) => {
      draft[action.payload.internalId].automaticallyExport =
        action.payload.value
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(configurationImported, (draft, action) => {
        return action.payload.configuration.backupRemoteLocations ?? draft
      })
      .addCase(addBackupLocation, (draft, action) => {
        draft[action.payload.internalId] = action.payload
      })
      .addCase(removeBackupLocation, (draft, action) => {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
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
  internalId: string,
): (state: RootState) => RemoteLocation | undefined {
  return createSelector(
    getBackupLocations,
    (locations) => locations[internalId],
  )
}
