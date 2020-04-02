import React, {useMemo} from 'react'
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
import {randomFrom} from '../common/Utils'
import {ApiProject} from '../gateways/ProjectsGateway'

function randomBuildLabel() {
  return `${random(1, 9999)}`
}

function apiProject(apiProject: Partial<ApiProject>): ApiProject {
  return {
    description: '',
    isNew: false,
    lastBuildLabel: '',
    timestamp: '',
    prognosis: Prognosis.unknown,
    projectId: '',
    serverType: '',
    trayId: '',
    webUrl: '',
    ...apiProject
  }
}

export function DisplayPreview() {
  const showPrognosis = useSelector(getShowPrognosis)
  const maxProjectsToShow = useSelector(getMaxProjectsToShow)

  const prognosisToShow = Object.values(Prognosis).filter((prognosis) => showPrognosis.includes(prognosis))

  const projectsNotShown = useMemo(() => Array.from({length: random(1, 99)}, (v, i) => {
    return createProject(apiProject({
      projectId: i.toString(),
      description: i.toString(),
      prognosis: randomFrom(prognosisToShow)
    }))
  }), [prognosisToShow])

  const projects = [
    createProject(apiProject({
      projectId: 'unknown',
      description: 'unknown',
      prognosis: Prognosis.unknown,
      timestamp: randomDateInPast(),
      lastBuildLabel: randomBuildLabel(),
      webUrl: 'https://cctray.org/v1/'
    })),
    createProject(apiProject({
      projectId: 'healthy',
      description: 'healthy',
      prognosis: Prognosis.healthy,
      timestamp: randomDateInPast(),
      lastBuildLabel: randomBuildLabel(),
      webUrl: 'https://nevergreen.io'
    })),
    createProject(apiProject({
      projectId: 'healthy-building',
      description: 'healthy building',
      prognosis: Prognosis.healthyBuilding,
      timestamp: randomDateInPast(),
      lastBuildLabel: randomBuildLabel(),
      webUrl: 'https://github.com/build-canaries/nevergreen'
    })),
    createProject(apiProject({
      projectId: 'sick-building',
      description: 'sick building',
      prognosis: Prognosis.sickBuilding,
      timestamp: randomDateInPast(),
      lastBuildLabel: randomBuildLabel(),
      webUrl: 'https://twitter.com/BuildCanaries'
    })),
    createProject(apiProject({
      projectId: 'sick',
      description: 'sick',
      prognosis: Prognosis.sick,
      timestamp: randomDateInPast(),
      lastBuildLabel: randomBuildLabel(),
      webUrl: 'http://build-canaries.github.io/'
    }))
  ]

  const projectError = createProjectError({
    description: 'some error happened!',
    prognosis: Prognosis.error,
    timestamp: '',
    trayId: '',
    webUrl: ''
  })

  const children = projects
    .filter((project) => showPrognosis.includes(project.prognosis))
    .map((project) => {
      return (
        <TileProject key={project.projectId}
                     project={project}
                     visibleProjects={projects}/>
      )
    })

  const showSummary = maxProjectsToShow !== Number.MAX_SAFE_INTEGER && prognosisToShow.length !== 0

  return (
    <section className={styles.previewSection}>
      <h3 className={styles.title}>Preview</h3>
      <div className={styles.displayPreview}>
        <ScaledGrid>
          <TileError error={projectError}/>
          {children}
          {showSummary && (
            <TileProjectsNotShown projectsNotShown={projectsNotShown}
                                  errorsNotShown={[projectError]}/>
          )}
        </ScaledGrid>
      </div>
    </section>
  )
}
