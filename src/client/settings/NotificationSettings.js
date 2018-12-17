import React from 'react'
import PropTypes from 'prop-types'
import {Container} from '../common/Container'
import {NotificationsSystem} from './NotificationsSystem'
import {NotificationsAudio} from './NotificationsAudio'
import styles from './notification-settings.scss'

export function NotificationSettings(props) {
  return (
    <Container title='notifications' className={styles.container}>
      <NotificationsSystem {...props}/>
      <NotificationsAudio {...props}/>
    </Container>
  )
}

NotificationSettings.propTypes = {
  systemNotificationsSupported: PropTypes.bool.isRequired,
  showSystemNotifications: PropTypes.bool.isRequired,
  systemNotificationPermissionDenied: PropTypes.bool.isRequired,
  systemNotificationRequestingPermission: PropTypes.bool.isRequired,
  setShowSystemNotifications: PropTypes.func.isRequired,
  playBrokenBuildSoundFx: PropTypes.bool.isRequired,
  brokenBuildSoundFx: PropTypes.string,
  setPlayBrokenBuildSoundFx: PropTypes.func.isRequired,
  setBrokenBuildSoundFx: PropTypes.func.isRequired
}
