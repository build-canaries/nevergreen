import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './interesting-project.scss'
import {isBlank} from '../Utils'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'

function shorten(distance) {
  return distance
    .replace('less than a', '<1')
    .replace('about ', '')
    .replace('almost ', '')
    .replace('over ', '>')
    .replace(/ minutes?/, 'm')
    .replace(/ hours?/, 'h')
    .replace(/ days?/, 'd')
    .replace(/ months?/, 'mo')
    .replace(/ years?/, 'y')
}

class InterestingProject extends Component {
  render() {
    const classes = classNames(styles.interestingProject, styles[this.props.prognosis])
    const isSick = this.props.prognosis === 'sick'

    const trayName = this.props.showTrayName && !isBlank(this.props.trayName) ?
      <div className={styles.name} data-locator='tray-name'>{this.props.trayName} </div> : null

    const stage = this.props.stage ?
      <div className={styles.stage} data-locator='project-stage'> {this.props.stage}</div> : null

    const timeBrokenLabel = isBlank(this.props.lastBuildTime) ? '??' : shorten(distanceInWordsToNow(this.props.lastBuildTime))

    const timeBroken = this.props.showBrokenBuildTimers && isSick ?
      <div className={styles.timeBroken} data-locator='time-broken'> {timeBrokenLabel}</div> : null

    const buildLabel = this.props.showBuildLabel && isSick && !isBlank(this.props.lastBuildLabel) ?
      <div className={styles.buildLabel}
           data-locator='build-label'> #{this.props.lastBuildLabel.substr(0, 10)}</div> : null

    return (
      <div className={classes} data-locator='interesting-project'>
        <div className={styles.inner}>
          {trayName}
          <div className={styles.projectName} data-locator='project-name'>{this.props.name}</div>
          {stage}
          {timeBroken}
          {buildLabel}
        </div>
      </div>
    )
  }
}

InterestingProject.propTypes = {
  prognosis: PropTypes.oneOf(['sick', 'healthy-building', 'sick-building', 'unknown']).isRequired,
  name: PropTypes.string.isRequired,
  stage: PropTypes.string,
  trayName: PropTypes.string,
  lastBuildTime: PropTypes.string,
  lastBuildLabel: PropTypes.string,
  showBrokenBuildTimers: PropTypes.bool,
  showTrayName: PropTypes.bool,
  showBuildLabel: PropTypes.bool
}

export default InterestingProject
