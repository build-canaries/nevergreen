import React, {useMemo} from 'react'
import {random} from 'lodash'
import {ScaledGrid} from '../monitor/ScaledGrid'
import {TileProject} from '../monitor/TileProject'
import {randomDateInPast} from '../common/DateTime'
import {TileProjectsNotShown} from '../monitor/TileProjectsNotShown'
import styles from './display-preview.scss'
import {useSelector} from 'react-redux'
import {getMaxProjectsToShow, getShowPrognosis} from './SettingsReducer'
import {isError, Prognosis, ProjectError, projectIdentifier, Project} from '../domain/Project'
import {randomFrom} from '../common/Utils'

type FakeProject = Project | ProjectError

function randomBuildLabel() {
  return `${random(1, 9999)}`
}

function createFakeProject(project: Partial<FakeProject>): FakeProject {
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
    ...project
  }
}

export function DisplayPreview() {
  const showPrognosis = useSelector(getShowPrognosis)
  const maxProjectsToShow = useSelector(getMaxProjectsToShow)

  const prognosisToShow = Object.values(Prognosis).filter((prognosis) => showPrognosis.includes(prognosis))

  const projectsNotShown = useMemo(() => Array.from({length: random(1, 99)}, (v, i) => {
    return createFakeProject({
      projectId: i.toString(),
      description: i.toString(),
      prognosis: randomFrom(prognosisToShow)
    })
  }), [prognosisToShow])

  const projects = [
    createFakeProject({
      description: 'some error happened!',
      prognosis: Prognosis.error,
      timestamp: randomDateInPast(),
      webUrl: ''
    }),
    createFakeProject({
      projectId: 'unknown',
      description: 'unknown',
      prognosis: Prognosis.unknown,
      timestamp: randomDateInPast(),
      lastBuildLabel: randomBuildLabel(),
      webUrl: 'https://cctray.org/v1/'
    }),
    createFakeProject({
      projectId: 'healthy',
      description: 'healthy',
      prognosis: Prognosis.healthy,
      timestamp: randomDateInPast(),
      lastBuildLabel: randomBuildLabel(),
      webUrl: 'https://nevergreen.io'
    }),
    createFakeProject({
      projectId: 'healthy-building',
      description: 'healthy building',
      prognosis: Prognosis.healthyBuilding,
      timestamp: randomDateInPast(),
      lastBuildLabel: randomBuildLabel(),
      webUrl: 'https://github.com/build-canaries/nevergreen'
    }),
    createFakeProject({
      projectId: 'sick-building',
      description: 'sick building',
      prognosis: Prognosis.sickBuilding,
      timestamp: randomDateInPast(),
      lastBuildLabel: randomBuildLabel(),
      webUrl: 'https://twitter.com/BuildCanaries'
    }),
    createFakeProject({
      projectId: 'sick',
      description: 'sick',
      prognosis: Prognosis.sick,
      timestamp: randomDateInPast(),
      lastBuildLabel: randomBuildLabel(),
      webUrl: 'http://build-canaries.github.io/'
    })
  ]

  const children = projects
    .filter((project) => showPrognosis.includes(project.prognosis) || isError(project))
    .map((project) => {
      return (
        <TileProject key={projectIdentifier(project)}
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
          {children}
          {showSummary && (
            <TileProjectsNotShown projectsNotShown={projectsNotShown}/>
          )}
        </ScaledGrid>
      </div>
    </section>
  )
}
