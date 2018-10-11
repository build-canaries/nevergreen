import {fromJS} from 'immutable'
import {FULL_SCREEN, INITIALISED, INITIALISING, REQUEST_FULL_SCREEN} from '../actions/Actions'

export const NEVERGREEN_ROOT = 'nevergreen'

const DEFAULT_STATE = fromJS({
  loaded: false,
  fullScreen: false,
  fullScreenRequested: false
})

export function reduce(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case INITIALISING:
      return DEFAULT_STATE

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
