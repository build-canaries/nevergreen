import {isBlank} from './Utils'
import _ from 'lodash'
import {info} from './Logger'

const NOTIFICATION_PERMISSION_GRANTED = 'granted'
const NOTIFICATION_PERMISSION_DENIED = 'denied'

export function supported() {
  return 'Notification' in window
}

export function permissionGranted(result) {
  if (isBlank(result)) {
    return _.get(Notification, 'permission') === NOTIFICATION_PERMISSION_GRANTED
  } else {
    return result === NOTIFICATION_PERMISSION_GRANTED
  }
}

export function requestPermission() {
  if (permissionGranted()) {
    info('Notification API permission already granted')
    return Promise.resolve(NOTIFICATION_PERMISSION_GRANTED)
  }

  if (supported()) {
    return Notification.requestPermission().then((result) => {
      info('Notification API permission request result', result)
      return result
    })
  }

  info('Notification API not supported')
  return Promise.resolve(NOTIFICATION_PERMISSION_DENIED)
}

export function sendSystemNotification({title = 'Nevergreen', body, badge = '/mstile-144x144.png', icon = '/android-chrome-192x192.png', tag}) {
  if (supported() && permissionGranted()) {
    navigator.serviceWorker.ready.then((registration) => {
      return registration.showNotification(title, {body, badge, icon, tag})
    })
  }
}
