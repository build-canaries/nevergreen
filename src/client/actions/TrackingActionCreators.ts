import {now} from '../common/DateTime'
import {generateRandomName, Tray} from '../domain/Tray'
import {Actions} from './Actions'
import {Request} from 'superagent'
import {Project} from '../domain/Project'
import {Action} from 'redux'

export interface ActionTrayAdded extends Action<Actions.TRAY_ADDED> {
  readonly trayId: string;
  readonly data: Tray;
}

export interface ActionHighlightTray extends Action<Actions.HIGHLIGHT_TRAY> {
  readonly trayId: string;
}

export interface ActionRemoveTray extends Action<Actions.REMOVE_TRAY> {
  readonly trayId: string;
}

export interface ActionProjectsFetching extends Action<Actions.PROJECTS_FETCHING> {
  readonly trayId: string;
  readonly request: Request;
}

export interface ActionProjectsFetched extends Action<Actions.PROJECTS_FETCHED> {
  readonly trayId: string;
  readonly data: Project[];
  readonly serverType: string;
  readonly timestamp: string;
  readonly includeNew: boolean;
}

export interface ActionProjectsFetchError extends Action<Actions.PROJECTS_FETCH_ERROR> {
  readonly trayId: string;
  readonly errors: string[];
}

export interface ActionSetTrayName extends Action<Actions.SET_TRAY_NAME> {
  readonly trayId: string;
  readonly name: string;
}

export interface ActionSetServerType extends Action<Actions.SET_SERVER_TYPE> {
  readonly trayId: string;
  readonly serverType: string;
}

export interface ActionSetTrayUsername extends Action<Actions.SET_TRAY_USERNAME> {
  readonly trayId: string;
  readonly username: string;
}

export interface ActionSetTrayUrl extends Action<Actions.SET_TRAY_URL> {
  readonly trayId: string;
  readonly url: string;
}

export interface ActionSelectProject extends Action<Actions.SELECT_PROJECT> {
  readonly trayId: string;
  readonly projectId: string;
  readonly selected: boolean;
}

export interface ActionSetIncludeNew extends Action<Actions.SET_INCLUDE_NEW> {
  readonly trayId: string;
  readonly value: boolean;
}

export function trayAdded(trayId: string, url: string, username?: string): ActionTrayAdded {
  return {
    type: Actions.TRAY_ADDED,
    trayId,
    data: {
      trayId,
      url,
      username,
      name: generateRandomName(),
      highlight: true,
      errors: [],
      includeNew: true,
      loaded: false,
      requiresRefresh: false,
      serverType: ''
    }
  }
}

export function highlightTray(trayId: string): ActionHighlightTray {
  return {type: Actions.HIGHLIGHT_TRAY, trayId}
}

export function removeTray(trayId: string): ActionRemoveTray {
  return {type: Actions.REMOVE_TRAY, trayId}
}

export function projectsFetching(trayId: string, request: Request): ActionProjectsFetching {
  return {type: Actions.PROJECTS_FETCHING, trayId, request}
}

export function projectsFetched(trayId: string, projects: Project[], includeNew: boolean): ActionProjectsFetched {
  const first = projects[0]
  const serverType = first ? first.serverType : ''

  return {
    type: Actions.PROJECTS_FETCHED,
    trayId,
    data: projects,
    serverType,
    timestamp: now(),
    includeNew
  }
}

export function projectsFetchError(trayId: string, errors: string[]): ActionProjectsFetchError {
  return {type: Actions.PROJECTS_FETCH_ERROR, trayId, errors}
}

export function setTrayName(trayId: string, name: string): ActionSetTrayName {
  return {type: Actions.SET_TRAY_NAME, trayId, name}
}

export function setServerType(trayId: string, serverType: string): ActionSetServerType {
  return {type: Actions.SET_SERVER_TYPE, trayId, serverType}
}

export function setTrayUsername(trayId: string, username: string): ActionSetTrayUsername {
  return {type: Actions.SET_TRAY_USERNAME, trayId, username}
}

export function setTrayUrl(trayId: string, url: string): ActionSetTrayUrl {
  return {type: Actions.SET_TRAY_URL, trayId, url}
}

export function selectProject(trayId: string, projectId: string, selected: boolean): ActionSelectProject {
  return {type: Actions.SELECT_PROJECT, trayId, projectId, selected}
}

export function setIncludeNew(trayId: string, value: boolean): ActionSetIncludeNew {
  return {type: Actions.SET_INCLUDE_NEW, trayId, value}
}
