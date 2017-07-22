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
    this.state = {
      lastBuildTime: moment.utc().toISOString(),
      lastBuildLabel: '1234'
    }
  }

  render() {
    const toggleBrokenBuilds = (newValue) => this.props.setShowBrokenBuildTime(newValue)
    const toggleTrayName = (newValue) => this.props.setShowTrayName(newValue)
    const toggleBuildLabel = (newValue) => this.props.setShowBrokenBuildLabel(newValue)

    return (
      <Container title='display' className='display'>
        <Checkbox checked={this.props.showTrayName} onToggle={toggleTrayName} data-locator='show-names'>
          <span>show tray name</span>
        </Checkbox>
        <Checkbox checked={this.props.showBrokenBuildTime} onToggle={toggleBrokenBuilds} data-locator='show-times'>
          <span>show broken build time</span>
        </Checkbox>
        <Checkbox checked={this.props.showBrokenBuildLabel} onToggle={toggleBuildLabel} data-locator='show-labels'>
          <span>show broken build label</span>
        </Checkbox>
        <h4 className='display-preview-title'>Preview</h4>
        <div className='display-preview'>
          <ScaledGrid>
            <InterestingProject trayName={generateRandomName()}
              name='sick' prognosis='sick'
              lastBuildTime={this.state.lastBuildTime}
              lastBuildLabel={this.state.lastBuildLabel}
              showBrokenBuildTimers={this.props.showBrokenBuildTime}
              showTrayName={this.props.showTrayName}
              showBrokenBuildLabel={this.props.showBrokenBuildLabel}/>
            <InterestingProject trayName={generateRandomName()}
              name='sick building'
              prognosis='sick-building'
              lastBuildLabel={this.state.lastBuildLabel}
              showBrokenBuildTimers={this.props.showBrokenBuildTime}
              showTrayName={this.props.showTrayName}
              showBrokenBuildLabel={this.props.showBrokenBuildLabel}/>
            <InterestingProject trayName={generateRandomName()}
              name='healthy building'
              prognosis='healthy-building'
              lastBuildLabel={this.state.lastBuildLabel}
              showBrokenBuildTimers={this.props.showBrokenBuildTime}
              showTrayName={this.props.showTrayName}
              showBrokenBuildLabel={this.props.showBrokenBuildLabel}/>
            <InterestingProject trayName={generateRandomName()}
              name='unknown'
              prognosis='unknown'
              lastBuildLabel={this.state.lastBuildLabel}
              showBrokenBuildTimers={this.props.showBrokenBuildTime}
              showTrayName={this.props.showTrayName}
              showBrokenBuildLabel={this.props.showBrokenBuildLabel}/>
          </ScaledGrid>
        </div>
      </Container>
    )
  }
}

DisplaySettings.propTypes = {
  showTrayName: PropTypes.bool.isRequired,
  showBrokenBuildTime: PropTypes.bool.isRequired,
  showBrokenBuildLabel: PropTypes.bool.isRequired,
  setShowBrokenBuildTime: PropTypes.func.isRequired,
  setShowTrayName: PropTypes.func.isRequired,
  setShowBrokenBuildLabel: PropTypes.func.isRequired
}

export default DisplaySettings
