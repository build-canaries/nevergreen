import {NOTIFICATION_DISMISS} from '../actions/Actions'
import {NOTIFICATION} from '../actions/Actions'

const DefaultState = null

export function reduce(state = DefaultState, action) {
  switch (action.type) {
    case NOTIFICATION:
      return action.message

    case NOTIFICATION_DISMISS:
      return null

    default:
      return state
  }
}
