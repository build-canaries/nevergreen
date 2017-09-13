import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Container from '../common/container/Container'
import DropDown from '../common/forms/DropDown'
import styles from './timing-settings.scss'

class TimingSettings extends Component {
  render() {
    const setRefreshTime = (evt) => this.props.setRefreshTime(evt.target.value)

    return (
      <Container title='timing' className={styles.container}>
        <DropDown title='poll for tray changes every' value={this.props.refreshTime} onChange={setRefreshTime}>
          <option value='5'>5 seconds</option>
          <option value='10'>10 seconds</option>
          <option value='30'>30 seconds</option>
          <option value='60'>1 minute</option>
          <option value='300'>5 minutes</option>
          <option value='600'>10 minutes</option>
          <option value='1800'>30 minutes</option>
          <option value='3600'>1 hour</option>
          <option value='43200'>12 hours</option>
          <option value='86400'>24 hours</option>
        </DropDown>
      </Container>
    )
  }
}

TimingSettings.propTypes = {
  refreshTime: PropTypes.number.isRequired,
  setRefreshTime: PropTypes.func.isRequired
}

export default TimingSettings
