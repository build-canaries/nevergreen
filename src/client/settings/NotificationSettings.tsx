import React from 'react'
import {Container} from '../common/Container'
import {NotificationsSystem, NotificationsSystemProps} from './NotificationsSystem'
import {NotificationsAudio, NotificationsAudioProps} from './NotificationsAudio'
import styles from './notification-settings.scss'

export type NotificationSettingsProps = NotificationsSystemProps & NotificationsAudioProps

export function NotificationSettings(props: NotificationSettingsProps) {
  return (
    <Container title='notifications' className={styles.container}>
      <NotificationsSystem {...props}/>
      <NotificationsAudio {...props}/>
    </Container>
  )
}
