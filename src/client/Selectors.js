export function loaded(state) {
  return state.getIn(['nevergreen', 'loaded'])
}

export function fullScreen(state) {
  return state.getIn(['nevergreen', 'fullScreen'])
}

export function fullScreenRequested(state) {
  return state.getIn(['nevergreen', 'fullScreenRequested'])
}

export function showTrayName(state) {
  return state.getIn(['audioVisual', 'showTrayName'])
}

export function showBuildTime(state) {
  return state.getIn(['audioVisual', 'showBuildTime'])
}

export function showBrokenBuildTime(state) {
  return state.getIn(['audioVisual', 'showBrokenBuildTime'])
}

export function playBrokenBuildSoundFx(state) {
  return state.getIn(['audioVisual', 'playBrokenBuildSoundFx'])
}

export function showBuildLabel(state) {
  return state.getIn(['audioVisual', 'showBuildLabel'])
}

export function showSystemNotifications(state) {
  return state.getIn(['audioVisual', 'showSystemNotifications'])
}

export function systemNotificationRequestingPermission(state) {
  return state.getIn(['audioVisual', 'systemNotificationRequestingPermission'])
}

export function systemNotificationPermissionDenied(state) {
  return state.getIn(['audioVisual', 'systemNotificationPermissionDenied'])
}

export function brokenBuildSoundFx(state) {
  return state.getIn(['audioVisual', 'brokenBuildSoundFx'])
}

export function refreshTime(state) {
  return state.getIn(['audioVisual', 'refreshTime'])
}

export function maxProjectsToShow(state) {
  return state.getIn(['audioVisual', 'maxProjectsToShow'])
}

export function importLoaded(state) {
  return state.getIn(['backupImport', 'loaded'])
}

export function importErrors(state) {
  return state.getIn(['backupImport', 'errors'])
}

export function importInfos(state) {
  return state.getIn(['backupImport', 'infos'])
}

export function gistId(state) {
  return state.getIn(['github', 'gistId'])
}

export function gistDescription(state) {
  return state.getIn(['github', 'description'])
}

export function exportLoaded(state) {
  return state.getIn(['backupExport', 'loaded'])
}

export function exportErrors(state) {
  return state.getIn(['backupExport', 'errors'])
}

export function exportInfos(state) {
  return state.getIn(['backupExport', 'infos'])
}

export function successMessages(state) {
  return state.get('success')
}

export function trays(state) {
  return state.get('trays').toList()
}

export function tray(state, trayId) {
  return state.getIn(['trays', trayId])
}

export function trayIds(state) {
  return state.get('trays').keySeq()
}

export function trayLoaded(state, trayId) {
  return state.getIn(['trays', trayId, 'loaded'])
}

export function trayName(state, trayId) {
  return state.getIn(['trays', trayId, 'name'])
}

export function trayUrl(state, trayId) {
  return state.getIn(['trays', trayId, 'url'])
}

export function trayUsername(state, trayId) {
  return state.getIn(['trays', trayId, 'username'])
}

export function trayPassword(state, trayId) {
  return state.getIn(['trays', trayId, 'password'])
}

export function trayServerType(state, trayId) {
  return state.getIn(['trays', trayId, 'serverType'])
}

export function trayPendingRequest(state, trayId) {
  return state.getIn(['trays', trayId, 'pendingRequest'])
}

export function trayHighlight(state, trayId) {
  return state.getIn(['trays', trayId, 'highlight'])
}

export function trayErrors(state, trayId) {
  return state.getIn(['trays', trayId, 'errors'])
}

export function trayTimestamp(state, trayId) {
  return state.getIn(['trays', trayId, 'timestamp'])
}

export function notification(state) {
  return state.get('notification')
}

export function interestingLoaded(state) {
  return state.getIn(['interesting', 'loaded'])
}

export function interestingErrors(state) {
  return state.getIn(['interesting', 'errors'])
}

export function interestingProjects(state) {
  return state.getIn(['interesting', 'projects'])
}

export function interestingPendingRequest(state) {
  return state.getIn(['interesting', 'pendingRequest'])
}

export function selectedProjects(state, trayId) {
  return trayId
    ? state.getIn(['selected', trayId])
    : state.get('selected')
}

export function projects(state, trayId) {
  return state.getIn(['projects', trayId]).toList()
}

export function shortcut(state) {
  return state.get('shortcut')
}
