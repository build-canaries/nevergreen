import type { PayloadAction } from '@reduxjs/toolkit'
import { createSelector, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../../configuration/ReduxStore'
import { feedRemoved, feedUpdated } from './TrackingActionCreators'
import remove from 'lodash/remove'
import { configurationImported } from '../backup/BackupActionCreators'
import { TrackingMode } from './FeedsReducer'
import { z } from 'zod'

export const selectedRoot = 'selected'

export const SelectedState = z.record(z.array(z.string()))

export type SelectedState = z.infer<typeof SelectedState>

interface ProjectSelectedAction {
  readonly trayId: string
  readonly projectIds: ReadonlyArray<string>
  readonly selected: boolean
}

const initialState: SelectedState = {}

const slice = createSlice({
  name: selectedRoot,
  initialState,
  reducers: {
    projectSelected: (draft, action: PayloadAction<ProjectSelectedAction>) => {
      action.payload.selected
        ? draft[action.payload.trayId].push(...action.payload.projectIds)
        : remove(draft[action.payload.trayId], (id) =>
            action.payload.projectIds.includes(id),
          )
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(configurationImported, (draft, action) => {
        return action.payload.configuration.selected ?? draft
      })
      .addCase(feedUpdated, (draft, action) => {
        if (action.payload.feed.trackingMode === TrackingMode.selected) {
          draft[action.payload.trayId] = []
        } else if (
          action.payload.feed.trackingMode === TrackingMode.everything
        ) {
          delete draft[action.payload.trayId]
        }
      })
      .addCase(feedRemoved, (draft, action) => {
        delete draft[action.payload]
      })
  },
})

export const { reducer } = slice
export const { projectSelected } = slice.actions

export function getSelectedProjects(state: RootState): SelectedState {
  return state.selected
}

export function getSelectedProjectsForFeed(
  trayId: string,
): (state: RootState) => ReadonlyArray<string> {
  return createSelector(getSelectedProjects, (selected) => selected[trayId])
}
