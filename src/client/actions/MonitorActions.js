import Immutable from 'immutable'
import {interesting} from '../common/gateways/ProjectsGateway'

export const INTERESTING_PROJECTS = 'INTERESTING_PROJECTS'
export function interestingProjects(projects) {
  return {type: INTERESTING_PROJECTS, data: Immutable.fromJS(projects)}
}

export const INTERESTING_PROJECTS_ERROR = 'INTERESTING_PROJECTS_ERROR'
export function interestingProjectsError(errors) {
  return {type: INTERESTING_PROJECTS_ERROR, errors: Immutable.List(errors)}
}

export function fetchInteresting(trays, selected) {
  return function (dispatch) {
    return interesting(trays, selected)
      .then((json) => {
        const filteredProjects = json.filter((project) => !project.job)
        return dispatch(interestingProjects(filteredProjects))
      })
      .catch((error) => dispatch(interestingProjectsError([
        'Unable to fetch interesting projects because of an error:',
        `${error.status} - ${error.message}`
      ])))
  }
}
