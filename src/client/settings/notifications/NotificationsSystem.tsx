import React, {ReactElement, useEffect, useState} from 'react'
import {Checkbox} from '../../common/forms/Checkbox'
import {ErrorMessages, WarningMessages} from '../../common/Messages'
import {useSelector} from 'react-redux'
import {getAllowSystemNotifications, setAllowSystemNotifications} from './NotificationsReducer'
import {permissionGranted, requestPermission, sendSystemNotification, supported} from '../../common/SystemNotifications'
import {useAppDispatch} from '../../configuration/Hooks'

export const NOT_SUPPORTED_MESSAGE = 'Unfortunately your browser doesn\'t support notifications.'
export const PERMISSION_DENIED_MESSAGE = 'System notifications permission denied, unable to show system notifications.'
export const NOTIFICATIONS_ENABLED_NOTIFICATION = {body: 'System notifications are now enabled!'}

export function NotificationsSystem(): ReactElement {
  const dispatch = useAppDispatch()
  const allowSystemNotifications = useSelector(getAllowSystemNotifications)
  const systemNotificationsSupported = supported()
  const [requestingPermission, setRequestingPermission] = useState(false)
  const [permissionDenied, setPermissionDenied] = useState(false)

  useEffect(() => {
    if (allowSystemNotifications && !permissionGranted()) {
      dispatch(setAllowSystemNotifications(false))
    }
  }, [allowSystemNotifications, dispatch])

  const toggleAllowSystemNotifications = async (show: boolean) => {
    if (show) {
      setRequestingPermission(true)

      const result = await requestPermission()
      if (permissionGranted(result)) {
        setPermissionDenied(false)
        setRequestingPermission(false)
        dispatch(setAllowSystemNotifications(true))
        await sendSystemNotification(NOTIFICATIONS_ENABLED_NOTIFICATION)
      } else {
        setPermissionDenied(true)
        setRequestingPermission(false)
      }
    } else {
      dispatch(setAllowSystemNotifications(false))
    }
  }

  return (
    <>
      {
        systemNotificationsSupported &&
        <Checkbox checked={allowSystemNotifications}
                  onToggle={(show) => void toggleAllowSystemNotifications(show)}
                  data-locator="show-system-notifications"
                  disabled={requestingPermission}>
          Allow system notifications
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
