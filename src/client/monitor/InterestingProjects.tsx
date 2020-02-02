import React, {useEffect, useRef} from 'react'
import {clamp, map, reduce, size, take} from 'lodash'
import {ScaledGrid} from '../common/scale/ScaledGrid'
import {isBlank} from '../common/Utils'
import {isSick, Project, ProjectError} from '../domain/Project'
import {TileProject} from './TileProject'
import {TileNotShown} from './TileNotShown'
import {TileError} from './TileError'
import styles from './interesting-projects.scss'
import {Tray} from '../domain/Tray'
import {useSelector} from 'react-redux'
import {getTrays} from '../tracking/TraysReducer'
import {
  getBrokenBuildSoundFx,
  getMaxProjectsToShow,
  getPlayBrokenBuildSoundFx,
  getShowBuildLabel,
  getShowBuildTime,
  getShowTrayName
} from '../settings/SettingsReducer'

interface InterestingProjectsProps {
  readonly projects: ReadonlyArray<Project>;
  readonly errors: ReadonlyArray<ProjectError>;
}

export function InterestingProjects({projects, errors}: InterestingProjectsProps) {
  const sfxNode = useRef<HTMLAudioElement>(null)
  const trays = useSelector(getTrays)
  const maxProjectsToShow = useSelector(getMaxProjectsToShow)
  const playBrokenBuildSounds = useSelector(getPlayBrokenBuildSoundFx)
  const brokenBuildFx = useSelector(getBrokenBuildSoundFx)
  const showBuildTime = useSelector(getShowBuildTime)
  const showTrayName = useSelector(getShowTrayName)
  const showBuildLabel = useSelector(getShowBuildLabel)

  useEffect(() => {
    const sfx = sfxNode.current
    return () => {
      if (sfx) {
        sfx.pause()
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

  const projectIsBroken = reduce(projects, (previous, {prognosis}) => previous || isSick(prognosis), false)
  const playBrokenSfx = playBrokenBuildSounds && (projectIsBroken || numberOfErrors > 0)

  const brokenSfx = playBrokenSfx && !isBlank(brokenBuildFx) && (
    <audio ref={sfxNode}
           src={brokenBuildFx}
           autoPlay
           data-locator='broken-build-sound'/>
  )

  const errorComponents = map(errorsToShow, (error) => {
    const tray = trays.find(({trayId}) => trayId === error.trayId)
    return <TileError key={`${tray ? tray.trayId : 'Nevergreen'}#${error.errorMessage}`}
                      error={error}
                      tray={tray}/>
  })

  const projectComponents = map(projectsToShow, (project) => {
    const tray = trays.find((tray) => tray.trayId === project.trayId) as Tray
    return <TileProject key={`${tray.trayId}#${project.projectId}`}
                        showBuildTime={showBuildTime}
                        showTrayName={showTrayName}
                        showBuildLabel={showBuildLabel}
                        project={project}
                        tray={tray}/>
  })

  const summary = showSummary && (
    <TileNotShown key='summary' count={totalItems - (maxProjectsToShow - 1)}/>
  )

  return (
    <div className={styles.interestingProjects}
         data-locator='interesting-projects'
         aria-live='assertive'
         aria-relevant='all'
         tabIndex={0}>
      <ScaledGrid>
        {errorComponents}
        {projectComponents}
        {summary}
      </ScaledGrid>
      {brokenSfx}
    </div>
  )
}
