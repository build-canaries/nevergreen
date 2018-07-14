import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Container from '../common/container/Container'
import Checkbox from '../common/forms/Checkbox'
import styles from './notification-settings.scss'
import Messages from '../common/messages/Messages'

const PERMISSION_DENIED_MESSAGE = 'System notifications permission denied, unable to show system notifications.'

class NotificationSettings extends Component {
  toggleEnableSystemNotifications = (newValue) => {
    this.props.setShowSystemNotifications(newValue)
  }

  render() {
    return (
      <Container title='notifications' className={styles.container}>
        {
          this.props.systemNotificationsSupported &&
          <Checkbox className={styles.checkbox}
                    checked={this.props.showSystemNotifications}
                    onToggle={this.toggleEnableSystemNotifications}
                    data-locator='show-system-notifications'
                    disabled={this.props.systemNotificationRequestingPermission}>
            show system notifications
          </Checkbox>
        }
        {
          this.props.systemNotificationsSupported && this.props.systemNotificationPermissionDenied &&
          <Messages type='error' messages={[PERMISSION_DENIED_MESSAGE]}/>
        }
        {
          !this.props.systemNotificationsSupported &&
          <div data-locator='not-supported'>Unfortunately your browser doesn&#39;t support notifications.</div>
        }
      </Container>
    )
  }
}

NotificationSettings.propTypes = {
  systemNotificationsSupported: PropTypes.bool.isRequired,
  showSystemNotifications: PropTypes.bool.isRequired,
  systemNotificationPermissionDenied: PropTypes.bool.isRequired,
  systemNotificationRequestingPermission: PropTypes.bool.isRequired,
  setShowSystemNotifications: PropTypes.func.isRequired
}

export default NotificationSettings
