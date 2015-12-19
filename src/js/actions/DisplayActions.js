var AppDispatcher = require('../dispatcher/AppDispatcher')
var Constants = require('../constants/NevergreenConstants')

module.exports = {
  setBrokenBuildTimers: function (value) {
    AppDispatcher.dispatch({
      type: Constants.BrokenBuildTimersChanged,
      value: value
    })
  }
}