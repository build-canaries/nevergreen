import Immutable from 'immutable'
import {
  BROKEN_BUILD_SOUND_FX,
  BROKEN_BUILD_SOUNDS_CHANGED,
  BROKEN_BUILD_TIMERS_CHANGED,
  TRAY_NAME_TOGGLED
} from '../actions/AudioVisualActions'
import {INITIALISED} from '../actions/NevergreenActions'
import {IMPORTED_DATA} from '../actions/BackupActions'

const DefaultState = Immutable.Map({
  showTrayNameEnabled: false,
  brokenBuildTimersEnabled: true,
  brokenBuildSoundsEnabled: false,
  brokenBuildSoundFx: 'pacman_death.mp3',
})

export function reduce(state = DefaultState, action) {
  switch (action.type) {
    case INITIALISED:
    case IMPORTED_DATA:
      return state.merge(action.data.get('audioVisual'))

    case BROKEN_BUILD_TIMERS_CHANGED:
      return state.set('brokenBuildTimersEnabled', action.value)

    case BROKEN_BUILD_SOUNDS_CHANGED:
      return state.set('brokenBuildSoundsEnabled', action.value)

    case BROKEN_BUILD_SOUND_FX:
      return state.set('brokenBuildSoundFx', action.value)

    case TRAY_NAME_TOGGLED:
      return state.set('showTrayNameEnabled', action.value)

    default:
      return state
  }
}
