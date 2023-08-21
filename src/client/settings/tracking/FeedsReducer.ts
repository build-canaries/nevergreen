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
import { generateRandomName } from '../../common/Words'
import { z } from 'zod'

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
  queryParam = 'queryParam',
}

export enum TrackingMode {
  everything = 'everything',
  selected = 'selected',
}

const Feed = z.object({
  trayId: z.string(),
  url: z.string(),
  authType: z.nativeEnum(AuthTypes),
  trackingMode: z.nativeEnum(TrackingMode),
  serverType: z.nativeEnum(ServerTypes).optional(),
  encryptedAuth: z.string().optional(),
  name: z.string().optional(),
  timestamp: z.string().optional(),
  username: z.string().optional(),
})
export type Feed = z.infer<typeof Feed>

export const FeedsState = z.record(z.string(), Feed)
export type FeedsState = z.infer<typeof FeedsState>

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
  Object.values(trays),
)

export function getFeed(id: string): (state: RootState) => Feed | undefined {
  return createSelector(getTracking, (trays) => trays[id])
}
