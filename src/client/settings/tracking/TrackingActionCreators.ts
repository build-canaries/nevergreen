import {AuthTypes, createFeed, Feed} from '../../domain/Feed'
import {createAction} from '@reduxjs/toolkit'

interface FeedAdded {
  readonly trayId: string;
  readonly url: string;
  readonly authType: AuthTypes;
  readonly username: string;
  readonly encryptedPassword: string;
  readonly encryptedAccessToken: string;
}

export const feedAdded = createAction('tracking/feedAdded', (data: FeedAdded) => {
  return {
    payload: {
      trayId: data.trayId,
      feed: createFeed(data.trayId, data.url, data)
    }
  }
})
export const feedUpdated = createAction<{ trayId: string, feed: Partial<Feed> }>('tracking/feedUpdated')
export const feedRemoved = createAction<string>('tracking/feedRemoved')
