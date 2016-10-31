import Immutable from 'immutable'
import Package from '../../../package'
import {INITIALISING, INITIALISED} from '../actions/NevergreenActions'

const DefaultState = Immutable.Map({
  loaded: false,
  versionNumber: Package.version,
  versionName: Package.versionName,
  versionColour: Package.versionColour,
  versionMeta: Package.versionMeta,
  commitHash: Package.commitHash
})

export function reduce(state = DefaultState, action) {
  switch (action.type) {
    case INITIALISING:
      return DefaultState

    case INITIALISED:
      return state.set('loaded', true).merge(action.data.get('nevergreen'))

    default:
      return state
  }
}
