import type { RootState } from '../../configuration/ReduxStore'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSelector, createSlice } from '@reduxjs/toolkit'
import defaultSoundFx from './pacman_death.mp3'
import { configurationImported } from '../backup/BackupActionCreators'
import { Prognosis } from '../../domain/Project'
import * as t from 'io-ts'

export const notificationsRoot = 'notifications'

const NotificationDetails = t.exact(
  t.type({
    systemNotification: t.readonly(t.boolean),
    sfx: t.readonly(t.string),
  })
)

const NotificationsState = t.type({
  allowAudioNotifications: t.readonly(t.boolean),
  allowSystemNotifications: t.readonly(t.boolean),
  enableNewVersionCheck: t.readonly(t.boolean),
  notifications: t.readonly(
    t.exact(
      t.partial({
        [Prognosis.error]: NotificationDetails,
        [Prognosis.sick]: NotificationDetails,
        [Prognosis.sickBuilding]: NotificationDetails,
        [Prognosis.healthyBuilding]: NotificationDetails,
        [Prognosis.unknown]: NotificationDetails,
        [Prognosis.healthy]: NotificationDetails,
      })
    )
  ),
})

export const NotificationsConfiguration = t.exact(
  t.partial(NotificationsState.props),
  notificationsRoot
)

export type NotificationDetails = t.TypeOf<typeof NotificationDetails>
export type NotificationsState = t.TypeOf<typeof NotificationsState>

interface AddNotificationAction {
  readonly prognosis: Prognosis
  readonly systemNotification: boolean
  readonly sfx: string
}

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
      return { ...draft, ...action.payload.notifications }
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
export const getEnableNewVersionCheck = createSelector(
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
