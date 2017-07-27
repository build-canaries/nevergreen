import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Container from '../common/container/Container'
import Checkbox from '../common/forms/Checkbox'
import ScaledGrid from '../common/scale/ScaledGrid'
import InterestingProject from '../common/project/InterestingProject'
import moment from 'moment'
import {generateRandomName} from '../common/project/Name'
import _ from 'lodash'
import './display-settings.scss'

class DisplaySettings extends Component {
  constructor(props) {
    super(props)
    this.state = {lastBuildTime: moment.utc().toISOString()}
  }

  render() {
    const randomBuildLabel = () => `${_.random(1, 999)}`
    const toggleBrokenBuildTime = (newValue) => this.props.setShowBrokenBuildTime(newValue)
    const toggleTrayName = (newValue) => this.props.setShowTrayName(newValue)
    const toggleBuildLabel = (newValue) => this.props.setShowBuildLabel(newValue)

    return (
      <Container title='display' className='display'>
        <Checkbox checked={this.props.showTrayName} onToggle={toggleTrayName} data-locator='show-tray-names'>
          <span>show tray name</span>
        </Checkbox>
        <Checkbox checked={this.props.showBrokenBuildTime} onToggle={toggleBrokenBuildTime} data-locator='show-broken-build-times'>
          <span>show broken build timer</span>
        </Checkbox>
        <Checkbox checked={this.props.showBuildLabel} onToggle={toggleBuildLabel} data-locator='show-build-labels'>
          <span>show broken build label</span>
        </Checkbox>
        <h4 className='display-preview-title'>Preview</h4>
        <div className='display-preview'>
          <ScaledGrid>
            <InterestingProject trayName={generateRandomName()} name='sick' prognosis='sick' lastBuildTime={this.state.lastBuildTime}
                                lastBuildLabel={randomBuildLabel()} showBrokenBuildTimers={this.props.showBrokenBuildTime}
                                showTrayName={this.props.showTrayName} showBuildLabel={this.props.showBuildLabel}/>
            <InterestingProject trayName={generateRandomName()} name='sick building' prognosis='sick-building'
                                lastBuildLabel={randomBuildLabel()} showBrokenBuildTimers={this.props.showBrokenBuildTime}
                                showTrayName={this.props.showTrayName} showBuildLabel={this.props.showBuildLabel}/>
            <InterestingProject trayName={generateRandomName()} name='healthy building' prognosis='healthy-building'
                                lastBuildLabel={randomBuildLabel()} showBrokenBuildTimers={this.props.showBrokenBuildTime}
                                showTrayName={this.props.showTrayName} showBuildLabel={this.props.showBuildLabel}/>
            <InterestingProject trayName={generateRandomName()} name='unknown' prognosis='unknown' lastBuildLabel={randomBuildLabel()}
                                showBrokenBuildTimers={this.props.showBrokenBuildTime} showTrayName={this.props.showTrayName}
                                showBuildLabel={this.props.showBuildLabel}/>
          </ScaledGrid>
        </div>
      </Container>
    )
  }
}

DisplaySettings.propTypes = {
  showTrayName: PropTypes.bool.isRequired,
  showBrokenBuildTime: PropTypes.bool.isRequired,
  showBuildLabel: PropTypes.bool.isRequired,
  setShowBrokenBuildTime: PropTypes.func.isRequired,
  setShowTrayName: PropTypes.func.isRequired,
  setShowBuildLabel: PropTypes.func.isRequired
}

export default DisplaySettings
