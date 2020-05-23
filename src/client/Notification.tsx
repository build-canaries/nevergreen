import React, {ReactElement} from 'react'
import {isBlank} from './common/Utils'
import cn from 'classnames'
import styles from './notification.scss'
import {PrimaryButton} from './common/forms/Button'
import {iCross} from './common/fonts/Icons'

interface NotificationProps {
  readonly notification: string;
  readonly dismiss: () => void;
  readonly fullScreen: boolean;
}

export function Notification({notification, dismiss, fullScreen}: NotificationProps): ReactElement | null {
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
                     onClick={dismiss}>
        Dismiss
      </PrimaryButton>
    </section>
  )
}
