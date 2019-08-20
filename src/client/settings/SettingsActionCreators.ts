import {Actions} from '../Actions'
import {Action} from 'redux'
import {Prognosis} from '../domain/Project'

export interface ActionShowBuildTime extends Action<Actions.SHOW_BUILD_TIME> {
  readonly value: boolean;
}

export interface ActionShowBrokenBuildTime extends Action<Actions.SHOW_BROKEN_BUILD_TIME> {
  readonly value: boolean;
}

export interface ActionShowTrayName extends Action<Actions.SHOW_TRAY_NAME> {
  readonly value: boolean;
}

export interface ActionPlayBrokenBuildSoundFx extends Action<Actions.PLAY_BROKEN_BUILD_SOUND_FX> {
  readonly value: boolean;
}

export interface ActionBrokenBuildSoundFx extends Action<Actions.BROKEN_BUILD_SOUND_FX> {
  readonly value: string;
}

export interface ActionRefreshTime extends Action<Actions.REFRESH_TIME> {
  readonly value: number;
}

export interface ActionShowBuildLabel extends Action<Actions.SHOW_BUILD_LABEL> {
  readonly value: boolean;
}

export interface ActionRequestingSystemNotificationPermission extends Action<Actions.REQUESTING_SYSTEM_NOTIFICATION_PERMISSION> {
}

export interface ActionShowSystemNotifications extends Action<Actions.SHOW_SYSTEM_NOTIFICATIONS> {
  readonly value: boolean;
}

export interface ActionSystemNotificationsPermissionDenied extends Action<Actions.SYSTEM_NOTIFICATIONS_PERMISSION_DENIED> {
}

export interface ActionSetMaxProjects extends Action<Actions.SET_MAX_PROJECTS> {
  readonly value: number;
}

export interface ActionClickToShowMenu extends Action<Actions.CLICK_TO_SHOW_MENU> {
  readonly value: boolean;
}

export interface ActionShowPrognosis extends Action<Actions.SHOW_PROGNOSIS> {
  readonly prognosis: Prognosis;
  readonly show: boolean;
}

export const MIN_REFRESH_TIME = 5
export const VALID_REFRESH_TIMES = [5, 10, 30, 60, 300, 600, 1800, 3600, 43200, 86400]
export const DEFAULT_PROJECTS_TO_SHOW = 12
export const VALID_PROJECTS_TO_SHOW = [6, 12, 18, 24, 30, Number.MAX_SAFE_INTEGER]

function absoluteClosestNumber(actual: number, a: number, b: number): number {
  return Math.abs(b - actual) < Math.abs(a - actual) ? b : a
}

export function setShowBuildTime(value: boolean): ActionShowBuildTime {
  return {type: Actions.SHOW_BUILD_TIME, value}
}

export function setShowBrokenBuildTime(value: boolean): ActionShowBrokenBuildTime {
  return {type: Actions.SHOW_BROKEN_BUILD_TIME, value}
}

export function setShowTrayName(value: boolean): ActionShowTrayName {
  return {type: Actions.SHOW_TRAY_NAME, value}
}

export function setPlayBrokenBuildSoundFx(value: boolean): ActionPlayBrokenBuildSoundFx {
  return {type: Actions.PLAY_BROKEN_BUILD_SOUND_FX, value}
}

export function setBrokenBuildSoundFx(value: string): ActionBrokenBuildSoundFx {
  return {type: Actions.BROKEN_BUILD_SOUND_FX, value}
}

export function setRefreshTime(value: string): ActionRefreshTime {
  const intValue = parseInt(value)
  const closestMatch = VALID_REFRESH_TIMES.reduce((prev, curr) => absoluteClosestNumber(intValue, prev, curr))
  return {type: Actions.REFRESH_TIME, value: closestMatch}
}

export function setShowBuildLabel(value: boolean): ActionShowBuildLabel {
  return {type: Actions.SHOW_BUILD_LABEL, value}
}

export function requestingSystemNotificationPermission(): ActionRequestingSystemNotificationPermission {
  return {type: Actions.REQUESTING_SYSTEM_NOTIFICATION_PERMISSION}
}

export function setShowSystemNotifications(value: boolean): ActionShowSystemNotifications {
  return {type: Actions.SHOW_SYSTEM_NOTIFICATIONS, value}
}

export function systemNotificationPermissionDenied(): ActionSystemNotificationsPermissionDenied {
  return {type: Actions.SYSTEM_NOTIFICATIONS_PERMISSION_DENIED}
}

export function setMaxProjectsToShow(value: string): ActionSetMaxProjects {
  const intValue = parseInt(value)
  const closestMatch = VALID_PROJECTS_TO_SHOW.reduce((prev, curr) => absoluteClosestNumber(intValue, prev, curr))
  return {type: Actions.SET_MAX_PROJECTS, value: closestMatch}
}

export function setClickToShowMenu(value: boolean): ActionClickToShowMenu {
  return {type: Actions.CLICK_TO_SHOW_MENU, value}
}

export function setShowPrognosis(prognosis: Prognosis, show: boolean): ActionShowPrognosis {
  return {type: Actions.SHOW_PROGNOSIS, prognosis, show}
}
