import {
  BROKEN_BUILD_SOUND_FX,
  PLAY_BROKEN_BUILD_SOUND_FX,
  REFRESH_TIME,
  SHOW_BROKEN_BUILD_TIME,
  SHOW_BUILD_LABEL,
  SHOW_TRAY_NAME
} from './Actions'

const MIN_REFRESH_TIME = 5

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
  return {
    type: REFRESH_TIME,
    value: intValue >= MIN_REFRESH_TIME ? intValue : MIN_REFRESH_TIME
  }
}

export function setShowBuildLabel(value) {
  return {type: SHOW_BUILD_LABEL, value}
}
