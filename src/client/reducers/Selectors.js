import {PENDING_REQUESTS_ROOT} from './PendingRequestsReducer'
import {EXPORT_ROOT} from './ExportReducer'
import {GITHUB_ROOT} from './GitHubReducer'
import {GITLAB_ROOT} from './GitLabReducer'
import {IMPORT_ROOT} from './ImportReducer'
import {NEVERGREEN_ROOT} from './NevergreenReducer'
import {NOTIFICATION_ROOT} from './NotificationReducer'
import {PROJECTS_ROOT} from './ProjectsReducer'
import {SELECTED_ROOT} from './SelectedReducer'
import {SETTINGS_ROOT} from './SettingsReducer'
import {INTERESTING_ROOT} from './InterestingReducer'
import {SUCCESS_ROOT} from './SuccessReducer'
import {TRAYS_ROOT} from './TraysReducer'

export function getLoaded(state) {
  return state.getIn([NEVERGREEN_ROOT, 'loaded'])
}

export function getFullScreen(state) {
  return state.getIn([NEVERGREEN_ROOT, 'fullScreen'])
}

export function getFullScreenRequested(state) {
  return state.getIn([NEVERGREEN_ROOT, 'fullScreenRequested'])
}

export function getShowTrayName(state) {
  return state.getIn([SETTINGS_ROOT, 'showTrayName'])
}

export function getShowBuildTime(state) {
  return state.getIn([SETTINGS_ROOT, 'showBuildTime'])
}

export function getShowBrokenBuildTime(state) {
  return state.getIn([SETTINGS_ROOT, 'showBrokenBuildTime'])
}

export function getPlayBrokenBuildSoundFx(state) {
  return state.getIn([SETTINGS_ROOT, 'playBrokenBuildSoundFx'])
}

export function getShowBuildLabel(state) {
  return state.getIn([SETTINGS_ROOT, 'showBuildLabel'])
}

export function getShowSystemNotifications(state) {
  return state.getIn([SETTINGS_ROOT, 'showSystemNotifications'])
}

export function getSystemNotificationRequestingPermission(state) {
  return state.getIn([SETTINGS_ROOT, 'systemNotificationRequestingPermission'])
}

export function getSystemNotificationPermissionDenied(state) {
  return state.getIn([SETTINGS_ROOT, 'systemNotificationPermissionDenied'])
}

export function getBrokenBuildSoundFx(state) {
  return state.getIn([SETTINGS_ROOT, 'brokenBuildSoundFx'])
}

export function getRefreshTime(state) {
  return state.getIn([SETTINGS_ROOT, 'refreshTime'])
}

export function getMaxProjectsToShow(state) {
  return state.getIn([SETTINGS_ROOT, 'maxProjectsToShow'])
}

export function getClickToShowMenu(state) {
  return state.getIn([SETTINGS_ROOT, 'clickToShowMenu'])
}

export function getImportLoaded(state) {
  return state.getIn([IMPORT_ROOT, 'loaded'])
}

export function getImportErrors(state) {
  return state.getIn([IMPORT_ROOT, 'errors'])
}

export function getImportInfos(state) {
  return state.getIn([IMPORT_ROOT, 'infos'])
}

export function getGistId(state) {
  return state.getIn([GITHUB_ROOT, 'gistId'])
}

export function getGistDescription(state) {
  return state.getIn([GITHUB_ROOT, 'description'])
}

export function getGitLabUrl(state) {
  return state.getIn([GITLAB_ROOT, 'url'])
}

export function getGitLabSnippetId(state) {
  return state.getIn([GITLAB_ROOT, 'snippetId'])
}

export function getExportLoaded(state) {
  return state.getIn([EXPORT_ROOT, 'loaded'])
}

export function getExportErrors(state) {
  return state.getIn([EXPORT_ROOT, 'errors'])
}

export function getExportInfos(state) {
  return state.getIn([EXPORT_ROOT, 'infos'])
}

export function getSuccessMessages(state) {
  return state.get(SUCCESS_ROOT)
}

export function getTrays(state) {
  return state.get(TRAYS_ROOT).toList()
}

export function getTray(state, trayId) {
  return state.getIn([TRAYS_ROOT, trayId])
}

export function getTrayIds(state) {
  return state.get(TRAYS_ROOT).keySeq()
}

export function getTrayLoaded(state, trayId) {
  return state.getIn([TRAYS_ROOT, trayId, 'loaded'])
}

export function getTrayName(state, trayId) {
  return state.getIn([TRAYS_ROOT, trayId, 'name'])
}

export function getTrayUrl(state, trayId) {
  return state.getIn([TRAYS_ROOT, trayId, 'url'])
}

export function getTrayUsername(state, trayId) {
  return state.getIn([TRAYS_ROOT, trayId, 'username'])
}

export function getTrayPassword(state, trayId) {
  return state.getIn([TRAYS_ROOT, trayId, 'password'])
}

export function getTrayServerType(state, trayId) {
  return state.getIn([TRAYS_ROOT, trayId, 'serverType'])
}

export function getTrayIncludeNew(state, trayId) {
  return state.getIn([TRAYS_ROOT, trayId, 'includeNew'])
}

export function getTrayHighlight(state, trayId) {
  return state.getIn([TRAYS_ROOT, trayId, 'highlight'])
}

export function getTrayErrors(state, trayId) {
  return state.getIn([TRAYS_ROOT, trayId, 'errors'])
}

export function getTrayTimestamp(state, trayId) {
  return state.getIn([TRAYS_ROOT, trayId, 'timestamp'])
}

export function getTrayRequiresRefresh(state, trayId) {
  return state.getIn([TRAYS_ROOT, trayId, 'requiresRefresh'])
}

export function getNotification(state) {
  return state.get(NOTIFICATION_ROOT)
}

export function getInterestingLoaded(state) {
  return state.getIn([INTERESTING_ROOT, 'loaded'])
}

export function getInterestingErrors(state) {
  return state.getIn([INTERESTING_ROOT, 'errors'])
}

export function getInterestingProjects(state) {
  return state.getIn([INTERESTING_ROOT, 'projects'])
}

export function getInterestingPendingRequest(state) {
  return getPendingRequest(state, INTERESTING_ROOT)
}

export function getSelectedProjects(state, trayId) {
  return trayId
    ? state.getIn([SELECTED_ROOT, trayId])
    : state.get(SELECTED_ROOT)
}

export function getProjects(state, trayId) {
  const projects = state.getIn([PROJECTS_ROOT, trayId])
  return projects
    ? projects.toList()
    : undefined
}

export function getSeenProjects(state, trayId) {
  return getProjects(state, trayId).map((project) => project.get('projectId'))
}

export function getPendingRequest(state, id) {
  return state.getIn([PENDING_REQUESTS_ROOT, id])
}
