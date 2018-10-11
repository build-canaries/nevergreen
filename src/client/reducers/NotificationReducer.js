import {NOTIFICATION, NOTIFICATION_DISMISS} from '../actions/Actions'

export const NOTIFICATION_ROOT = 'notification'

const DEFAULT_STATE = null

export function reduce(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case NOTIFICATION:
      return action.message

    case NOTIFICATION_DISMISS:
      return null

    default:
      return state
  }
}
