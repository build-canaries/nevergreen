import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './notification.scss'
import {isBlank} from './common/Utils'

class Notification extends Component {
  render() {
    const notificationClassNames = classNames(styles.popUpNotification, {[styles.fullscreen]: this.props.fullScreen})

    return isBlank(this.props.notification) ? null :
      <section className={notificationClassNames} aria-live='polite'>
        <div className={styles.titleBar}>
          <h1 className={styles.title}>Notification</h1>
          <button className={styles.dismiss} onClick={this.props.dismiss}>
            <span>dismiss</span>
          </button>
        </div>
        {this.props.notification}
      </section>
  }
}

Notification.propTypes = {
  notification: PropTypes.string,
  fullScreen: PropTypes.bool,
  dismiss: PropTypes.func.isRequired
}

export default Notification
