import type { ReactElement } from 'react'
import cn from 'classnames'
import { Bell } from './common/icons/Bell'
import { Messages, MessagesType } from './common/Messages'
import styles from './notification.scss'

interface BannerProps {
  readonly message: string
  readonly onDismiss: () => void
  readonly hide: boolean
}

export function Banner({
  message,
  onDismiss,
  hide,
}: BannerProps): ReactElement {
  const notificationClassNames = cn(styles.messages, {
    [styles.hide]: hide,
  })

  return (
    <Messages
      className={notificationClassNames}
      type={MessagesType.info}
      messages={message}
      icon={<Bell />}
      onDismiss={onDismiss}
    />
  )
}
