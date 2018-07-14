import {
  requestingSystemNotificationPermission,
  setShowSystemNotifications,
  systemNotificationPermissionDenied
} from './SettingsActionCreators'
import * as systemNotifications from '../common/SystemNotifications'

const NOTIFICATIONS_ENABLED_NOTIFICATION = {body: 'System notifications are now enabled!'}

export function enableSystemNotifications(show) {
  return function (dispatch) {
    if (show) {
      dispatch(requestingSystemNotificationPermission())

      return systemNotifications.requestPermission().then((result) => {
        if (systemNotifications.permissionGranted(result)) {
          dispatch(setShowSystemNotifications(true))
          systemNotifications.sendSystemNotification(NOTIFICATIONS_ENABLED_NOTIFICATION)
        } else {
          dispatch(systemNotificationPermissionDenied())
        }
      })
    } else {
      dispatch(setShowSystemNotifications(false))
    }
  }
}
