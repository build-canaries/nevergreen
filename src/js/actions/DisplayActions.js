import AppDispatcher from '../dispatcher/AppDispatcher'
import Constants from '../constants/NevergreenConstants'

module.exports = {
  setBrokenBuildTimers(value) {
    AppDispatcher.dispatch({
      type: Constants.BrokenBuildTimersChanged,
      value
    })
  },
  setBrokenBuildSounds(value) {
    AppDispatcher.dispatch({
      type: Constants.BrokenBuildSoundsToggled,
      value
    })
  }
}
