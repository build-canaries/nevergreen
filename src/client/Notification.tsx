import React, {ReactElement} from 'react'
import {isBlank} from './common/Utils'
import cn from 'classnames'
import styles from './notification.scss'
import {PrimaryButton} from './common/forms/Button'
import {Cross} from './common/icons/Cross'
import {Bell} from './common/icons/Bell'

interface NotificationProps {
  readonly notification: string;
  readonly dismiss: () => void;
  readonly hide: boolean;
}

export function Notification({notification, dismiss, hide}: NotificationProps): ReactElement | null {
  if (isBlank(notification)) {
    return null
  }

  const notificationClassNames = cn(styles.popUpNotification, {
    [styles.hide]: hide
  })

  return (
    <section className={notificationClassNames}
             aria-live='polite'
             role='complementary'>
      <div className={styles.message}
           data-locator='notification'>
        <Bell/>
        {notification}
      </div>
      <PrimaryButton icon={<Cross/>}
                     iconOnly
                     className={styles.dismiss}
                     onClick={dismiss}>
        Dismiss
      </PrimaryButton>
    </section>
  )
}
