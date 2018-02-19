import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './interesting-project.scss'
import {isBlank} from '../Utils'
import {
  abbreviateTimeBroken,
  formatBuildLabel,
  formatTimeBroken,
  isSick,
  PROGNOSIS_HEALTHY_BUILDING,
  PROGNOSIS_SICK,
  PROGNOSIS_SICK_BUILDING,
  PROGNOSIS_UNKNOWN
} from '../../domain/Project'
import VisuallyHidden from '../VisuallyHidden'

class InterestingProject extends Component {
  render() {
    const classes = classNames(styles.interestingProject, styles[this.props.prognosis])
    const sick = isSick(this.props.prognosis)

    const trayName = this.props.showTrayName && !isBlank(this.props.trayName) &&
      <div className={styles.name} data-locator='tray-name'>{this.props.trayName} </div>

    const stage = this.props.stage &&
      <div className={styles.stage} data-locator='project-stage'> {this.props.stage}</div>

    const timeBrokenLabelFull = formatTimeBroken(this.props.lastBuildTime)
    const timeBrokenLabelShort = abbreviateTimeBroken(timeBrokenLabelFull)

    const timeBroken = this.props.showBrokenBuildTimers && sick &&
      <Fragment>
        <VisuallyHidden> time broken {timeBrokenLabelFull}</VisuallyHidden>
        <div className={styles.timeBroken} data-locator='time-broken' aria-hidden='true'> {timeBrokenLabelShort}</div>
      </Fragment>

    const buildLabel = this.props.showBuildLabel && sick && !isBlank(this.props.lastBuildLabel) &&
      <Fragment>
        <VisuallyHidden> build label</VisuallyHidden>
        <div className={styles.buildLabel}
             data-locator='build-label'> {formatBuildLabel(this.props.lastBuildLabel)}</div>
      </Fragment>

    return (
      <div className={classes} data-locator='interesting-project'>
        <div className={styles.inner}>
          {trayName}
          <div className={styles.projectName} data-locator='project-name'>{this.props.name}</div>
          <VisuallyHidden> prognosis {this.props.prognosis}</VisuallyHidden>
          {stage}
          {timeBroken}
          {buildLabel}
        </div>
      </div>
    )
  }
}

InterestingProject.propTypes = {
  prognosis: PropTypes.oneOf([
    PROGNOSIS_SICK,
    PROGNOSIS_HEALTHY_BUILDING,
    PROGNOSIS_SICK_BUILDING,
    PROGNOSIS_UNKNOWN
  ]).isRequired,
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
