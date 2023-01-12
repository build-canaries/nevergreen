import type { RootState } from '../configuration/ReduxStore'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSelector, createSlice } from '@reduxjs/toolkit'
import { configurationImported } from './backup/BackupActionCreators'
import * as t from 'io-ts'
import {
  addBackupLocation,
  backupExported,
  backupImported,
  removeBackupLocation,
} from './backup/RemoteLocationsActions'
import set from 'lodash/set'
import unset from 'lodash/unset'

export const personalSettingsRoot = 'personal'

const BackRemoteLocationTimestamps = t.exact(
  t.partial({
    exportTimestamp: t.readonly(t.string),
    importTimestamp: t.readonly(t.string),
  })
)

export const PersonalSettingsState = t.exact(
  t.partial({
    audioNotificationVolume: t.readonly(t.number),
    allowAudioNotifications: t.readonly(t.boolean),
    allowSystemNotifications: t.readonly(t.boolean),
    backupRemoteLocations: t.record(t.string, BackRemoteLocationTimestamps),
  }),
  personalSettingsRoot
)

type BackRemoteLocationTimestamps = t.TypeOf<
  typeof BackRemoteLocationTimestamps
>
export type PersonalSettingsState = t.TypeOf<typeof PersonalSettingsState>

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
        return { ...draft, ...action.payload.personal }
      })
      .addCase(addBackupLocation, (draft, action) => {
        set(draft, ['backupRemoteLocations', action.payload.internalId], {})
      })
      .addCase(removeBackupLocation, (draft, action) => {
        unset(draft, ['backupRemoteLocations', action.payload])
      })
      .addCase(backupImported, (draft, action) => {
        set(
          draft,
          [
            'backupRemoteLocations',
            action.payload.internalId,
            'importTimestamp',
          ],
          action.payload.timestamp
        )
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
