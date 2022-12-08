import type { Draft } from 'immer'
import type { RootState } from '../../configuration/ReduxStore'
import type { Feed } from '../../domain/Feed'
import { createFeed } from '../../domain/Feed'
import { createSelector, createSlice } from '@reduxjs/toolkit'
import isNil from 'lodash/isNil'
import { feedAdded, feedRemoved, feedUpdated } from './TrackingActionCreators'
import { configurationImported } from '../backup/BackupActionCreators'

export interface FeedsState {
  readonly [trayId: string]: Feed
}

export const feedsRoot = 'trays'

const initialState: FeedsState = {}

function handleImportedConfiguration(
  draft: FeedsState,
  action: ReturnType<typeof configurationImported>
) {
  if (isNil(action.payload.trays)) {
    return draft
  }

  const importedFeeds = action.payload.trays
  const newState: Draft<FeedsState> = {}

  Object.keys(importedFeeds).forEach((trayId) => {
    const partialFeed = importedFeeds[trayId]
    newState[trayId] = createFeed(trayId, partialFeed.url, partialFeed)
  })

  return newState
}

const slice = createSlice({
  name: feedsRoot,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(configurationImported, handleImportedConfiguration)
      .addCase(feedAdded, (draft, action) => {
        draft[action.payload.trayId] = action.payload.feed
      })
      .addCase(feedUpdated, (draft, action) => {
        Object.assign(draft[action.payload.trayId], action.payload.feed)
      })
      .addCase(feedRemoved, (draft, action) => {
        delete draft[action.payload]
      })
  },
})

export const { reducer } = slice

const getTracking = (state: RootState) => state.trays
export const getFeeds = createSelector(getTracking, (trays) =>
  Object.values(trays)
)

export function getFeed(id: string): (state: RootState) => Feed | undefined {
  return createSelector(getTracking, (trays) => trays[id])
}
