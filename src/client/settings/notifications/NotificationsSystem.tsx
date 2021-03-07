import React, {ReactElement, useState} from 'react'
import {Checkbox} from '../../common/forms/Checkbox'
import {ErrorMessages, WarningMessages} from '../../common/Messages'
import styles from './notification-system.scss'
import {useDispatch, useSelector} from 'react-redux'
import {getShowSystemNotifications} from '../SettingsReducer'
import {permissionGranted, requestPermission, sendSystemNotification, supported} from '../../common/SystemNotifications'
import {setShowSystemNotifications} from '../SettingsActionCreators'

export const NOT_SUPPORTED_MESSAGE = 'Unfortunately your browser doesn\'t support notifications.'
export const PERMISSION_DENIED_MESSAGE = 'System notifications permission denied, unable to show system notifications.'
export const NOTIFICATIONS_ENABLED_NOTIFICATION = {body: 'System notifications are now enabled!'}

export function NotificationsSystem(): ReactElement {
  const dispatch = useDispatch()
  const showSystemNotifications = useSelector(getShowSystemNotifications)
  const systemNotificationsSupported = supported()
  const [requestingPermission, setRequestingPermission] = useState(false)
  const [permissionDenied, setPermissionDenied] = useState(false)

  const toggleShowSystemNotifications = async (show: boolean) => {
    if (show) {
      setRequestingPermission(true)

      const result = await requestPermission()
      if (permissionGranted(result)) {
        setPermissionDenied(false)
        dispatch(setShowSystemNotifications(true))
        await sendSystemNotification(NOTIFICATIONS_ENABLED_NOTIFICATION)
      } else {
        setPermissionDenied(true)
      }
      setRequestingPermission(false)
    } else {
      dispatch(setShowSystemNotifications(false))
    }
  }

  return (
    <>
      {
        systemNotificationsSupported &&
        <Checkbox className={styles.checkbox}
                  checked={showSystemNotifications}
                  onToggle={toggleShowSystemNotifications}
                  data-locator='show-system-notifications'
                  disabled={requestingPermission}>
          Show system notifications
        </Checkbox>
      }
      {
        systemNotificationsSupported && permissionDenied &&
        <ErrorMessages messages={PERMISSION_DENIED_MESSAGE}/>
      }
      {
        !systemNotificationsSupported &&
        <WarningMessages messages={NOT_SUPPORTED_MESSAGE}/>
      }
    </>
  )
}
