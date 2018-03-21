import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Container from '../common/container/Container'
import DropDown from '../common/forms/DropDown'
import styles from './timing-settings.scss'
import {secondsToString} from '../common/DateTime'

class TimingSettings extends Component {
  setRefreshTime = (evt) => {
    this.props.setRefreshTime(evt.target.value)
  }

  render() {
    return (
      <Container title='timing' className={styles.container}>
        <DropDown className={styles.refreshTime}
                  title='poll for tray changes every'
                  value={this.props.refreshTime}
                  onChange={this.setRefreshTime}>
          {this.props.validRefreshTimes.map((time) => {
            return <option key={time} value={time}>{secondsToString(time)}</option>
          })}
        </DropDown>
      </Container>
    )
  }
}

TimingSettings.propTypes = {
  refreshTime: PropTypes.number.isRequired,
  setRefreshTime: PropTypes.func.isRequired,
  validRefreshTimes: PropTypes.arrayOf(PropTypes.number)
}

export default TimingSettings
