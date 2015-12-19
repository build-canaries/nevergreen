const AppDispatcher = require('../dispatcher/AppDispatcher')
const Constants = require('../constants/NevergreenConstants')
const projectsGateway = require('../gateways/projectsGateway')

let _timerId

module.exports = {

  fetchInteresting(trays, selected) {
    return projectsGateway.interesting(trays, selected).then(data => {
      AppDispatcher.dispatch({
        type: Constants.InterestingProjects,
        projects: data
      })
    }).catch(err => {
      AppDispatcher.dispatch({
        type: Constants.InterestingProjectsError,
        error: err
      })
    })
  },

  pollForChanges(waitTime, getTraysFn, getSelectedFn) {
    this.fetchInteresting(getTraysFn(), getSelectedFn()).then(function() {
      _timerId = setTimeout(function() {
        this.pollForChanges(waitTime, getTraysFn, getSelectedFn)
      }.bind(this), waitTime)
    }.bind(this))
  },

  stopPollingForChanges() {
    if (_timerId) {
      clearTimeout(_timerId)
    }
  }

}
