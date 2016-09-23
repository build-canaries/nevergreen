import Immutable from 'immutable'
import {INTERESTING_PROJECTS, INTERESTING_PROJECTS_ERROR} from '../actions/MonitorActions'

const DefaultState = Immutable.Map({
  projects: Immutable.List(),
  loaded: false
})

export function reduce(state = DefaultState, action) {
  switch (action.type) {
    case INTERESTING_PROJECTS:
      return state.delete('errors').set('loaded', true).set('projects', action.data)

    case INTERESTING_PROJECTS_ERROR:
      return state.set('errors', action.errors).set('loaded', true)

    default:
      return state
  }
}
