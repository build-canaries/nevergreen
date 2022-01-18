import {now} from '../../common/DateTime'
import {AuthTypes, createTray, Tray} from '../../domain/Tray'
import {Actions} from '../../Actions'
import {isError, Project, Projects} from '../../domain/Project'
import {Action} from 'redux'

export interface ActionTrayAdded extends Action<Actions.TRAY_ADDED> {
  readonly trayId: string;
  readonly data: Tray;
}

export interface ActionTrayUpdate extends Action<Actions.TRAY_UPDATED> {
  readonly trayId: string;
  readonly data: Partial<Tray>;
}

export interface ActionRemoveTray extends Action<Actions.TRAY_REMOVED> {
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

export function trayAdded(
  trayId: string,
  url: string,
  authType: AuthTypes,
  username: string,
  encryptedPassword: string,
  encryptedAccessToken: string
): ActionTrayAdded {
  return {
    type: Actions.TRAY_ADDED,
    trayId,
    data: createTray(trayId, url, {
      authType,
      username,
      encryptedPassword,
      encryptedAccessToken
    })
  }
}

export function trayUpdated(trayId: string, data: Partial<Tray>): ActionTrayUpdate {
  return {type: Actions.TRAY_UPDATED, trayId, data}
}

export function trayRemoved(trayId: string): ActionRemoveTray {
  return {type: Actions.TRAY_REMOVED, trayId}
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
