import {Map} from 'immutable'
import {FULL_SCREEN, INITIALISED, INITIALISING, REQUEST_FULL_SCREEN} from '../actions/Actions'

export const NEVERGREEN_ROOT = 'nevergreen'

const DEFAULT_STATE = Map({
  loaded: false,
  fullScreen: false,
  fullScreenRequested: false
})

export function reduce(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case INITIALISING:
      return DEFAULT_STATE

    case INITIALISED:
      return state
        .merge(action.data.get(NEVERGREEN_ROOT))
        .set('loaded', true)

    case FULL_SCREEN:
      return state.set('fullScreen', action.enabled)

    case REQUEST_FULL_SCREEN:
      return state.set('fullScreenRequested', action.requested)

    default:
      return state
  }
}
