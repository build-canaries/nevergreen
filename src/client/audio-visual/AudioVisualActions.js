import AppDispatcher from '../common/AppDispatcher'

export const BrokenBuildTimersChanged = 'broken-build-timers-changed'
export function setBrokenBuildTimers(value) {
  AppDispatcher.dispatch({
    type: BrokenBuildTimersChanged,
    value
  })
}

export const TrayNameToggled = 'tray-name-toggled'
export function setTrayNameToggled(value) {
  AppDispatcher.dispatch({
    type: TrayNameToggled,
    value
  })
}

export const BrokenBuildSoundsToggled = 'broken-build-sounds-toggled'
export function setBrokenBuildSounds(value) {
  AppDispatcher.dispatch({
    type: BrokenBuildSoundsToggled,
    value
  })
}

export const BrokenBuildSoundFx = 'broken-build-sound-fx'
export function setBrokenBuildSoundFx(value) {
  AppDispatcher.dispatch({
    type: BrokenBuildSoundFx,
    value
  })
}
