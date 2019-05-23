import {PENDING_REQUESTS_ROOT} from './PendingRequestsReducer'
import {EXPORT_ROOT} from './ExportReducer'
import {IMPORT_ROOT} from './ImportReducer'
import {NEVERGREEN_ROOT} from './NevergreenReducer'
import {NOTIFICATION_ROOT} from './NotificationReducer'
import {PROJECTS_ROOT, ProjectsState} from './ProjectsReducer'
import {SELECTED_ROOT, SelectedState} from './SelectedReducer'
import {SETTINGS_ROOT} from './SettingsReducer'
import {INTERESTING_ROOT} from './InterestingReducer'
import {SUCCESS_ROOT} from './SuccessReducer'
import {TRAYS_ROOT} from './TraysReducer'
import {BACKUP_ROOT} from './BackupReducer'
import {Project} from '../domain/Project'
import {State} from './Reducer'
import {get} from 'lodash'
import {BackupLocation} from '../actions/BackupActionCreators'
import {Tray} from '../domain/Tray'

export function getLoaded(state: State): boolean {
  return get(state, [NEVERGREEN_ROOT, 'loaded'])
}

export function getFullScreen(state: State): boolean {
  return get(state, [NEVERGREEN_ROOT, 'fullScreen'])
}

export function getFullScreenRequested(state: State): boolean {
  return get(state, [NEVERGREEN_ROOT, 'fullScreenRequested'])
}

export function getShowTrayName(state: State): boolean {
  return get(state, [SETTINGS_ROOT, 'showTrayName'])
}

export function getShowBuildTime(state: State): boolean {
  return get(state, [SETTINGS_ROOT, 'showBuildTime'])
}

export function getShowBrokenBuildTime(state: State): boolean {
  return get(state, [SETTINGS_ROOT, 'showBrokenBuildTime'])
}

export function getPlayBrokenBuildSoundFx(state: State): boolean {
  return get(state, [SETTINGS_ROOT, 'playBrokenBuildSoundFx'])
}

export function getShowBuildLabel(state: State): boolean {
  return get(state, [SETTINGS_ROOT, 'showBuildLabel'])
}

export function getShowSystemNotifications(state: State): boolean {
  return get(state, [SETTINGS_ROOT, 'showSystemNotifications'])
}

export function getSystemNotificationRequestingPermission(state: State): boolean {
  return get(state, [SETTINGS_ROOT, 'systemNotificationRequestingPermission'])
}

export function getSystemNotificationPermissionDenied(state: State): boolean {
  return get(state, [SETTINGS_ROOT, 'systemNotificationPermissionDenied'])
}

export function getBrokenBuildSoundFx(state: State): string {
  return get(state, [SETTINGS_ROOT, 'brokenBuildSoundFx'])
}

export function getRefreshTime(state: State): number {
  return get(state, [SETTINGS_ROOT, 'refreshTime'])
}

export function getMaxProjectsToShow(state: State): number {
  return get(state, [SETTINGS_ROOT, 'maxProjectsToShow'])
}

export function getClickToShowMenu(state: State): boolean {
  return get(state, [SETTINGS_ROOT, 'clickToShowMenu'])
}

export function getImportLoaded(state: State): boolean {
  return get(state, [IMPORT_ROOT, 'loaded'])
}

export function getImportErrors(state: State): string[] {
  return get(state, [IMPORT_ROOT, 'errors'])
}

export function getImportInfos(state: State): string[] {
  return get(state, [IMPORT_ROOT, 'infos'])
}

export function getBackupId(location: BackupLocation, state: State): string {
  return get(state, [BACKUP_ROOT, location, 'id'])
}

export function getBackupUrl(location: BackupLocation, state: State): string {
  return get(state, [BACKUP_ROOT, location, 'url'])
}

export function getBackupDescription(location: BackupLocation, state: State): string {
  return get(state, [BACKUP_ROOT, location, 'description'])
}

export function getExportLoaded(state: State): boolean {
  return get(state, [EXPORT_ROOT, 'loaded'])
}

export function getExportErrors(state: State): string[] {
  return get(state, [EXPORT_ROOT, 'errors'])
}

export function getExportInfos(state: State): string[] {
  return get(state, [EXPORT_ROOT, 'infos'])
}

export function getSuccessMessages(state: State): string[] {
  return get(state, SUCCESS_ROOT)
}

export function getTrays(state: State): Tray[] {
  return Object.values(get(state, TRAYS_ROOT))
}

export function getTray(state: State, trayId: string): Tray {
  return get(state, [TRAYS_ROOT, trayId])
}

export function getTrayIds(state: State): string[] {
  return Object.keys(get(state, TRAYS_ROOT))
}

export function getTrayLoaded(state: State, trayId: string): boolean {
  return get(state, [TRAYS_ROOT, trayId, 'loaded'])
}

export function getTrayName(state: State, trayId: string): string {
  return get(state, [TRAYS_ROOT, trayId, 'name'])
}

export function getTrayUrl(state: State, trayId: string): string {
  return get(state, [TRAYS_ROOT, trayId, 'url'])
}

export function getTrayUsername(state: State, trayId: string): string {
  return get(state, [TRAYS_ROOT, trayId, 'username'])
}

export function getTrayPassword(state: State, trayId: string): string {
  return get(state, [TRAYS_ROOT, trayId, 'password'])
}

export function getTrayServerType(state: State, trayId: string): string {
  return get(state, [TRAYS_ROOT, trayId, 'serverType'])
}

export function getTrayIncludeNew(state: State, trayId: string): boolean {
  return get(state, [TRAYS_ROOT, trayId, 'includeNew'])
}

export function getTrayHighlight(state: State, trayId: string): boolean {
  return get(state, [TRAYS_ROOT, trayId, 'highlight'])
}

export function getTrayErrors(state: State, trayId: string): string[] {
  return get(state, [TRAYS_ROOT, trayId, 'errors'])
}

export function getTrayTimestamp(state: State, trayId: string): string {
  return get(state, [TRAYS_ROOT, trayId, 'timestamp'])
}

export function getTrayRequiresRefresh(state: State, trayId: string): boolean {
  return get(state, [TRAYS_ROOT, trayId, 'requiresRefresh'])
}

export function getNotification(state: State): string {
  return get(state, NOTIFICATION_ROOT)
}

export function getPendingRequest(state: State, id: string): () => void {
  return get(state, [PENDING_REQUESTS_ROOT, id])
}

export function getInterestingLoaded(state: State): boolean {
  return get(state, [INTERESTING_ROOT, 'loaded'])
}

export function getInterestingErrors(state: State): string[] {
  return get(state, [INTERESTING_ROOT, 'errors'])
}

export function getInterestingProjects(state: State): Project[] {
  return get(state, [INTERESTING_ROOT, 'projects'])
}

export function getSelectedProjects(state: State): SelectedState
export function getSelectedProjects(state: State, trayId: string): string[]
export function getSelectedProjects(state: State, trayId?: string): string[] | SelectedState {
  return trayId
    ? get(state, [SELECTED_ROOT, trayId])
    : get(state, SELECTED_ROOT)
}

export function getProjects(state: State): ProjectsState
export function getProjects(state: State, trayId: string): Project[]
export function getProjects(state: State, trayId?: string): Project[] | ProjectsState {
  return trayId
    ? Object.values<Project>(get(state, [PROJECTS_ROOT, trayId], {}))
    : get(state, [PROJECTS_ROOT])
}
