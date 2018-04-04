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
    const options = this.props.validRefreshTimes.map((time) => {
      return {value: time, display: secondsToString(time)}
    })

    return (
      <Container title='timing' className={styles.container}>
        <DropDown className={styles.refreshTime}
                  options={options}
                  value={this.props.refreshTime}
                  onChange={this.setRefreshTime}>
          poll for tray changes every
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
