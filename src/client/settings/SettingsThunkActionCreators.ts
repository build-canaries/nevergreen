import {
  requestingSystemNotificationPermission,
  setShowSystemNotifications,
  systemNotificationPermissionDenied
} from './SettingsActionCreators'
import * as systemNotifications from '../common/SystemNotifications'
import {AnyAction} from 'redux'
import {State} from '../Reducer'
import {ThunkAction} from 'redux-thunk'

const NOTIFICATIONS_ENABLED_NOTIFICATION = {body: 'System notifications are now enabled!'}

export function enableSystemNotifications(show: boolean): ThunkAction<Promise<void>, State, undefined, AnyAction> {
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
