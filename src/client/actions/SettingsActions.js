export const SHOW_BROKEN_BUILD_TIME = 'SHOW_BROKEN_BUILD_TIME'
export function showBrokenBuildTime(value) {
  return {
    type: SHOW_BROKEN_BUILD_TIME,
    value
  }
}

export const SHOW_TRAY_NAME = 'SHOW_TRAY_NAME'
export function showTrayName(value) {
  return {
    type: SHOW_TRAY_NAME,
    value
  }
}

export const PLAY_BROKEN_BUILD_SOUND_FX = 'PLAY_BROKEN_BUILD_SOUND_FX'
export function playBrokenBuildSoundFx(value) {
  return {
    type: PLAY_BROKEN_BUILD_SOUND_FX,
    value
  }
}

export const BROKEN_BUILD_SOUND_FX = 'BROKEN_BUILD_SOUND_FX'
export function setBrokenBuildSoundFx(value) {
  return {
    type: BROKEN_BUILD_SOUND_FX,
    value
  }
}

export const REFRESH_TIME = 'REFRESH_TIME'
export function setRefreshTime(value) {
  const intValue = parseInt(value)
  return {
    type: REFRESH_TIME,
    value: intValue >= 5 ? intValue : 5
  }
}
