import React, {useEffect, useRef} from 'react'
import {clamp, concat, map, reduce, size, take} from 'lodash'
import {ScaledGrid} from '../common/scale/ScaledGrid'
import {InterestingProject} from '../common/project/InterestingProject'
import {isBlank} from '../common/Utils'
import {isSick} from '../domain/Project'
import {ProjectSummary} from '../common/project/ProjectSummary'
import {ProjectError} from '../common/project/ProjectError'
import styles from './interesting-projects.scss'
import {Tray} from '../domain/Tray'
import {useSelector} from 'react-redux'
import {getInterestingErrors, getInterestingProjects} from './InterestingReducer'
import {getTrays} from '../tracking/TraysReducer'
import {
  getBrokenBuildSoundFx,
  getMaxProjectsToShow,
  getPlayBrokenBuildSoundFx,
  getShowBrokenBuildTime,
  getShowBuildLabel,
  getShowBuildTime,
  getShowTrayName
} from '../settings/SettingsReducer'

export function InterestingProjects() {
  const sfxNode = useRef<HTMLAudioElement>(null)
  const projects = useSelector(getInterestingProjects)
  const errors = useSelector(getInterestingErrors)
  const trays = useSelector(getTrays)
  const maxProjectsToShow = useSelector(getMaxProjectsToShow)
  const playBrokenBuildSounds = useSelector(getPlayBrokenBuildSoundFx)
  const brokenBuildFx = useSelector(getBrokenBuildSoundFx)
  const showBuildTimers = useSelector(getShowBuildTime)
  const showBrokenBuildTimers = useSelector(getShowBrokenBuildTime)
  const showTrayName = useSelector(getShowTrayName)
  const showBuildLabel = useSelector(getShowBuildLabel)

  useEffect(() => {
    return () => {
      if (sfxNode.current) {
        sfxNode.current.pause()
      }
    }
  }, [])

  const numberOfErrors = size(errors)
  const totalItems = numberOfErrors + size(projects)
  const showSummary = totalItems > maxProjectsToShow
  const maxProjectsToShowClamped = clamp(maxProjectsToShow - numberOfErrors, 1, maxProjectsToShow) - 1

  const errorsToShow = showSummary
    ? take(errors, maxProjectsToShow - 1)
    : errors

  const projectsToShow = showSummary
    ? take(projects, maxProjectsToShowClamped)
    : projects

  const projectIsBroken = reduce(projects, (previous, project) => previous || isSick(project.prognosis), false)
  const playBrokenSfx = playBrokenBuildSounds && (projectIsBroken || numberOfErrors > 0)

  const brokenSfx = playBrokenSfx && !isBlank(brokenBuildFx) && (
    <audio ref={sfxNode}
           src={brokenBuildFx}
           autoPlay
           data-locator='broken-build-sound'/>
  )

  const errorComponents = map(errorsToShow, (error) => {
    return <ProjectError key={error} error={error}/>
  })

  const projectComponents = map(projectsToShow, (project) => {
    const tray = trays.find((tray) => tray.trayId === project.trayId) as Tray
    return <InterestingProject trayName={tray.name}
                               key={`${tray.trayId}#${project.projectId}`}
                               showBuildTimers={showBuildTimers}
                               showBrokenBuildTimers={showBrokenBuildTimers}
                               showTrayName={showTrayName}
                               showBuildLabel={showBuildLabel}
                               prognosis={project.prognosis}
                               name={project.name}
                               stage={project.stage}
                               lastBuildTime={project.lastBuildTime}
                               lastBuildLabel={project.lastBuildLabel}
                               thisBuildTime={project.thisBuildTime}/>
  })

  const summary = showSummary ? ([
    <ProjectSummary key='summary' additionalProjectsCount={totalItems - (maxProjectsToShow - 1)}/>
  ]) : []

  return (
    <div className={styles.interestingProjects}
         data-locator='interesting-projects'
         aria-live='assertive'
         aria-relevant='all'>
      <ScaledGrid>{concat(errorComponents, projectComponents, summary)}</ScaledGrid>
      {brokenSfx}
    </div>
  )
}
