import {KEYBOARD_SHORTCUT} from '../actions/Actions'

export const SHORTCUT_ROOT = 'shortcut'

const DEFAULT_STATE = false

export function reduce(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case KEYBOARD_SHORTCUT:
      return action.show

    default:
      return state
  }
}
