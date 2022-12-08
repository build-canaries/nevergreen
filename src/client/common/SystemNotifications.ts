import { isBlank } from './Utils'
import get from 'lodash/get'
import { info } from './Logger'

const notificationPermissionGranted = 'granted'
const notificationPermissionDenied = 'denied'

export function supported(): boolean {
  return 'Notification' in window
}

export function permissionGranted(result?: string): boolean {
  if (isBlank(result)) {
    return get(Notification, 'permission') === notificationPermissionGranted
  } else {
    return result === notificationPermissionGranted
  }
}

export async function requestPermission(): Promise<string> {
  if (permissionGranted()) {
    info('Notification API permission already granted')
    return notificationPermissionGranted
  }

  if (supported()) {
    const result = await Notification.requestPermission()
    info('Notification API permission request result', result)
    return result
  }

  info('Notification API not supported')
  return notificationPermissionDenied
}

interface Notification {
  readonly title?: string
  readonly body: string
  readonly badge?: string
  readonly icon?: string
  readonly tag?: string
}

export async function sendSystemNotification({
  title = 'Nevergreen',
  body,
  badge = '/badge-96x96.png',
  icon = '/android-chrome-192x192.png',
  tag,
}: Notification): Promise<void> {
  if (supported() && permissionGranted()) {
    if (process.env.NODE_ENV === 'production') {
      const registration = await navigator.serviceWorker.ready
      await registration.showNotification(title, { body, badge, icon, tag })
    } else {
      // We don't register the service worker in dev as the caching is annoying, so log to the console instead
      info('System notification sent', { title, body, badge, icon, tag })
    }
  }
}
