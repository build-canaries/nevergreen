import {List, Map} from 'immutable'
import {INTERESTING_PROJECTS, INTERESTING_PROJECTS_FETCHING} from '../actions/Actions'

const DEFAULT_STATE = Map({
  projects: List(),
  errors: List(),
  loaded: false,
  pendingRequest: null
})

export function reduce(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case INTERESTING_PROJECTS: {
      return state.withMutations((map) => map
        .set('loaded', true)
        .set('projects', action.projects)
        .set('errors', action.errors)
        .delete('pendingRequest'))
    }
    case INTERESTING_PROJECTS_FETCHING:
      return state.set('pendingRequest', action.request)
    default:
      return state
  }
}
