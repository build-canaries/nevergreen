import type { Feed } from './FeedsReducer'
import { AuthTypes } from './FeedsReducer'
import { createAction } from '@reduxjs/toolkit'

export interface FeedAddedAction {
  readonly trayId: string
  readonly url: string
  readonly authType: AuthTypes
  readonly username?: string
  readonly encryptedAuth?: string
}

interface FeedUpdatedAction {
  readonly trayId: string
  readonly feed: Partial<Feed>
  readonly selectedProjects?: ReadonlyArray<string>
}

export const feedAdded = createAction<FeedAddedAction>('tracking/feedAdded')
export const feedUpdated = createAction<FeedUpdatedAction>(
  'tracking/feedUpdated',
)
export const feedRemoved = createAction<string>('tracking/feedRemoved')
