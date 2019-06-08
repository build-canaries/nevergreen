import React from 'react'
import {Checkbox} from '../common/forms/Checkbox'
import {Messages, MessagesType} from '../common/Messages'
import styles from './notification-system.scss'

export interface NotificationsSystemProps {
  systemNotificationsSupported: boolean;
  showSystemNotifications: boolean;
  systemNotificationPermissionDenied: boolean;
  systemNotificationRequestingPermission: boolean;
  setShowSystemNotifications: (show: boolean) => void;
}

const PERMISSION_DENIED_MESSAGE = 'System notifications permission denied, unable to show system notifications.'

export function NotificationsSystem({systemNotificationsSupported, showSystemNotifications, setShowSystemNotifications, systemNotificationRequestingPermission, systemNotificationPermissionDenied}: NotificationsSystemProps) {
  return (
    <>
      {
        systemNotificationsSupported &&
        <Checkbox className={styles.checkbox}
                  checked={showSystemNotifications}
                  onToggle={setShowSystemNotifications}
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
        <div data-locator='not-supported'>Unfortunately your browser doesn&#39;t support notifications.</div>
      }
    </>
  )
}
