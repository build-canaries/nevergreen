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
      return { ...draft, ...action.payload.configuration.notifications }
    })
  },
})

export const { reducer } = slice
export const { toggleVersionCheck, addNotification, removeNotification } =
  slice.actions

const getNotificationsRoot = (state: RootState) => state.notifications
export const getEnableNewVersionCheck = createSelector(
  getNotificationsRoot,
  (settings) => settings.enableNewVersionCheck
)
export const getNotifications = createSelector(
  getNotificationsRoot,
  (settings) => settings.notifications
)
