import AppDispatcher from '../common/AppDispatcher'
import {interesting} from '../common/gateways/ProjectsGateway'

export const INTERESTING_PROJECTS = 'INTERESTING_PROJECTS'
export function interestingProjects(projects) {
  return {
    type: INTERESTING_PROJECTS,
    projects
  }
}

export const INTERESTING_PROJECTS_ERROR = 'INTERESTING_PROJECTS_ERROR'
export function interestingProjectsError(error) {
  return {
    type: INTERESTING_PROJECTS_ERROR,
    error
  }
}

export function fetchInteresting(trays, selected) {
  return interesting(trays, selected).then((projects) => {
    AppDispatcher.dispatch(interestingProjects(projects))
  }).catch((error) => {
    AppDispatcher.dispatch(interestingProjectsError(error))
  })
}
