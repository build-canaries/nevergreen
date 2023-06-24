import type { RootState } from '../../configuration/ReduxStore'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSelector, createSlice } from '@reduxjs/toolkit'
import { configurationImported } from '../backup/BackupActionCreators'
import { z } from 'zod'

export const otherSettingsRoot = 'otherSettings'

export const OtherSettingsState = z.object({
  clickToShowMenu: z.boolean().optional(),
})

export type OtherSettingsState = z.infer<typeof OtherSettingsState>

const initialState: OtherSettingsState = {
  clickToShowMenu: false,
}

const slice = createSlice({
  name: otherSettingsRoot,
  initialState,
  reducers: {
    setClickToShowMenu: (draft, action: PayloadAction<boolean>) => {
      draft.clickToShowMenu = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(configurationImported, (draft, action) => {
      return { ...draft, ...action.payload.configuration.otherSettings }
    })
  },
})

export const { reducer } = slice
export const { setClickToShowMenu } = slice.actions

const getOtherSettings = (state: RootState) => state.otherSettings
export const getClickToShowMenu = createSelector(
  getOtherSettings,
  (settings) => settings.clickToShowMenu
)
