import {KEYBOARD_SHORTCUT} from '../actions/ShortcutActions'

const DefaultState = false

export function reduce(state = DefaultState, action) {
  switch (action.type) {
    case KEYBOARD_SHORTCUT:
      return action.show

    default:
      return state
  }
}
