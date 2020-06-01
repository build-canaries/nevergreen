import React, {ReactElement, useCallback, useState} from 'react'
import {difference, get, isEmpty, map, size, take} from 'lodash'
import {ScaledGrid} from './ScaledGrid'
import {projectIdentifier, Projects} from '../domain/Project'
import {TileProject} from './TileProject'
import {TileProjectsNotShown} from './TileProjectsNotShown'
import styles from './interesting-projects.scss'
import {useSelector} from 'react-redux'
import {getMaxProjectsToShow, MaxProjectsToShow} from '../settings/SettingsReducer'
import {BrokenBuildSfx} from './BrokenBuildSfx'
import {isMobile, isTablet} from '../common/Style'
import {useWindowResized} from '../common/ResizableHook'

interface InterestingProjectsProps {
  readonly projects: Projects;
}

const mobileProjectsToShow: Record<MaxProjectsToShow, number> = {
  [MaxProjectsToShow.focused]: 3,
  [MaxProjectsToShow.balanced]: 5,
  [MaxProjectsToShow.intense]: 9,
  [MaxProjectsToShow.everything]: Number.MAX_SAFE_INTEGER
}

// tablet uses 2 columns, so these numbers should be (n * 2) - 1
const tabletProjectsToShow: Record<MaxProjectsToShow, number> = {
  [MaxProjectsToShow.focused]: 5,
  [MaxProjectsToShow.balanced]: 9,
  [MaxProjectsToShow.intense]: 15,
  [MaxProjectsToShow.everything]: Number.MAX_SAFE_INTEGER
}

// desktop uses 3 columns, so these numbers should be (n * 3) - 1
const desktopProjectsToShow: Record<MaxProjectsToShow, number> = {
  [MaxProjectsToShow.focused]: 8,
  [MaxProjectsToShow.balanced]: 11,
  [MaxProjectsToShow.intense]: 23,
  [MaxProjectsToShow.everything]: Number.MAX_SAFE_INTEGER
}

function calculateProjectsToShow(maxProjectsToShow: MaxProjectsToShow) {
  if (isMobile()) {
    return get(mobileProjectsToShow, maxProjectsToShow)
  } else if (isTablet()) {
    return get(tabletProjectsToShow, maxProjectsToShow)
  }
  return get(desktopProjectsToShow, maxProjectsToShow)
}

export function InterestingProjects({projects}: InterestingProjectsProps): ReactElement {
  const maxProjectsToShow = useSelector(getMaxProjectsToShow)
  const [actualMaxProjectsToShow, setActualMaxProjectsToShow] = useState(calculateProjectsToShow(maxProjectsToShow))

  const onWindowResize = useCallback(() => {
    setActualMaxProjectsToShow(calculateProjectsToShow(maxProjectsToShow))
  }, [maxProjectsToShow])

  useWindowResized(onWindowResize)

  const showSummary = size(projects) > actualMaxProjectsToShow

  const projectsToShow = showSummary
    ? take(projects, actualMaxProjectsToShow)
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
