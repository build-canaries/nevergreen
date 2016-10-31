import Immutable from 'immutable'
import {INITIALISING} from '../actions/NevergreenActions'
import {KEYBOARD_SHORTCUT} from '../actions/ShortcutActions'

const DefaultState = Immutable.Map({
  show: false
})

export function reduce(state = DefaultState, action) {
  switch (action.type) {
    case INITIALISING:
      return DefaultState

    case KEYBOARD_SHORTCUT:
      return state.set('show', action.show)

    default:
      return state
  }
}
