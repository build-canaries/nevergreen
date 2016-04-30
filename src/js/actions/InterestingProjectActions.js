import AppDispatcher from '../dispatcher/AppDispatcher'
import {InterestingProjects, InterestingProjectsError} from '../constants/NevergreenConstants'
import {interesting} from '../gateways/projectsGateway'

module.exports = {

  fetchInteresting(trays, selected) {
    return interesting(trays, selected).then((projects) => {
      AppDispatcher.dispatch({
        type: InterestingProjects,
        projects
      })
    }).catch((error) => {
      AppDispatcher.dispatch({
        type: InterestingProjectsError,
        error
      })
    })
  }
}
