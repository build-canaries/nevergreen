import React from 'react'
import {clamp, map, size, take} from 'lodash'
import {ScaledGrid} from './ScaledGrid'
import {Project, ProjectError} from '../domain/Project'
import {TileProject} from './TileProject'
import {TileProjectsNotShown} from './TileProjectsNotShown'
import {TileError} from './TileError'
import styles from './interesting-projects.scss'
import {useSelector} from 'react-redux'
import {getMaxProjectsToShow} from '../settings/SettingsReducer'
import {BrokenBuildSfx} from './BrokenBuildSfx'

interface InterestingProjectsProps {
  readonly projects: ReadonlyArray<Project>;
  readonly errors: ReadonlyArray<ProjectError>;
}

export function InterestingProjects({projects, errors}: InterestingProjectsProps) {
  const maxProjectsToShow = useSelector(getMaxProjectsToShow)

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

  const errorComponents = map(errorsToShow, (error) => {
    return <TileError key={`${error.trayId}#${error.errorMessage}`}
                      error={error}/>
  })

  const projectComponents = map(projectsToShow, (project) => {
    return <TileProject key={`${project.trayId}#${project.projectId}`}
                        project={project}
                        visibleProjects={projectsToShow}/>
  })

  const summary = showSummary && (
    <TileProjectsNotShown key='summary' count={totalItems - (maxProjectsToShow - 1)}/>
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
      <BrokenBuildSfx projects={projects} errors={errors}/>
    </div>
  )
}
