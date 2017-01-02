import Immutable from 'immutable'
import {BROKEN_BUILD_SOUND_FX, PLAY_BROKEN_BUILD_SOUND_FX, SHOW_BROKEN_BUILD_TIME, SHOW_TRAY_NAME, REFRESH_TIME} from '../actions/AudioVisualActions'
import {INITIALISED} from '../actions/NevergreenActions'
import {IMPORTED_DATA} from '../actions/BackupActions'
import defaultSoundFx from '../audio-visual/pacman_death.mp3'

const DefaultState = Immutable.Map({
  showTrayName: false,
  showBrokenBuildTime: true,
  playBrokenBuildSoundFx: false,
  brokenBuildSoundFx: defaultSoundFx,
  refreshTime: 5
})

export function reduce(state = DefaultState, action) {
  switch (action.type) {
    case INITIALISED:
    case IMPORTED_DATA:
      return state.merge(action.data.get('audioVisual'))

    case SHOW_BROKEN_BUILD_TIME:
      return state.set('showBrokenBuildTime', action.value)

    case PLAY_BROKEN_BUILD_SOUND_FX:
      return state.set('playBrokenBuildSoundFx', action.value)

    case BROKEN_BUILD_SOUND_FX:
      return state.set('brokenBuildSoundFx', action.value)

    case SHOW_TRAY_NAME:
      return state.set('showTrayName', action.value)

    case REFRESH_TIME:
      return state.set('refreshTime', action.value)

    default:
      return state
  }
}
