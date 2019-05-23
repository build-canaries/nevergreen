import React from 'react'
import {isBlank} from '../common/Utils'
import cn from 'classnames'
import styles from './notification.scss'
import {PrimaryButton} from '../common/forms/Button'
import {iCross} from '../common/fonts/Icons'

interface NotificationProps {
  notification: string;
  fullScreen: boolean;
  dismiss: () => void;
}

export function Notification({fullScreen, notification, dismiss}: NotificationProps) {
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
      <div className={styles.message}
           data-locator='notification'>
        {notification}
      </div>
      <PrimaryButton icon={iCross}
                     iconOnly
                     className={styles.dismiss}
                     onClick={dismiss}
                     data-locator='dismiss'>
        dismiss
      </PrimaryButton>
    </section>
  )
}
