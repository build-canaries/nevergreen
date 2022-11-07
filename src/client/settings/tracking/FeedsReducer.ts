import {Actions} from '../../Actions'
import {createFeed, Feed} from '../../domain/Feed'
import {ActionFeedAdded, ActionFeedUpdate, ActionRemoveFeed} from './TrackingActionCreators'
import {createReducer, createSelector} from '@reduxjs/toolkit'
import {Draft} from 'immer'
import {State} from '../../Reducer'
import {ActionConfigurationImported} from '../backup/BackupActionCreators'
import isNil from 'lodash/isNil'

export interface FeedsState {
  readonly [trayId: string]: Feed;
}

export const FEEDS_ROOT = 'trays'

const defaultState: FeedsState = {}

function handleImportedConfiguration(draft: FeedsState, action: ActionConfigurationImported) {
  if (isNil(action.configuration[FEEDS_ROOT])) {
    return draft
  }

  const importedFeeds = action.configuration[FEEDS_ROOT] as FeedsState
  const newState: Draft<FeedsState> = {}

  Object.keys(importedFeeds).forEach((trayId) => {
    const partialFeed = importedFeeds[trayId]
    newState[trayId] = createFeed(trayId, partialFeed.url, partialFeed)
  })

  return newState
}

export const reduce = createReducer<FeedsState>(defaultState, (builder) => {
  builder
    .addCase(Actions.CONFIGURATION_IMPORTED, handleImportedConfiguration)
    .addCase(Actions.FEED_ADDED, (draft, action: ActionFeedAdded) => {
      draft[action.trayId] = action.data
    })
    .addCase(Actions.FEED_UPDATED, (draft, action: ActionFeedUpdate) => {
      Object.assign(draft[action.trayId], action.data)
    })
    .addCase(Actions.FEED_REMOVED, (draft, action: ActionRemoveFeed) => {
      delete draft[action.trayId]
    })
})

const getTracking = (state: State) => state[FEEDS_ROOT]
export const getFeeds = createSelector(getTracking, (trays) => Object.values(trays))

export function getFeed(id: string): (state: State) => Feed | undefined {
  return createSelector(getTracking, (trays) => trays[id])
}
