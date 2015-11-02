var AppDispatcher = require('../dispatcher/AppDispatcher')
var Constants = require('../constants/NevergreenConstants')
var projectsGateway = require('../gateways/projectsGateway')

var _timerId

module.exports = {

  fetchInteresting: function (trays, selected) {
    return projectsGateway.interesting(trays, selected).then(function (data) {
      AppDispatcher.dispatch({
        type: Constants.InterestingProjects,
        projects: data
      })
    }).catch(function (err) {
      AppDispatcher.dispatch({
        type: Constants.InterestingProjectsError,
        error: err
      })
    })
  },

  pollForChanges: function (waitTime, getTraysFn, getSelectedFn) {
    this.fetchInteresting(getTraysFn(), getSelectedFn()).then(function () {
      _timerId = setTimeout(function () {
        this.pollForChanges(waitTime, getTraysFn, getSelectedFn)
      }.bind(this), waitTime)
    }.bind(this))
  },

  stopPollingForChanges: function () {
    if (_timerId) {
      clearTimeout(_timerId)
    }
  }

}
