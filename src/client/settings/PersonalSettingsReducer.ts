import type { RootState } from '../configuration/ReduxStore'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSelector, createSlice } from '@reduxjs/toolkit'
import { configurationImported } from './backup/BackupActionCreators'
import {
  addBackupLocation,
  backupExported,
  removeBackupLocation,
} from './backup/RemoteLocationsActions'
import set from 'lodash/set'
import unset from 'lodash/unset'
import difference from 'lodash/difference'
import merge from 'lodash/merge'
import { z } from 'zod'

export const personalSettingsRoot = 'personal'

const BackRemoteLocationTimestamps = z.object({
  exportTimestamp: z.string().optional(),
  importTimestamp: z.string().optional(),
})

export const PersonalSettingsState = z.object({
  audioNotificationVolume: z.number().optional(),
  allowAudioNotifications: z.boolean().optional(),
  allowSystemNotifications: z.boolean().optional(),
  backupRemoteLocations: z
    .record(z.string(), BackRemoteLocationTimestamps)
    .optional(),
})

type BackRemoteLocationTimestamps = z.infer<typeof BackRemoteLocationTimestamps>
export type PersonalSettingsState = z.infer<typeof PersonalSettingsState>

const initialState: PersonalSettingsState = {
  audioNotificationVolume: 1.0,
  allowAudioNotifications: false,
  allowSystemNotifications: false,
  backupRemoteLocations: {},
}

const slice = createSlice({
  name: personalSettingsRoot,
  initialState,
  reducers: {
    setAudioNotificationVolume: (draft, action: PayloadAction<number>) => {
      draft.audioNotificationVolume = action.payload
    },
    setAllowAudioNotifications: (draft, action: PayloadAction<boolean>) => {
      draft.allowAudioNotifications = action.payload
    },
    setAllowSystemNotifications: (draft, action: PayloadAction<boolean>) => {
      draft.allowSystemNotifications = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(configurationImported, (draft, action) => {
        const { configuration, fromLocation, timestamp } = action.payload

        merge(draft, configuration.personal)

        if (
          configuration.backupRemoteLocations &&
          draft.backupRemoteLocations
        ) {
          const removedLocationIds = difference(
            Object.keys(draft.backupRemoteLocations),
            Object.keys(configuration.backupRemoteLocations)
          )

          removedLocationIds.forEach((id) => {
            unset(draft, ['backupRemoteLocations', id])
          })
        }

        if (fromLocation) {
          set(
            draft,
            [
              'backupRemoteLocations',
              fromLocation.internalId,
              'importTimestamp',
            ],
            timestamp
          )
        }
      })
      .addCase(addBackupLocation, (draft, action) => {
        set(draft, ['backupRemoteLocations', action.payload.internalId], {})
      })
      .addCase(removeBackupLocation, (draft, action) => {
        unset(draft, ['backupRemoteLocations', action.payload])
      })
      .addCase(backupExported, (draft, action) => {
        set(
          draft,
          [
            'backupRemoteLocations',
            action.payload.internalId,
            'exportTimestamp',
          ],
          action.payload.timestamp
        )
      })
  },
})

export const { reducer } = slice
export const {
  setAllowAudioNotifications,
  setAllowSystemNotifications,
  setAudioNotificationVolume,
} = slice.actions

const getPersonalSettingsRoot = (state: RootState) => state.personal
export const getAllowAudioNotifications = createSelector(
  getPersonalSettingsRoot,
  (settings) => settings.allowAudioNotifications
)
export const getAudioNotificationVolume = createSelector(
  getPersonalSettingsRoot,
  (settings) => settings.audioNotificationVolume ?? 1
)
export const getAllowSystemNotifications = createSelector(
  getPersonalSettingsRoot,
  (settings) => settings.allowSystemNotifications
)

export function getBackupLocationTimestamps(
  internalId: string
): (state: RootState) => BackRemoteLocationTimestamps | undefined {
  return createSelector(
    getPersonalSettingsRoot,
    (settings) =>
      settings.backupRemoteLocations &&
      settings.backupRemoteLocations[internalId]
  )
}
