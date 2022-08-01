import {AuthTypes, createFeed, Feed} from '../../domain/Feed'
import {Actions} from '../../Actions'
import {Action} from 'redux'

export interface ActionFeedAdded extends Action<Actions.FEED_ADDED> {
  readonly trayId: string;
  readonly data: Feed;
}

export interface ActionFeedUpdate extends Action<Actions.FEED_UPDATED> {
  readonly trayId: string;
  readonly data: Partial<Feed>;
}

export interface ActionRemoveFeed extends Action<Actions.FEED_REMOVED> {
  readonly trayId: string;
}

export interface ActionSelectProject extends Action<Actions.PROJECT_SELECTED> {
  readonly trayId: string;
  readonly projectId: string;
  readonly selected: boolean;
}

export function feedAdded(
  trayId: string,
  url: string,
  authType: AuthTypes,
  username: string,
  encryptedPassword: string,
  encryptedAccessToken: string
): ActionFeedAdded {
  return {
    type: Actions.FEED_ADDED,
    trayId,
    data: createFeed(trayId, url, {
      authType,
      username,
      encryptedPassword,
      encryptedAccessToken
    })
  }
}

export function feedUpdated(trayId: string, data: Partial<Feed>): ActionFeedUpdate {
  return {type: Actions.FEED_UPDATED, trayId, data}
}

export function feedRemoved(trayId: string): ActionRemoveFeed {
  return {type: Actions.FEED_REMOVED, trayId}
}

export function projectSelected(trayId: string, projectId: string, selected: boolean): ActionSelectProject {
  return {type: Actions.PROJECT_SELECTED, trayId, projectId, selected}
}
