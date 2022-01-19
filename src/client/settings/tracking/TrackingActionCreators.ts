import {now} from '../../common/DateTime'
import {AuthTypes, createFeed, Feed} from '../../domain/Feed'
import {Actions} from '../../Actions'
import {isError, Project, Projects} from '../../domain/Project'
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

export interface ActionProjectsFetched extends Action<Actions.PROJECTS_FETCHED> {
  readonly trayId: string;
  readonly data: ReadonlyArray<Project>;
  readonly serverType: string;
  readonly timestamp: string;
  readonly includeNew: boolean;
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

export function projectsFetched(trayId: string, projects: Projects, includeNew: boolean): ActionProjectsFetched {
  const data = projects.filter((project): project is Project => !isError(project))
  const first = data[0]
  const serverType = first ? first.serverType : ''

  return {
    type: Actions.PROJECTS_FETCHED,
    trayId,
    data,
    serverType,
    timestamp: now(),
    includeNew
  }
}

export function projectSelected(trayId: string, projectId: string, selected: boolean): ActionSelectProject {
  return {type: Actions.PROJECT_SELECTED, trayId, projectId, selected}
}
