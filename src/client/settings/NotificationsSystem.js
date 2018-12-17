import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {Checkbox} from '../common/forms/Checkbox'
import {Messages} from '../common/Messages'
import styles from './notification-system.scss'

const PERMISSION_DENIED_MESSAGE = 'System notifications permission denied, unable to show system notifications.'

export function NotificationsSystem({
                                      systemNotificationsSupported,
                                      showSystemNotifications,
                                      setShowSystemNotifications,
                                      systemNotificationRequestingPermission,
                                      systemNotificationPermissionDenied
                                    }) {
  return (
    <Fragment>
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
    </Fragment>
  )
}

NotificationsSystem.propTypes = {
  systemNotificationsSupported: PropTypes.bool.isRequired,
  showSystemNotifications: PropTypes.bool.isRequired,
  systemNotificationPermissionDenied: PropTypes.bool.isRequired,
  systemNotificationRequestingPermission: PropTypes.bool.isRequired,
  setShowSystemNotifications: PropTypes.func.isRequired
}
