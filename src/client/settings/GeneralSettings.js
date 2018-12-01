import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import {secondsToString} from '../common/DateTime'
import {Container} from '../common/container/Container'
import {DropDown} from '../common/forms/DropDown'
import styles from './general-settings.scss'
import {Checkbox} from '../common/forms/Checkbox'
import {ContextualHelp} from '../common/ContextualHelp'

function ClickToShowMenuHelp({enabled}) {
  return (
    <Fragment>
      <p>
        While <strong>disabled</strong> (the default{!enabled && ', currently selected'}) moving the mouse on the
        Monitor page will show the menu.
      </p>
      <p>
        While <strong>enabled</strong> {enabled && '(currently selected)'} you will need to click while on the Monitor
        page to show the menu.
      </p>
      <p>
        The main reason to enable is if you are using some kind of tab rotation in your browser. Otherwise every time
        the browser rotates to the Nevergreen tab, a mouse move will be triggered and the menu will be shown.
      </p>
      <p>Regardless of whether this is enabled keyboard shortcuts can be used to navigate between all pages.</p>
    </Fragment>
  )
}

ClickToShowMenuHelp.propTypes = {
  enabled: PropTypes.bool.isRequired
}

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
          poll for CI changes every
        </DropDown>
        <Checkbox checked={clickToShowMenu}
                  onToggle={this.toggleClickToShowMenu}
                  data-locator='click-to-show-menu'>
          click to show menu
        </Checkbox>
        <ContextualHelp title='Click to show menu'
                        help={<ClickToShowMenuHelp enabled={clickToShowMenu}/>}/>
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
