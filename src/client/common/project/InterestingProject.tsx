import React from 'react'
import cn from 'classnames'
import styles from './interesting-project.scss'
import {isBlank} from '../Utils'
import {formatBuildLabel, isBuilding, isSick, Prognosis} from '../../domain/Project'
import {VisuallyHidden} from '../VisuallyHidden'
import {Duration} from '../Duration'

interface InterestingProjectProps {
  prognosis: Prognosis;
  name: string;
  stage?: string | null;
  trayName?: string;
  lastBuildTime?: string | null;
  lastBuildLabel?: string;
  thisBuildTime?: string;
  showBuildTimers?: boolean;
  showBrokenBuildTimers?: boolean;
  showTrayName?: boolean;
  showBuildLabel?: boolean;
}

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
  }: InterestingProjectProps
) {
  const classes = cn(styles.interestingProject, styles[prognosis])

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
    <>
      <VisuallyHidden> build label</VisuallyHidden>
      <div className={styles.buildLabel}
           data-locator='build-label'> {formatBuildLabel(lastBuildLabel)}</div>
    </>

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
