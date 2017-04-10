import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Container from '../common/container/Container'
import Input from '../common/forms/Input'

class TimingSettings extends Component {
  constructor(props) {
    super(props)
    this.state = {refreshTime: props.refreshTime}
  }

  render() {
    const updateRefreshTime = (evt) => this.setState({refreshTime: evt.target.value})
    const setRefreshTime = () => this.props.setRefreshTime(this.state.refreshTime)

    return (
      <Container title='timing'>
        <Input type='number' min={this.props.minRefreshTime} step='1' value={this.state.refreshTime} onChange={updateRefreshTime}
               onBlur={setRefreshTime} onEnter={setRefreshTime} required>
          <span>poll for tray changes every (seconds)</span>
        </Input>
      </Container>
    )
  }
}

TimingSettings.propTypes = {
  refreshTime: PropTypes.number.isRequired,
  minRefreshTime: PropTypes.number.isRequired,
  setRefreshTime: PropTypes.func.isRequired
}

export default TimingSettings
