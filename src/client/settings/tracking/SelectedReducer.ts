import { createSelector, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../../configuration/ReduxStore'
import { feedAdded, feedRemoved, feedUpdated } from './TrackingActionCreators'
import { configurationImported } from '../backup/BackupActionCreators'
import { TrackingMode } from './FeedsReducer'
import { z } from 'zod'

export const selectedRoot = 'selected'

export const SelectedState = z.record(z.array(z.string()))

export type SelectedState = z.infer<typeof SelectedState>

const initialState: SelectedState = {}

const slice = createSlice({
  name: selectedRoot,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(configurationImported, (draft, action) => {
        return action.payload.configuration.selected ?? draft
      })
      .addCase(feedAdded, (draft, action) => {
        draft[action.payload.trayId] = []
      })
      .addCase(feedUpdated, (draft, action) => {
        const { trayId, feed, selectedProjects } = action.payload
        if (feed.trackingMode === TrackingMode.selected) {
          draft[trayId] = (selectedProjects as string[]) ?? []
        } else if (feed.trackingMode === TrackingMode.everything) {
          delete draft[trayId]
        }
      })
      .addCase(feedRemoved, (draft, action) => {
        delete draft[action.payload]
      })
  },
})

export const { reducer } = slice

export function getSelectedProjects(state: RootState): SelectedState {
  return state.selected
}

export function getSelectedProjectsForFeed(
  trayId: string,
): (state: RootState) => ReadonlyArray<string> | undefined {
  return createSelector(getSelectedProjects, (selected) => selected[trayId])
}
