import {
  requestingSystemNotificationPermission,
  setShowSystemNotifications,
  systemNotificationPermissionDenied
} from './SettingsActionCreators'
import * as systemNotifications from '../common/SystemNotifications'

const NOTIFICATIONS_ENABLED_NOTIFICATION = {body: 'System notifications are now enabled!'}

export function enableSystemNotifications(show) {
  return async (dispatch) => {
    if (show) {
      dispatch(requestingSystemNotificationPermission())

      const result = await systemNotifications.requestPermission()
      if (systemNotifications.permissionGranted(result)) {
        dispatch(setShowSystemNotifications(true))
        systemNotifications.sendSystemNotification(NOTIFICATIONS_ENABLED_NOTIFICATION)
      } else {
        dispatch(systemNotificationPermissionDenied())
      }
    } else {
      dispatch(setShowSystemNotifications(false))
    }
  }
}
