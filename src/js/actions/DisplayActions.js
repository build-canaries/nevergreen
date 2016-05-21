import AppDispatcher from '../dispatcher/AppDispatcher'
import {BrokenBuildTimersChanged, BrokenBuildSoundsToggled, BrokenBuildSoundFx} from '../constants/NevergreenConstants'

module.exports = {
  setBrokenBuildTimers(value) {
    AppDispatcher.dispatch({
      type: BrokenBuildTimersChanged,
      value
    })
  },
  
  setBrokenBuildSounds(value) {
    AppDispatcher.dispatch({
      type: BrokenBuildSoundsToggled,
      value
    })
  },
  
  setBrokenBuildSoundFx(value) {
    AppDispatcher.dispatch({
      type: BrokenBuildSoundFx,
      value
    })
  }
}
