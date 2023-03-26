import type { RootState } from '../../configuration/ReduxStore'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSelector, createSlice } from '@reduxjs/toolkit'
import merge from 'lodash/merge'
import { configurationImported } from '../backup/BackupActionCreators'
import * as t from 'io-ts'

export const otherSettingsRoot = 'otherSettings'

export const OtherSettingsState = t.exact(
  t.partial({
    clickToShowMenu: t.readonly(t.boolean),
  }),
  otherSettingsRoot
)

export type OtherSettingsState = t.TypeOf<typeof OtherSettingsState>

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
      return merge(draft, action.payload.otherSettings)
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
