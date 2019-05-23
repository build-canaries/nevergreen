import {Actions} from '../actions/Actions'
import {ActionNotification, ActionNotificationDismiss} from '../actions/NotificationActionCreators'

export type NotificationState = string

type SupportedActions = ActionNotification | ActionNotificationDismiss

export const NOTIFICATION_ROOT = 'notification'

const DEFAULT_STATE: NotificationState = ''

export function reduce(state = DEFAULT_STATE, action: SupportedActions): NotificationState {
  switch (action.type) {
    case Actions.NOTIFICATION:
      return action.message

    case Actions.NOTIFICATION_DISMISS:
      return ''

    default:
      return state
  }
}
