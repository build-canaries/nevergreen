import Immutable from 'immutable'
import {MESSAGE_ADDED, MESSAGE_REMOVED} from '../actions/SuccessActions'
import {INITIALISED} from '../actions/NevergreenActions'
import {IMPORTED_DATA} from '../actions/BackupActions'

const DefaultState = Immutable.OrderedSet()

export function reduce(state = DefaultState, action) {
  switch (action.type) {
    case INITIALISED:
    case IMPORTED_DATA:
      return state.union(action.data.get('success'))

    case MESSAGE_ADDED:
      return state.add(action.message)

    case MESSAGE_REMOVED:
      return state.delete(action.message)

    default:
      return state
  }
}
