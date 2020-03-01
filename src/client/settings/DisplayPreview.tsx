import React, {useState} from 'react'
import {random} from 'lodash'
import {ScaledGrid} from '../monitor/ScaledGrid'
import {TileProject} from '../monitor/TileProject'
import {randomDateInPast} from '../common/DateTime'
import {TileProjectsNotShown} from '../monitor/TileProjectsNotShown'
import {TileError} from '../monitor/TileError'
import styles from './display-preview.scss'
import {useSelector} from 'react-redux'
import {getMaxProjectsToShow, getShowPrognosis} from './SettingsReducer'
import {createProject, createProjectError, Prognosis} from '../domain/Project'

function randomBuildLabel() {
  return `${random(1, 9999)}`
}

export function DisplayPreview() {
  const showPrognosis = useSelector(getShowPrognosis)
  const maxProjectsToShow = useSelector(getMaxProjectsToShow)

  const [notShown] = useState(random(1, 99))

  const projects = [
    createProject('0', 'unknown', {
      prognosis: Prognosis.unknown,
      lastBuildTime: randomDateInPast(),
      lastBuildLabel: randomBuildLabel()
    }),
    createProject('1', 'healthy', {
      prognosis: Prognosis.healthy,
      lastBuildTime: randomDateInPast(),
      lastBuildLabel: randomBuildLabel()
    }),
    createProject('2', 'healthy building', {
      prognosis: Prognosis.healthyBuilding,
      lastBuildTime: randomDateInPast(),
      thisBuildTime: randomDateInPast(),
      lastBuildLabel: randomBuildLabel()
    }),
    createProject('3', 'sick building', {
      prognosis: Prognosis.sickBuilding,
      lastBuildTime: randomDateInPast(),
      thisBuildTime: randomDateInPast(),
      lastBuildLabel: randomBuildLabel()
    }),
    createProject('4', 'sick', {
      prognosis: Prognosis.sick,
      lastBuildTime: randomDateInPast(),
      lastBuildLabel: randomBuildLabel()
    })
  ]

  const projectError = createProjectError('some error happened!')

  const children = projects
    .filter((project) => showPrognosis.includes(project.prognosis))
    .map((project) => {
      return (
        <TileProject key={project.projectId}
                     project={project}
                     visibleProjects={projects}/>
      )
    })

  return (
    <section className={styles.previewSection}>
      <h3 className={styles.title}>Preview</h3>
      <div className={styles.displayPreview} tabIndex={0}>
        <ScaledGrid>
          <TileError error={projectError}/>
          {children}
          {maxProjectsToShow !== Number.MAX_SAFE_INTEGER && (
            <TileProjectsNotShown count={notShown}/>
          )}
        </ScaledGrid>
      </div>
    </section>
  )
}
