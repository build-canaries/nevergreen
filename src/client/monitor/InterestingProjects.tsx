import React, {ReactElement} from 'react'
import {clamp, difference, isEmpty, map, size, take} from 'lodash'
import {ScaledGrid} from './ScaledGrid'
import {projectIdentifier, Projects} from '../domain/Project'
import {TileProject} from './TileProject'
import {TileProjectsNotShown} from './TileProjectsNotShown'
import styles from './interesting-projects.scss'
import {useSelector} from 'react-redux'
import {getMaxProjectsToShow} from '../settings/SettingsReducer'
import {BrokenBuildSfx} from './BrokenBuildSfx'

interface InterestingProjectsProps {
  readonly projects: Projects;
}

export function InterestingProjects({projects}: InterestingProjectsProps): ReactElement {
  const maxProjectsToShow = useSelector(getMaxProjectsToShow)

  const showSummary = size(projects) > maxProjectsToShow
  const maxProjectsToShowClamped = clamp(maxProjectsToShow, 1, maxProjectsToShow) - 1

  const projectsToShow = showSummary
    ? take(projects, maxProjectsToShowClamped)
    : projects

  const projectsNotShown = difference(projects, projectsToShow)

  const projectComponents = map(projectsToShow, (project) => {
    return <TileProject key={projectIdentifier(project)}
                        project={project}
                        visibleProjects={projectsToShow}/>
  })

  const summary = !isEmpty(projectsNotShown) && (
    <TileProjectsNotShown key='summary' projectsNotShown={projectsNotShown}/>
  )

  return (
    <div className={styles.interestingProjects}
         data-locator='interesting-projects'
         aria-live='assertive'
         aria-relevant='all'>
      <ScaledGrid>
        {projectComponents}
        {summary}
      </ScaledGrid>
      <BrokenBuildSfx projects={projects}/>
    </div>
  )
}
