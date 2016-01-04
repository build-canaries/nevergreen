const AppDispatcher = require('../dispatcher/AppDispatcher')
const Constants = require('../constants/NevergreenConstants')
const projectsGateway = require('../gateways/projectsGateway')

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
  }

}
