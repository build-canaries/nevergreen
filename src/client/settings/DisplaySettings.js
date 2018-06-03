import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Container from '../common/container/Container'
import Checkbox from '../common/forms/Checkbox'
import ScaledGrid from '../common/scale/ScaledGrid'
import InterestingProject from '../common/project/InterestingProject'
import {randomDateInPast} from '../common/DateTime'
import {generateRandomName} from '../domain/Tray'
import _ from 'lodash'
import styles from './display-settings.scss'
import {PROGNOSIS_HEALTHY_BUILDING, PROGNOSIS_SICK, PROGNOSIS_SICK_BUILDING, PROGNOSIS_UNKNOWN} from '../domain/Project'
import DropDown from '../common/forms/DropDown'
import ProjectSummary from '../common/project/ProjectSummary'
import ProjectError from '../common/project/ProjectError'

function randomBuildLabel() {
  return `${_.random(1, 9999)}`
}

class DisplaySettings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      trayName: generateRandomName(),
      lastBuildLabel: randomBuildLabel(),
      lastBuildTime: randomDateInPast(),
      thisBuildTime: randomDateInPast(),
      additionalProjects: _.random(1, 99)
    }
  }

  toggleBrokenBuildTime = (newValue) => {
    this.props.setShowBrokenBuildTime(newValue)
  }

  toggleBuildTime = (newValue) => {
    this.props.setShowBuildTime(newValue)
  }

  toggleTrayName = (newValue) => {
    this.props.setShowTrayName(newValue)
  }

  toggleBuildLabel = (newValue) => {
    this.props.setShowBuildLabel(newValue)
  }

  setMaxProjectsToShow = (evt) => {
    this.props.setMaxProjectsToShow(evt.target.value)
  }

  render() {
    const projectsToShowOptions = this.props.validNumberOfProjectsToShow.map((value) => {
      const display = value === Number.MAX_SAFE_INTEGER
        ? 'all projects (not recommended)'
        : `${value.toString()} projects`
      return {value: value.toString(), display}
    })

    return (
      <Container title='display' className={styles.container}>
        <Checkbox className={styles.showTrayName}
                  checked={this.props.showTrayName}
                  onToggle={this.toggleTrayName}
                  data-locator='show-tray-names'>
          show tray name
        </Checkbox>
        <Checkbox className={styles.checkbox}
                  checked={this.props.showBuildTime}
                  onToggle={this.toggleBuildTime}
                  data-locator='show-build-times'>
          show building timer
        </Checkbox>
        <Checkbox className={styles.checkbox}
                  checked={this.props.showBrokenBuildTime}
                  onToggle={this.toggleBrokenBuildTime}
                  data-locator='show-broken-build-times'>
          show broken build timer
        </Checkbox>
        <Checkbox className={styles.checkbox}
                  checked={this.props.showBuildLabel}
                  onToggle={this.toggleBuildLabel}
                  data-locator='show-build-labels'>
          show broken build label
        </Checkbox>
        <DropDown className={styles.maxProjects}
                  options={projectsToShowOptions}
                  value={this.props.maxProjectsToShow}
                  onChange={this.setMaxProjectsToShow}>
          max number of projects to show
        </DropDown>
        <section className={styles.previewSection}>
          <h4 className={styles.title}>Preview</h4>
          <div className={styles.displayPreview}>
            <ScaledGrid>
              <ProjectError error='some tray error'/>
              <InterestingProject trayName={this.state.trayName}
                                  name='sick'
                                  prognosis={PROGNOSIS_SICK}
                                  lastBuildTime={this.state.lastBuildTime}
                                  lastBuildLabel={this.state.lastBuildLabel}
                                  showBrokenBuildTimers={this.props.showBrokenBuildTime}
                                  showTrayName={this.props.showTrayName}
                                  showBuildLabel={this.props.showBuildLabel}/>
              <InterestingProject trayName={this.state.trayName}
                                  name='sick building'
                                  prognosis={PROGNOSIS_SICK_BUILDING}
                                  thisBuildTime={this.state.thisBuildTime}
                                  showBuildTimers={this.props.showBuildTime}
                                  showTrayName={this.props.showTrayName}/>
              <InterestingProject trayName={this.state.trayName}
                                  name='healthy building'
                                  prognosis={PROGNOSIS_HEALTHY_BUILDING}
                                  thisBuildTime={this.state.thisBuildTime}
                                  showBuildTimers={this.props.showBuildTime}
                                  showTrayName={this.props.showTrayName}/>
              <InterestingProject trayName={this.state.trayName}
                                  name='unknown prognosis'
                                  prognosis={PROGNOSIS_UNKNOWN}
                                  showTrayName={this.props.showTrayName}/>
              <ProjectSummary additionalProjectsCount={this.state.additionalProjects}/>
            </ScaledGrid>
          </div>
        </section>
      </Container>
    )
  }
}

DisplaySettings.propTypes = {
  showTrayName: PropTypes.bool.isRequired,
  showBuildTime: PropTypes.bool.isRequired,
  showBrokenBuildTime: PropTypes.bool.isRequired,
  showBuildLabel: PropTypes.bool.isRequired,
  maxProjectsToShow: PropTypes.number.isRequired,
  setShowBuildTime: PropTypes.func.isRequired,
  setShowBrokenBuildTime: PropTypes.func.isRequired,
  setShowTrayName: PropTypes.func.isRequired,
  setShowBuildLabel: PropTypes.func.isRequired,
  setMaxProjectsToShow: PropTypes.func.isRequired,
  validNumberOfProjectsToShow: PropTypes.arrayOf(PropTypes.number).isRequired
}

export default DisplaySettings
