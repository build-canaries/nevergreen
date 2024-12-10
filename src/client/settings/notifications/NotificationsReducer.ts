import type { RootState } from '../../configuration/ReduxStore'
import { createSelector, createSlice } from '@reduxjs/toolkit'
import { configurationImported } from '../backup/BackupActionCreators'
import { z } from 'zod'

export const notificationsRoot = 'notifications'

const NotificationsState = z.object({
  enableNewVersionCheck: z.boolean(),
})

export const NotificationsConfiguration = NotificationsState.partial()

export type NotificationsState = z.infer<typeof NotificationsState>

const initialState: NotificationsState = {
  enableNewVersionCheck: true,
}

const slice = createSlice({
  name: notificationsRoot,
  initialState,
  reducers: {
    toggleVersionCheck: (draft) => {
      draft.enableNewVersionCheck = !draft.enableNewVersionCheck
    },
  },
  extraReducers: (builder) => {
    builder.addCase(configurationImported, (draft, action) => {
      return { ...draft, ...action.payload.configuration.notifications }
    })
  },
})

export const { reducer } = slice
export const { toggleVersionCheck } = slice.actions

const getNotificationsRoot = (state: RootState) => state.notifications
export const getEnableNewVersionCheck = createSelector(
  getNotificationsRoot,
  (settings) => settings.enableNewVersionCheck,
)
