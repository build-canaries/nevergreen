import AppDispatcher from '../dispatcher/AppDispatcher'
import Constants from '../constants/NevergreenConstants'
import {interesting} from '../gateways/projectsGateway'

module.exports = {

  fetchInteresting(trays, selected) {
    return interesting(trays, selected).then((projects) => {
      AppDispatcher.dispatch({
        type: Constants.InterestingProjects,
        projects
      })
    }).catch((error) => {
      AppDispatcher.dispatch({
        type: Constants.InterestingProjectsError,
        error
      })
    })
  }
}
