import type { RootState } from '../../configuration/ReduxStore'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSelector, createSlice } from '@reduxjs/toolkit'
import defaultSoundFx from './pacman_death.mp3'
import { configurationImported } from '../backup/BackupActionCreators'
import { Prognosis } from '../../domain/Project'
import merge from 'lodash/merge'

export interface NotificationsState {
  readonly allowAudioNotifications: boolean
  readonly allowSystemNotifications: boolean
  readonly enableNewVersionCheck: boolean
  readonly notifications: {
    [Prognosis.error]?: NotificationDetails
    [Prognosis.sick]?: NotificationDetails
    [Prognosis.sickBuilding]?: NotificationDetails
    [Prognosis.healthy]?: NotificationDetails
    [Prognosis.healthyBuilding]?: NotificationDetails
    [Prognosis.unknown]?: NotificationDetails
  }
}

export interface NotificationDetails {
  readonly systemNotification: boolean
  readonly sfx: string
}

interface AddNotificationAction {
  readonly prognosis: Prognosis
  readonly systemNotification: boolean
  readonly sfx: string
}

export const notificationsRoot = 'notifications'

const initialState: NotificationsState = {
  allowAudioNotifications: false,
  allowSystemNotifications: false,
  enableNewVersionCheck: true,
  notifications: {
    [Prognosis.sick]: { systemNotification: false, sfx: defaultSoundFx },
  },
}

const slice = createSlice({
  name: notificationsRoot,
  initialState,
  reducers: {
    toggleVersionCheck: (draft) => {
      draft.enableNewVersionCheck = !draft.enableNewVersionCheck
    },
    setAllowAudioNotifications: (draft, action: PayloadAction<boolean>) => {
      draft.allowAudioNotifications = action.payload
    },
    setAllowSystemNotifications: (draft, action: PayloadAction<boolean>) => {
      draft.allowSystemNotifications = action.payload
    },
    addNotification: (draft, action: PayloadAction<AddNotificationAction>) => {
      const { prognosis, systemNotification, sfx } = action.payload
      draft.notifications[prognosis] = { systemNotification, sfx }
    },
    removeNotification: (draft, action: PayloadAction<Prognosis>) => {
      delete draft.notifications[action.payload]
    },
  },
  extraReducers: (builder) => {
    builder.addCase(configurationImported, (draft, action) => {
      return merge(draft, action.payload.notifications)
    })
  },
})

export const { reducer } = slice
export const {
  toggleVersionCheck,
  setAllowAudioNotifications,
  setAllowSystemNotifications,
  addNotification,
  removeNotification,
} = slice.actions

const getNotificationsRoot = (state: RootState) => state.notifications
export const getToggleVersionCheck = createSelector(
  getNotificationsRoot,
  (settings) => settings.enableNewVersionCheck
)
export const getAllowAudioNotifications = createSelector(
  getNotificationsRoot,
  (settings) => settings.allowAudioNotifications
)
export const getAllowSystemNotifications = createSelector(
  getNotificationsRoot,
  (settings) => settings.allowSystemNotifications
)
export const getNotifications = createSelector(
  getNotificationsRoot,
  (settings) => settings.notifications
)
