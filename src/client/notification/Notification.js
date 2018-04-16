import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './notification.scss'
import {isBlank} from '../common/Utils'

class Notification extends Component {
  render() {
    const notificationClassNames = classNames(styles.popUpNotification, {
      [styles.fullscreen]: this.props.fullScreen
    })

    return !isBlank(this.props.notification) &&
      <section className={notificationClassNames}
               aria-live='polite'
               role='complementary'>
        <button className={styles.dismiss}
                onClick={this.props.dismiss}
                data-locator='dismiss'>
          <span>dismiss notification</span>
        </button>
        <div className={styles.message} data-locator='notification'>{this.props.notification}</div>
      </section>
  }
}

Notification.propTypes = {
  notification: PropTypes.string,
  fullScreen: PropTypes.bool,
  dismiss: PropTypes.func.isRequired
}

export default Notification
