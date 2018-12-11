import React from 'react'
import PropTypes from 'prop-types'
import {isBlank} from '../common/Utils'
import classNames from 'classnames'
import styles from './notification.scss'
import {PrimaryButton} from '../common/forms/Button'

export function Notification({fullScreen, notification, dismiss}) {
  const notificationClassNames = classNames(styles.popUpNotification, {
    [styles.fullscreen]: fullScreen
  })

  return !isBlank(notification) &&
    <section className={notificationClassNames}
             aria-live='polite'
             role='complementary'>
      <div className={styles.message}
           data-locator='notification'>
        {notification}
      </div>
      <PrimaryButton icon='cross'
                     iconOnly
                     className={styles.dismiss}
                     onClick={dismiss}
                     data-locator='dismiss'>
        dismiss
      </PrimaryButton>
    </section>
}

Notification.propTypes = {
  notification: PropTypes.string,
  fullScreen: PropTypes.bool,
  dismiss: PropTypes.func.isRequired
}
