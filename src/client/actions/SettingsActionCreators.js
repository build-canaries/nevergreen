import {
  BROKEN_BUILD_SOUND_FX,
  PLAY_BROKEN_BUILD_SOUND_FX,
  REFRESH_TIME,
  SET_MAX_PROJECTS,
  SHOW_BROKEN_BUILD_TIME,
  SHOW_BUILD_LABEL,
  SHOW_BUILD_TIME,
  SHOW_TRAY_NAME
} from './Actions'

export const MIN_REFRESH_TIME = 5
export const VALID_REFRESH_TIMES = [5, 10, 30, 60, 300, 600, 1800, 3600, 43200, 86400]
export const DEFAULT_PROJECTS_TO_SHOW = 12
export const VALID_PROJECTS_TO_SHOW = [6, 12, 18, 24, 30, Number.MAX_SAFE_INTEGER]

function absoluteClosestNumber(actual, a, b) {
  return Math.abs(b - actual) < Math.abs(a - actual) ? b : a
}

export function setShowBuildTime(value) {
  return {type: SHOW_BUILD_TIME, value}
}

export function setShowBrokenBuildTime(value) {
  return {type: SHOW_BROKEN_BUILD_TIME, value}
}

export function setShowTrayName(value) {
  return {type: SHOW_TRAY_NAME, value}
}

export function setPlayBrokenBuildSoundFx(value) {
  return {type: PLAY_BROKEN_BUILD_SOUND_FX, value}
}

export function setBrokenBuildSoundFx(value) {
  return {type: BROKEN_BUILD_SOUND_FX, value}
}

export function setRefreshTime(value) {
  const intValue = parseInt(value)
  const closestMatch = VALID_REFRESH_TIMES.reduce((prev, curr) => absoluteClosestNumber(intValue, prev, curr))
  return {type: REFRESH_TIME, value: closestMatch}
}

export function setShowBuildLabel(value) {
  return {type: SHOW_BUILD_LABEL, value}
}

export function setMaxProjectsToShow(value) {
  const intValue = parseInt(value)
  const closestMatch = VALID_PROJECTS_TO_SHOW.reduce((prev, curr) => absoluteClosestNumber(intValue, prev, curr))
  return {type: SET_MAX_PROJECTS, value: closestMatch}
}
