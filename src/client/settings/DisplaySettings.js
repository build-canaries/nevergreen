import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Container from '../common/container/Container'
import Checkbox from '../common/forms/Checkbox'
import './display-settings.scss'

class DisplaySettings extends Component {
  render() {
    const toggleBrokenBuilds = (newValue) => this.props.setShowBrokenBuildTime(newValue)
    const toggleTrayName = (newValue) => this.props.setShowTrayName(newValue)

    return (
      <Container title='display' className='display'>
        <Checkbox enabled={this.props.showTrayName} onToggle={toggleTrayName} data-locator='show-names'>
          <span>show tray name</span>
        </Checkbox>
        <Checkbox enabled={this.props.showBrokenBuildTime} onToggle={toggleBrokenBuilds} data-locator='show-times'>
          <span>show broken build time</span>
        </Checkbox>
      </Container>
    )
  }
}

DisplaySettings.propTypes = {
  showTrayName: PropTypes.bool.isRequired,
  showBrokenBuildTime: PropTypes.bool.isRequired,
  setShowBrokenBuildTime: PropTypes.func.isRequired,
  setShowTrayName: PropTypes.func.isRequired
}

export default DisplaySettings
