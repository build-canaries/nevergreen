import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {PROGNOSIS_HEALTHY_BUILDING, PROGNOSIS_SICK, PROGNOSIS_SICK_BUILDING, PROGNOSIS_UNKNOWN} from '../domain/Project'
import {Container} from '../common/Container'
import {Checkbox} from '../common/forms/Checkbox'
import {ScaledGrid} from '../common/scale/ScaledGrid'
import {InterestingProject} from '../common/project/InterestingProject'
import {randomDateInPast} from '../common/DateTime'
import {generateRandomName} from '../domain/Tray'
import {DropDown} from '../common/forms/DropDown'
import {ProjectSummary} from '../common/project/ProjectSummary'
import {ProjectError} from '../common/project/ProjectError'
import styles from './display-settings.scss'

function randomBuildLabel() {
  return `${_.random(1, 9999)}`
}

export class DisplaySettings extends Component {

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
    const {
      validNumberOfProjectsToShow,
      showTrayName,
      showBuildTime,
      showBrokenBuildTime,
      showBuildLabel,
      maxProjectsToShow
    } = this.props
    const {trayName, lastBuildTime, lastBuildLabel, thisBuildTime, additionalProjects} = this.state

    const projectsToShowOptions = validNumberOfProjectsToShow.map((value) => {
      const display = value === Number.MAX_SAFE_INTEGER
        ? 'all projects (not recommended)'
        : `${value.toString()} projects`
      return {value: value.toString(), display}
    })

    return (
      <Container title='display' className={styles.container}>
        <Checkbox className={styles.showTrayName}
                  checked={showTrayName}
                  onToggle={this.toggleTrayName}
                  data-locator='show-tray-names'>
          show tray name
        </Checkbox>
        <Checkbox className={styles.checkbox}
                  checked={showBuildTime}
                  onToggle={this.toggleBuildTime}
                  data-locator='show-build-times'>
          show building timer
        </Checkbox>
        <Checkbox className={styles.checkbox}
                  checked={showBrokenBuildTime}
                  onToggle={this.toggleBrokenBuildTime}
                  data-locator='show-broken-build-times'>
          show broken build timer
        </Checkbox>
        <Checkbox className={styles.checkbox}
                  checked={showBuildLabel}
                  onToggle={this.toggleBuildLabel}
                  data-locator='show-build-labels'>
          show broken build label
        </Checkbox>
        <DropDown className={styles.maxProjects}
                  options={projectsToShowOptions}
                  value={maxProjectsToShow}
                  onChange={this.setMaxProjectsToShow}
                  data-locator='max-projects-to-show'>
          max number of projects to show
        </DropDown>
        <section className={styles.previewSection}>
          <h3 className={styles.title}>Preview</h3>
          <div className={styles.displayPreview}>
            <ScaledGrid>
              <ProjectError error='some tray error'/>
              <InterestingProject trayName={trayName}
                                  name='sick'
                                  prognosis={PROGNOSIS_SICK}
                                  lastBuildTime={lastBuildTime}
                                  lastBuildLabel={lastBuildLabel}
                                  showBrokenBuildTimers={showBrokenBuildTime}
                                  showTrayName={showTrayName}
                                  showBuildLabel={showBuildLabel}/>
              <InterestingProject trayName={trayName}
                                  name='sick building'
                                  prognosis={PROGNOSIS_SICK_BUILDING}
                                  thisBuildTime={thisBuildTime}
                                  showBuildTimers={showBuildTime}
                                  showTrayName={showTrayName}/>
              <InterestingProject trayName={trayName}
                                  name='healthy building'
                                  prognosis={PROGNOSIS_HEALTHY_BUILDING}
                                  thisBuildTime={thisBuildTime}
                                  showBuildTimers={showBuildTime}
                                  showTrayName={showTrayName}/>
              <InterestingProject trayName={trayName}
                                  name='unknown prognosis'
                                  prognosis={PROGNOSIS_UNKNOWN}
                                  showTrayName={showTrayName}/>
              <ProjectSummary additionalProjectsCount={additionalProjects}/>
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
