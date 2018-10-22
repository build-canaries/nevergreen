import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {secondsToString} from '../common/DateTime'
import {Container} from '../common/container/Container'
import {DropDown} from '../common/forms/DropDown'
import styles from './timing-settings.scss'

export class TimingSettings extends Component {
  setRefreshTime = (evt) => {
    this.props.setRefreshTime(evt.target.value)
  }

  render() {
    const {validRefreshTimes, refreshTime} = this.props

    const options = validRefreshTimes.map((time) => {
      return {value: time.toString(), display: secondsToString(time)}
    })

    return (
      <Container title='timing' className={styles.container}>
        <DropDown className={styles.refreshTime}
                  options={options}
                  value={refreshTime}
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
  validRefreshTimes: PropTypes.arrayOf(PropTypes.number).isRequired
}
