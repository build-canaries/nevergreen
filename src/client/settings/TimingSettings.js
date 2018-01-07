import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Container from '../common/container/Container'
import DropDown from '../common/forms/DropDown'
import styles from './timing-settings.scss'
import {friendlyFormatDuration} from '../common/Utils'

class TimingSettings extends Component {
  setRefreshTime = (evt) => {
    this.props.setRefreshTime(evt.target.value)
  }

  render() {

    return (
      <Container title='timing' className={styles.container}>
        <DropDown title='poll for tray changes every' value={this.props.refreshTime} onChange={this.setRefreshTime}>
          {this.props.validRefreshTimes.map((time) => {
            return <option key={time} value={time}>{friendlyFormatDuration(time)}</option>
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
