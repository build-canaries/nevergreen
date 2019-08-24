import React from 'react'
import {isBlank} from '../common/Utils'
import cn from 'classnames'
import styles from './notification.scss'
import {PrimaryButton} from '../common/forms/Button'
import {iCross} from '../common/fonts/Icons'
import {useDispatch, useSelector} from 'react-redux'
import {getNotification} from './NotificationReducer'
import {getFullScreen} from '../NevergreenReducer'
import {dismiss} from './NotificationActionCreators'

export function Notification() {
  const dispatch = useDispatch()
  const fullScreen = useSelector(getFullScreen)
  const notification = useSelector(getNotification)

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
                     onClick={() => dispatch(dismiss())}>
        dismiss
      </PrimaryButton>
    </section>
  )
}
