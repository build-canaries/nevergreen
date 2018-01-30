import Immutable from 'immutable'
import {FULL_SCREEN, INITIALISED, INITIALISING, REQUEST_FULL_SCREEN} from '../actions/Actions'

const DefaultState = Immutable.Map({
  loaded: false,
  fullScreen: false,
  fullScreenRequested: false
})

export function reduce(state = DefaultState, action) {
  switch (action.type) {
    case INITIALISING:
      return DefaultState

    case INITIALISED:
      return state.set('loaded', true).merge(action.data.get('nevergreen'))

    case FULL_SCREEN:
      return state.set('fullScreen', action.enabled)

    case REQUEST_FULL_SCREEN:
      return state.set('fullScreenRequested', action.requested)

    default:
      return state
  }
}
