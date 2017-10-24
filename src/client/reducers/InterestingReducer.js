import Immutable from 'immutable'
import {INTERESTING_PROJECTS} from '../actions/Actions'

const DefaultState = Immutable.Map({
  projects: Immutable.List(),
  errors: Immutable.List(),
  loaded: false
})

export function reduce(state = DefaultState, action) {
  switch (action.type) {
    case INTERESTING_PROJECTS:
      return state.withMutations((map) =>
        map.set('loaded', true).set('projects', action.projects).set('errors', action.errors))

    default:
      return state
  }
}
