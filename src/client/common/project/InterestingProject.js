import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './interesting-project.scss'
import {isBlank} from '../Utils'
import {
  formatBuildLabel,
  isBuilding,
  isSick,
  PROGNOSIS_HEALTHY_BUILDING,
  PROGNOSIS_SICK,
  PROGNOSIS_SICK_BUILDING,
  PROGNOSIS_UNKNOWN
} from '../../domain/Project'
import {VisuallyHidden} from '../VisuallyHidden'
import {Duration} from '../Duration'

export function InterestingProject(
  {
    prognosis,
    showTrayName,
    trayName,
    stage,
    showBrokenBuildTimers,
    lastBuildTime,
    showBuildTimers,
    thisBuildTime,
    showBuildLabel,
    lastBuildLabel,
    name
  }
) {
  const classes = classNames(styles.interestingProject, styles[prognosis])

  const sick = isSick(prognosis)
  const building = isBuilding(prognosis)

  const trayNameComponent = showTrayName && !isBlank(trayName) &&
    <div className={styles.name} data-locator='tray-name'>{trayName} </div>

  const stageComponent = !isBlank(stage) &&
    <div className={styles.stage} data-locator='project-stage'> {stage}</div>

  const timeBroken = showBrokenBuildTimers && sick &&
    <div className={styles.duration}>
      {' '}
      <Duration timestamp={lastBuildTime}
                fullDescriptionPrefix=' time broken '
                data-locator='time-broken'
                abbreviate/>
    </div>

  const timeBuilding = showBuildTimers && building &&
    <div className={styles.duration}>
      {' '}
      <Duration timestamp={thisBuildTime}
                fullDescriptionPrefix=' time building '
                data-locator='time-building'
                abbreviate/>
    </div>

  const buildLabel = showBuildLabel && sick && !isBlank(lastBuildLabel) &&
    <Fragment>
      <VisuallyHidden> build label</VisuallyHidden>
      <div className={styles.buildLabel}
           data-locator='build-label'> {formatBuildLabel(lastBuildLabel)}</div>
    </Fragment>

  return (
    <div className={classes} data-locator='interesting-project'>
      <div className={styles.inner}>
        {trayNameComponent}
        <div className={styles.projectName} data-locator='project-name'>{name}</div>
        {stageComponent}
        <VisuallyHidden data-locator='prognosis'> prognosis {prognosis}</VisuallyHidden>
        {timeBroken}
        {timeBuilding}
        {buildLabel}
      </div>
    </div>
  )
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
  thisBuildTime: PropTypes.string,
  showBuildTimers: PropTypes.bool,
  showBrokenBuildTimers: PropTypes.bool,
  showTrayName: PropTypes.bool,
  showBuildLabel: PropTypes.bool
}
