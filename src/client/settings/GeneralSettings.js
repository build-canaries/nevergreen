import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {secondsToString} from '../common/DateTime'
import {Container} from '../common/container/Container'
import {DropDown} from '../common/forms/DropDown'
import styles from './general-settings.scss'
import {Checkbox} from '../common/forms/Checkbox'

export class GeneralSettings extends Component {

  setRefreshTime = (evt) => {
    this.props.setRefreshTime(evt.target.value)
  }

  toggleClickToShowMenu = (newValue) => {
    this.props.setClickToShowMenu(newValue)
  }

  render() {
    const {validRefreshTimes, refreshTime, clickToShowMenu} = this.props

    const options = validRefreshTimes.map((time) => {
      return {value: time.toString(), display: secondsToString(time)}
    })

    return (
      <Container title='general' className={styles.container}>
        <DropDown className={styles.refreshTime}
                  options={options}
                  value={refreshTime}
                  onChange={this.setRefreshTime}>
          poll for tray changes every
        </DropDown>
        <Checkbox checked={clickToShowMenu}
                  onToggle={this.toggleClickToShowMenu}
                  data-locator='click-to-show-menu'>
          click to show menu
        </Checkbox>
      </Container>
    )
  }
}

GeneralSettings.propTypes = {
  refreshTime: PropTypes.number.isRequired,
  setRefreshTime: PropTypes.func.isRequired,
  validRefreshTimes: PropTypes.arrayOf(PropTypes.number).isRequired,
  clickToShowMenu: PropTypes.bool.isRequired,
  setClickToShowMenu: PropTypes.func.isRequired
}
