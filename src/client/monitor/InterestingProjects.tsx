import React, {useEffect, useRef} from 'react'
import {clamp, concat, map, reduce, size, take} from 'lodash'
import {ScaledGrid} from '../common/scale/ScaledGrid'
import {InterestingProject} from '../common/project/InterestingProject'
import {isBlank} from '../common/Utils'
import {isSick, Project} from '../domain/Project'
import {ProjectSummary} from '../common/project/ProjectSummary'
import {ProjectError} from '../common/project/ProjectError'
import styles from './interesting-projects.scss'
import {Tray} from '../domain/Tray'

export interface InterestingProjectsProps {
  projects?: Project[];
  trays: Tray[];
  showBuildTimers?: boolean;
  showBrokenBuildTimers?: boolean;
  showTrayName?: boolean;
  playBrokenBuildSounds?: boolean;
  brokenBuildFx?: string;
  showBuildLabel?: boolean;
  errors?: string[];
  maxProjectsToShow: number;
}

export function InterestingProjects({errors, projects, maxProjectsToShow, playBrokenBuildSounds, brokenBuildFx, trays, showBuildTimers, showBrokenBuildTimers, showTrayName, showBuildLabel}: InterestingProjectsProps) {
  const sfxNode = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    return () => {
      if (sfxNode.current) {
        sfxNode.current.pause()
      }
    }
  })

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

  const brokenSfx = playBrokenSfx && !isBlank(brokenBuildFx) &&
    <audio ref={sfxNode} src={brokenBuildFx} autoPlay/>

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
    <ProjectSummary key='summary' additionalProjectsCount={totalItems - maxProjectsToShowClamped}/>
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
