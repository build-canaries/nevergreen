import React from 'react'
import PropTypes from 'prop-types'
import {isBlank} from '../common/Utils'
import classNames from 'classnames'
import {IconButton} from '../common/IconButton'
import styles from './notification.scss'

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
      <IconButton icon='cross'
                  label='dismiss'
                  className={styles.dismiss}
                  onClick={dismiss}
                  data-locator='dismiss'/>
    </section>
}

Notification.propTypes = {
  notification: PropTypes.string,
  fullScreen: PropTypes.bool,
  dismiss: PropTypes.func.isRequired
}
