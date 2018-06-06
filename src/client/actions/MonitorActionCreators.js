import Immutable from 'immutable'
import {INTERESTING_PROJECTS, INTERESTING_PROJECTS_FETCHING} from './Actions'

export function interestingProjectsFetching(request) {
  return {
    type: INTERESTING_PROJECTS_FETCHING,
    request
  }
}

export function interestingProjects(projects, errors) {
  return {
    type: INTERESTING_PROJECTS,
    projects: Immutable.fromJS(projects),
    errors: Immutable.List(errors)
  }
}
