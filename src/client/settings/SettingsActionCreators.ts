import {Actions} from '../Actions'
import {Action} from 'redux'
import {Prognosis} from '../domain/Project'
import {SortBy} from '../gateways/ProjectsGateway'
import {MaxProjectsToShow} from './SettingsReducer'

export interface ActionShowBuildTime extends Action<Actions.SHOW_BUILD_TIME> {
  readonly value: boolean;
}

export interface ActionShowFeedIdentifier extends Action<Actions.SHOW_FEED_IDENTIFIER> {
  readonly value: boolean;
}

export interface ActionRefreshTime extends Action<Actions.REFRESH_TIME> {
  readonly value: number;
}

export interface ActionShowBuildLabel extends Action<Actions.SHOW_BUILD_LABEL> {
  readonly value: boolean;
}

export interface ActionSetMaxProjects extends Action<Actions.SET_MAX_PROJECTS> {
  readonly value: MaxProjectsToShow;
}

export interface ActionClickToShowMenu extends Action<Actions.CLICK_TO_SHOW_MENU> {
  readonly value: boolean;
}

export interface ActionShowPrognosis extends Action<Actions.SHOW_PROGNOSIS> {
  readonly prognosis: Prognosis;
  readonly show: boolean;
}

export interface ActionSetSort extends Action<Actions.SET_SORT> {
  readonly value: SortBy;
}

export const DEFAULT_REFRESH_TIME = 10
export const MIN_REFRESH_TIME = 5
export const VALID_REFRESH_TIMES = [5, 10, 30, 60, 300, 600, 1800, 3600, 43200, 86400]

function absoluteClosestNumber(actual: number, a: number, b: number): number {
  return Math.abs(b - actual) < Math.abs(a - actual) ? b : a
}

export function setShowBuildTime(value: boolean): ActionShowBuildTime {
  return {type: Actions.SHOW_BUILD_TIME, value}
}

export function setShowFeedIdentifier(value: boolean): ActionShowFeedIdentifier {
  return {type: Actions.SHOW_FEED_IDENTIFIER, value}
}

export function setRefreshTime(value: string): ActionRefreshTime {
  const intValue = parseInt(value)
  const closestMatch = VALID_REFRESH_TIMES.reduce((prev, curr) => absoluteClosestNumber(intValue, prev, curr))
  return {type: Actions.REFRESH_TIME, value: closestMatch}
}

export function setShowBuildLabel(value: boolean): ActionShowBuildLabel {
  return {type: Actions.SHOW_BUILD_LABEL, value}
}

export function setMaxProjectsToShow(value: MaxProjectsToShow): ActionSetMaxProjects {
  return {type: Actions.SET_MAX_PROJECTS, value}
}

export function setClickToShowMenu(value: boolean): ActionClickToShowMenu {
  return {type: Actions.CLICK_TO_SHOW_MENU, value}
}

export function setShowPrognosis(prognosis: Prognosis, show: boolean): ActionShowPrognosis {
  return {type: Actions.SHOW_PROGNOSIS, prognosis, show}
}

export function setSort(value: SortBy): ActionSetSort {
  return {type: Actions.SET_SORT, value}
}
