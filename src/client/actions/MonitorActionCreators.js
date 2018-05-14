import Immutable from 'immutable'
import {INTERESTING_PROJECTS} from './Actions'

export function interestingProjects(projects, errors) {
  return {
    type: INTERESTING_PROJECTS,
    projects: Immutable.fromJS(projects),
    errors: Immutable.List(errors)
  }
}
