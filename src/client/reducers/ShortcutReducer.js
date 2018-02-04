import {KEYBOARD_SHORTCUT} from '../actions/Actions'

const DEFAULT_STATE = false

export function reduce(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case KEYBOARD_SHORTCUT:
      return action.show

    default:
      return state
  }
}
