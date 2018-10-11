import {OrderedSet} from 'immutable'
import {IMPORT_SUCCESS, INITIALISED, MESSAGE_ADDED, MESSAGE_REMOVED} from '../actions/Actions'

export const SUCCESS_ROOT = 'success'

const DEFAULT_STATE = OrderedSet(['=(^.^)='])

export function reduce(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case INITIALISED:
    case IMPORT_SUCCESS: {
      const success = action.data.get('success')
      return success ? OrderedSet(success) : state
    }

    case MESSAGE_ADDED:
      return state.add(action.message)

    case MESSAGE_REMOVED:
      return state.delete(action.message)

    default:
      return state
  }
}
