var AppDispatcher = require('../dispatcher/AppDispatcher')
var Constants = require('../constants/NevergreenConstants')
var projectsGateway = require('../gateways/projectsGateway')

module.exports = {

  fetchInteresting: function (trays, selected) {
    projectsGateway.interesting(trays, selected).then(function (data) {
      AppDispatcher.dispatch({
        type: Constants.InterestingProjects,
        projects: data
      })
    })
  }

}
