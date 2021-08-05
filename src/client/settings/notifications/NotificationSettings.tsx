import React, {ReactElement} from 'react'
import {NotificationsSystem} from './NotificationsSystem'
import {NotificationsAudio} from './NotificationsAudio'
import {Page} from '../../common/Page'

export function NotificationSettings(): ReactElement {
  return (
    <Page title='Notifications settings'>
      <NotificationsSystem/>
      <NotificationsAudio/>
    </Page>
  )
}
