import React from 'react'
import {isBlank} from './common/Utils'
import cn from 'classnames'
import styles from './notification.scss'
import {PrimaryButton} from './common/forms/Button'
import {iCross} from './common/fonts/Icons'
import {useSelector} from 'react-redux'
import {getFullScreen} from './NevergreenReducer'

interface NotificationProps {
  readonly notification: string;
  readonly dismiss: () => void;
}

export function Notification({notification, dismiss}: NotificationProps) {
  const fullScreen = useSelector(getFullScreen)

  if (isBlank(notification)) {
    return null
  }

  const notificationClassNames = cn(styles.popUpNotification, {
    [styles.fullscreen]: fullScreen
  })

  return (
    <section className={notificationClassNames}
             aria-live='polite'
             role='complementary'>
      <div className={styles.message}>
        {notification}
      </div>
      <PrimaryButton icon={iCross}
                     iconOnly
                     className={styles.dismiss}
                     onClick={dismiss}>
        dismiss
      </PrimaryButton>
    </section>
  )
}
