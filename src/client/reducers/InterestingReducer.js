import {List, Map} from 'immutable'
import {INTERESTING_PROJECTS} from '../actions/Actions'

export const INTERESTING_ROOT = 'interesting'

const DEFAULT_STATE = Map({
  projects: List(),
  errors: List(),
  loaded: false
})

export function reduce(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case INTERESTING_PROJECTS:
      return state.withMutations((map) => map
        .set('loaded', true)
        .set('projects', action.projects)
        .set('errors', action.errors))

    default:
      return state
  }
}
