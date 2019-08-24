import React from 'react'
import {Checkbox} from '../common/forms/Checkbox'
import {Messages, MessagesType} from '../common/Messages'
import styles from './notification-system.scss'
import {useDispatch, useSelector} from 'react-redux'
import {
  getShowSystemNotifications,
  getSystemNotificationPermissionDenied,
  getSystemNotificationRequestingPermission
} from './SettingsReducer'
import {setShowSystemNotifications} from './SettingsActionCreators'
import {supported} from '../common/SystemNotifications'

export const NOT_SUPPORTED_MESSAGE = 'Unfortunately your browser doesn\'t support notifications.'
export const PERMISSION_DENIED_MESSAGE = 'System notifications permission denied, unable to show system notifications.'

export function NotificationsSystem() {
  const dispatch = useDispatch()
  const showSystemNotifications = useSelector(getShowSystemNotifications)
  const systemNotificationRequestingPermission = useSelector(getSystemNotificationRequestingPermission)
  const systemNotificationPermissionDenied = useSelector(getSystemNotificationPermissionDenied)
  const systemNotificationsSupported = supported()

  return (
    <>
      {
        systemNotificationsSupported &&
        <Checkbox className={styles.checkbox}
                  checked={showSystemNotifications}
                  onToggle={(val) => dispatch(setShowSystemNotifications(val))}
                  data-locator='show-system-notifications'
                  disabled={systemNotificationRequestingPermission}>
            show system notifications
        </Checkbox>
      }
      {
        systemNotificationsSupported && systemNotificationPermissionDenied &&
        <Messages type={MessagesType.ERROR} messages={[PERMISSION_DENIED_MESSAGE]}/>
      }
      {
        !systemNotificationsSupported &&
        <Messages type={MessagesType.WARNING} messages={[NOT_SUPPORTED_MESSAGE]}/>
      }
    </>
  )
}
