export const SHOW_BROKEN_BUILD_TIME = 'SHOW_BROKEN_BUILD_TIME'
export function setShowBrokenBuildTime(value) {
  return {type: SHOW_BROKEN_BUILD_TIME, value}
}

export const SHOW_TRAY_NAME = 'SHOW_TRAY_NAME'
export function setShowTrayName(value) {
  return {type: SHOW_TRAY_NAME, value}
}

export const PLAY_BROKEN_BUILD_SOUND_FX = 'PLAY_BROKEN_BUILD_SOUND_FX'
export function setPlayBrokenBuildSoundFx(value) {
  return {type: PLAY_BROKEN_BUILD_SOUND_FX, value}
}

export const BROKEN_BUILD_SOUND_FX = 'BROKEN_BUILD_SOUND_FX'
export function setBrokenBuildSoundFx(value) {
  return {type: BROKEN_BUILD_SOUND_FX, value}
}

export const MIN_REFRESH_TIME = 5
export const REFRESH_TIME = 'REFRESH_TIME'
export function setRefreshTime(value) {
  const intValue = parseInt(value)
  return {
    type: REFRESH_TIME,
    value: intValue >= MIN_REFRESH_TIME ? intValue : MIN_REFRESH_TIME
  }
}
