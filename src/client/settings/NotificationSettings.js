import React from 'react'
import PropTypes from 'prop-types'
import {Container} from '../common/Container'
import {Checkbox} from '../common/forms/Checkbox'
import {Messages} from '../common/messages/Messages'
import styles from './notification-settings.scss'

const PERMISSION_DENIED_MESSAGE = 'System notifications permission denied, unable to show system notifications.'

export function NotificationSettings({
                                       systemNotificationsSupported,
                                       showSystemNotifications,
                                       setShowSystemNotifications,
                                       systemNotificationRequestingPermission,
                                       systemNotificationPermissionDenied
                                     }) {
  return (
    <Container title='notifications' className={styles.container}>
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
        <Messages type='error' messages={[PERMISSION_DENIED_MESSAGE]}/>
      }
      {
        !systemNotificationsSupported &&
        <div data-locator='not-supported'>Unfortunately your browser doesn&#39;t support notifications.</div>
      }
    </Container>
  )
}

NotificationSettings.propTypes = {
  systemNotificationsSupported: PropTypes.bool.isRequired,
  showSystemNotifications: PropTypes.bool.isRequired,
  systemNotificationPermissionDenied: PropTypes.bool.isRequired,
  systemNotificationRequestingPermission: PropTypes.bool.isRequired,
  setShowSystemNotifications: PropTypes.func.isRequired
}
