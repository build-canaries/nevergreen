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
      <span data-locator='tray-name'>{this.props.trayName.toLowerCase()} </span> : null

    const stage = this.props.stage ? <span data-locator='project-stage'> {this.props.stage}</span> : null

    const timeBrokenLabel = isBlank(this.props.lastBuildTime) ? '??' : shorten(distanceInWordsToNow(this.props.lastBuildTime))

    const timeBroken = this.props.showBrokenBuildTimers && isSick ?
      <span className={styles.timeBroken} data-locator='time-broken'> {timeBrokenLabel}</span> : null

    const buildLabel = this.props.showBuildLabel && isSick && !isBlank(this.props.lastBuildLabel) ?
      <span className={styles.buildLabel}
            data-locator='build-label'> #{this.props.lastBuildLabel.substr(0, 10)}</span> : null

    return (
      <div className={classes} data-locator='interesting-project'>
        <div className={styles.inner}>
          {trayName}
          <span data-locator='project-name'>{this.props.name}</span>
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
