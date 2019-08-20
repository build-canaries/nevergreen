import {Actions} from '../Actions'
import {Action} from 'redux'

export interface ActionNotification extends Action<Actions.NOTIFICATION> {
  readonly message: string;
}

export interface ActionNotificationDismiss extends Action<Actions.NOTIFICATION_DISMISS> {
}

export function notify(message: string): ActionNotification {
  return {type: Actions.NOTIFICATION, message}
}

export function dismiss(): ActionNotificationDismiss {
  return {type: Actions.NOTIFICATION_DISMISS}
}
