import AppDispatcher from '../common/AppDispatcher'
import {interesting} from '../common/gateways/ProjectsGateway'

export const InterestingProjects = 'interesting-projects'
export const InterestingProjectsError = 'interesting-projects-error'
export function fetchInteresting(trays, selected) {
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
