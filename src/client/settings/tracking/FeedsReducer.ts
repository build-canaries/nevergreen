import type { Draft } from 'immer'
import type { RootState } from '../../configuration/ReduxStore'
import { createSelector, createSlice } from '@reduxjs/toolkit'
import isNil from 'lodash/isNil'
import {
  feedAdded,
  FeedAddedAction,
  feedRemoved,
  feedUpdated,
} from './TrackingActionCreators'
import { configurationImported } from '../backup/BackupActionCreators'
import * as t from 'io-ts'
import { generateRandomName } from '../../common/Words'

export const feedsRoot = 'trays'

export enum ServerTypes {
  generic = '',
  circle = 'circle',
  go = 'go',
}

export enum AuthTypes {
  none = 'none',
  basic = 'basic',
  token = 'token',
}

export enum TrackingMode {
  everything = 'everything',
  selected = 'selected',
}

const Feed = t.intersection([
  t.type({
    trayId: t.readonly(t.string),
    url: t.readonly(t.string),
    authType: t.readonly(
      t.keyof({
        [AuthTypes.none]: null,
        [AuthTypes.basic]: null,
        [AuthTypes.token]: null,
      })
    ),
    trackingMode: t.readonly(
      t.keyof({
        [TrackingMode.everything]: null,
        [TrackingMode.selected]: null,
      })
    ),
    serverType: t.readonly(
      t.keyof({
        [ServerTypes.generic]: null,
        [ServerTypes.go]: null,
        [ServerTypes.circle]: null,
      })
    ),
  }),
  t.partial({
    encryptedAccessToken: t.readonly(t.string),
    encryptedPassword: t.readonly(t.string),
    name: t.readonly(t.string),
    timestamp: t.readonly(t.string),
    username: t.readonly(t.string),
  }),
])
export type Feed = t.TypeOf<typeof Feed>

export const FeedsState = t.record(t.string, t.exact(Feed), feedsRoot)
export type FeedsState = t.TypeOf<typeof FeedsState>

const initialState: FeedsState = {}

function createFeed(payload: FeedAddedAction): Feed {
  return {
    name: generateRandomName(),
    serverType: ServerTypes.generic,
    trackingMode: TrackingMode.everything,
    ...payload,
  }
}

const slice = createSlice({
  name: feedsRoot,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(configurationImported, function (draft, action) {
        if (isNil(action.payload.configuration.trays)) {
          return draft
        }

        const importedFeeds = action.payload.configuration.trays
        const newState: Draft<FeedsState> = {}

        Object.keys(importedFeeds).forEach((trayId) => {
          const partialFeed = importedFeeds[trayId]
          newState[trayId] = createFeed(partialFeed)
        })

        return newState
      })
      .addCase(feedAdded, (draft, action) => {
        draft[action.payload.trayId] = createFeed(action.payload)
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
