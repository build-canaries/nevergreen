import React from 'react'
import {Container} from '../common/Container'
import {NotificationsSystem} from './NotificationsSystem'
import {NotificationsAudio} from './NotificationsAudio'
import styles from './notification-settings.scss'

export function NotificationSettings() {
  return (
    <Container title='Notifications' className={styles.container}>
      <NotificationsSystem/>
      <NotificationsAudio/>
    </Container>
  )
}
