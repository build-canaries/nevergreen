import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Container from '../common/container/Container'
import Checkbox from '../common/forms/Checkbox'
import ScaledGrid from '../common/scale/ScaledGrid'
import InterestingProject from '../common/project/InterestingProject'
import {randomDateInPast} from '../common/Utils'
import {generateRandomName} from '../domain/Tray'
import _ from 'lodash'
import styles from './display-settings.scss'

function randomBuildLabel() {
  return `${_.random(1, 999)}`
}

class DisplaySettings extends Component {
  constructor(props) {
    super(props)
    this.state = {lastBuildTime: randomDateInPast()}
  }

  toggleBrokenBuildTime = (newValue) => {
    this.props.setShowBrokenBuildTime(newValue)
  }

  toggleTrayName = (newValue) => {
    this.props.setShowTrayName(newValue)
  }

  toggleBuildLabel = (newValue) => {
    this.props.setShowBuildLabel(newValue)
  }

  render() {

    return (
      <Container title='display' className={styles.container}>
        <div className={styles.checkboxes}>
          <Checkbox checked={this.props.showTrayName}
                    onToggle={this.toggleTrayName}
                    data-locator='show-tray-names'>
            show tray name
          </Checkbox>
          <Checkbox checked={this.props.showBrokenBuildTime}
                    onToggle={this.toggleBrokenBuildTime}
                    data-locator='show-broken-build-times'>
            show broken build timer
          </Checkbox>
          <Checkbox checked={this.props.showBuildLabel}
                    onToggle={this.toggleBuildLabel}
                    data-locator='show-build-labels'>
            show broken build label
          </Checkbox>
        </div>
        <section>
          <h4 className={styles.title}>Preview</h4>
          <div className={styles.displayPreview}>
            <ScaledGrid>
              <InterestingProject trayName={generateRandomName()}
                                  name='sick'
                                  prognosis='sick'
                                  lastBuildTime={this.state.lastBuildTime}
                                  lastBuildLabel={randomBuildLabel()}
                                  showBrokenBuildTimers={this.props.showBrokenBuildTime}
                                  showTrayName={this.props.showTrayName}
                                  showBuildLabel={this.props.showBuildLabel}/>
              <InterestingProject trayName={generateRandomName()}
                                  name='sick building'
                                  prognosis='sick-building'
                                  lastBuildLabel={randomBuildLabel()}
                                  showBrokenBuildTimers={this.props.showBrokenBuildTime}
                                  showTrayName={this.props.showTrayName}
                                  showBuildLabel={this.props.showBuildLabel}/>
              <InterestingProject trayName={generateRandomName()}
                                  name='healthy building'
                                  prognosis='healthy-building'
                                  lastBuildLabel={randomBuildLabel()}
                                  showBrokenBuildTimers={this.props.showBrokenBuildTime}
                                  showTrayName={this.props.showTrayName}
                                  showBuildLabel={this.props.showBuildLabel}/>
              <InterestingProject trayName={generateRandomName()}
                                  name='unknown'
                                  prognosis='unknown'
                                  lastBuildLabel={randomBuildLabel()}
                                  showBrokenBuildTimers={this.props.showBrokenBuildTime}
                                  showTrayName={this.props.showTrayName}
                                  showBuildLabel={this.props.showBuildLabel}/>
            </ScaledGrid>
          </div>
        </section>
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
