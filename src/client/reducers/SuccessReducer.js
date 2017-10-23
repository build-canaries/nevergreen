import Immutable from 'immutable'
import {MESSAGE_REMOVED} from '../actions/Actions'
import {INITIALISED, MESSAGE_ADDED} from '../actions/Actions'
import {IMPORT_SUCCESS} from '../actions/Actions'

const DefaultState = Immutable.OrderedSet(['=(^.^)='])

export function reduce(state = DefaultState, action) {
  switch (action.type) {
    case INITIALISED:
    case IMPORT_SUCCESS: {
      const success = action.data.get('success')
      return success ? Immutable.OrderedSet(success) : state
    }

    case MESSAGE_ADDED:
      return state.add(action.message)

    case MESSAGE_REMOVED:
      return state.delete(action.message)

    default:
      return state
  }
}
