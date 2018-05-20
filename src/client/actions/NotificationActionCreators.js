import {NOTIFICATION, NOTIFICATION_DISMISS} from './Actions'

export function notify(message) {
  return {type: NOTIFICATION, message}
}

export function dismiss() {
  return {type: NOTIFICATION_DISMISS}
}
