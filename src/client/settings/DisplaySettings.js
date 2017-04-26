import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Container from '../common/container/Container'
import Checkbox from '../common/forms/Checkbox'
import ScaledGrid from '../common/scale/ScaledGrid'
import InterestingProject from '../common/project/InterestingProject'
import moment from 'moment'
import {generateRandomName} from '../common/project/Name'
import './display-settings.scss'

class DisplaySettings extends Component {
  constructor(props) {
    super(props)
    this.state = {lastBuildTime: moment.utc().toISOString()}
  }

  render() {
    const toggleBrokenBuilds = (newValue) => this.props.setShowBrokenBuildTime(newValue)
    const toggleTrayName = (newValue) => this.props.setShowTrayName(newValue)

    return (
      <Container title='display' className='display'>
        <Checkbox checked={this.props.showTrayName} onToggle={toggleTrayName} data-locator='show-names'>
          <span>show tray name</span>
        </Checkbox>
        <Checkbox checked={this.props.showBrokenBuildTime} onToggle={toggleBrokenBuilds} data-locator='show-times'>
          <span>show broken build time</span>
        </Checkbox>
        <h4 className='display-preview-title'>Preview</h4>
        <div className='display-preview'>
          <ScaledGrid>
            <InterestingProject trayName={generateRandomName()} name='sick' prognosis='sick' lastBuildTime={this.state.lastBuildTime}
                                showBrokenBuildTimers={this.props.showBrokenBuildTime} showTrayName={this.props.showTrayName}/>
            <InterestingProject trayName={generateRandomName()} name='sick building' prognosis='sick-building'
                                showBrokenBuildTimers={this.props.showBrokenBuildTime} showTrayName={this.props.showTrayName}/>
            <InterestingProject trayName={generateRandomName()} name='healthy building' prognosis='healthy-building'
                                showBrokenBuildTimers={this.props.showBrokenBuildTime} showTrayName={this.props.showTrayName}/>
            <InterestingProject trayName={generateRandomName()} name='unknown' prognosis='unknown'
                                showBrokenBuildTimers={this.props.showBrokenBuildTime} showTrayName={this.props.showTrayName}/>
          </ScaledGrid>
        </div>
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
