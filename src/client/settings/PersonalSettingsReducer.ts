import type { RootState } from '../configuration/ReduxStore'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSelector, createSlice } from '@reduxjs/toolkit'
import { configurationImported } from './backup/BackupActionCreators'
import * as t from 'io-ts'

export const personalSettingsRoot = 'personal'

export const PersonalSettingsState = t.exact(
  t.type({
    allowAudioNotifications: t.readonly(t.boolean),
    allowSystemNotifications: t.readonly(t.boolean),
  }),
  personalSettingsRoot
)

export type PersonalSettingsState = t.TypeOf<typeof PersonalSettingsState>

const initialState: PersonalSettingsState = {
  allowAudioNotifications: false,
  allowSystemNotifications: false,
}

const slice = createSlice({
  name: personalSettingsRoot,
  initialState,
  reducers: {
    setAllowAudioNotifications: (draft, action: PayloadAction<boolean>) => {
      draft.allowAudioNotifications = action.payload
    },
    setAllowSystemNotifications: (draft, action: PayloadAction<boolean>) => {
      draft.allowSystemNotifications = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(configurationImported, (draft, action) => {
      return action.payload.personal ?? draft
    })
  },
})

export const { reducer } = slice
export const { setAllowAudioNotifications, setAllowSystemNotifications } =
  slice.actions

const getPersonalSettingsRoot = (state: RootState) => state.personal
export const getAllowAudioNotifications = createSelector(
  getPersonalSettingsRoot,
  (settings) => settings.allowAudioNotifications
)
export const getAllowSystemNotifications = createSelector(
  getPersonalSettingsRoot,
  (settings) => settings.allowSystemNotifications
)
