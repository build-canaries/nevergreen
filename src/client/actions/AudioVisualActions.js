export const BROKEN_BUILD_TIMERS_CHANGED = 'BROKEN_BUILD_TIMERS_CHANGED'
export function setBrokenBuildTimers(value) {
  return {
    type: BROKEN_BUILD_TIMERS_CHANGED,
    value
  }
}

export const TRAY_NAME_TOGGLED = 'TRAY_NAME_TOGGLED'
export function setTrayNameToggled(value) {
  return {
    type: TRAY_NAME_TOGGLED,
    value
  }
}

export const BROKEN_BUILD_SOUNDS_CHANGED = 'BROKEN_BUILD_SOUNDS_CHANGED'
export function setBrokenBuildSounds(value) {
  return {
    type: BROKEN_BUILD_SOUNDS_CHANGED,
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
