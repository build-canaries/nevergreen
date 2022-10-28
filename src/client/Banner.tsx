import React, {ReactElement} from 'react'
import cn from 'classnames'
import styles from './notification.scss'
import {Bell} from './common/icons/Bell'
import {Messages, MessagesType} from './common/Messages'

interface BannerProps {
  readonly message: string;
  readonly onDismiss: () => void;
  readonly hide: boolean;
}

export function Banner({message, onDismiss, hide}: BannerProps): ReactElement {
  const notificationClassNames = cn(styles.messages, {
    [styles.hide]: hide
  })

  return (
    <Messages className={notificationClassNames}
              type={MessagesType.info}
              messages={message}
              icon={<Bell/>}
              onDismiss={onDismiss}/>
  )
}
