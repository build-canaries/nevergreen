import Immutable from 'immutable'
import {BROKEN_BUILD_SOUND_FX, PLAY_BROKEN_BUILD_SOUND_FX, SHOW_BROKEN_BUILD_TIME, SHOW_TRAY_NAME, REFRESH_TIME, SHOW_BUILD_LABEL} from '../actions/SettingsActions'
import {INITIALISED} from '../actions/NevergreenActions'
import {IMPORT_SUCCESS} from '../actions/ImportActions'
import defaultSoundFx from '../settings/pacman_death.mp3'

const DefaultState = Immutable.Map({
  showTrayName: false,
  showBrokenBuildTime: true,
  playBrokenBuildSoundFx: false,
  brokenBuildSoundFx: defaultSoundFx,
  refreshTime: 5,
  showBrokenBuildLabel: true
})

export function reduce(state = DefaultState, action) {
  switch (action.type) {
    case INITIALISED:
    case IMPORT_SUCCESS:
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

    case SHOW_BUILD_LABEL:
      return state.set('showBrokenBuildLabel', action.value)

    default:
      return state
  }
}
