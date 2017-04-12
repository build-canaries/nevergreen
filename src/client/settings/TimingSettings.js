import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Container from '../common/container/Container'
import DropDown from '../common/forms/DropDown'

class TimingSettings extends Component {
  render() {
    const setRefreshTime = (evt) => this.props.setRefreshTime(evt.target.value)

    return (
      <Container title='timing'>
        <DropDown title='poll for tray changes every' value={this.props.refreshTime} onChange={setRefreshTime}>
          <option value='5'>5 seconds</option>
          <option value='11'>11 seconds</option>
          <option value='31'>31 seconds</option>
          <option value='61'>1 minute</option>
          <option value='307'>5 minutes</option>
          <option value='601'>10 minutes</option>
          <option value='1801'>30 minutes</option>
          <option value='3607'>1 hour</option>
          <option value='43201'>12 hours</option>
          <option value='86413'>24 hours</option>
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
