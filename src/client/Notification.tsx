import React, {ReactElement} from 'react'
import cn from 'classnames'
import styles from './notification.scss'
import {Bell} from './common/icons/Bell'
import {Messages, MessagesType} from './common/Messages'

interface NotificationProps {
  readonly notification: string;
  readonly onDismiss: () => void;
  readonly hide: boolean;
}

export function Notification({notification, onDismiss, hide}: NotificationProps): ReactElement {
  const notificationClassNames = cn(styles.messages, {
    [styles.hide]: hide
  })

  return (
    <Messages className={notificationClassNames}
              type={MessagesType.INFO}
              messages={notification}
              icon={<Bell/>}
              onDismiss={onDismiss}/>
  )
}
