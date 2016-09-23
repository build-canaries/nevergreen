import Immutable from 'immutable'
import Package from '../../../package'
import {INITIALISING, INITIALISED, KEYBOARD_SHORTCUT} from '../actions/NevergreenActions'

const DefaultState = Immutable.Map({
  loaded: false,
  versionNumber: Package.version,
  versionName: Package.versionName,
  versionColour: Package.versionColour,
  versionMeta: Package.versionMeta,
  commitHash: Package.commitHash,
  shortcutsShown: false
})

export function reduce(state = DefaultState, action) {
  switch (action.type) {
    case INITIALISING:
      return DefaultState

    case INITIALISED:
      return state.set('loaded', true).merge(action.data.get('nevergreen'))

    case KEYBOARD_SHORTCUT:
      return state.set('shortcutsShown', action.show)

    default:
      return state
  }
}
