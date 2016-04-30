import AppDispatcher from '../dispatcher/AppDispatcher'
import Constants from '../constants/NevergreenConstants'
import projectsGateway from '../gateways/projectsGateway'

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
