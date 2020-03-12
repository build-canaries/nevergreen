import React from 'react'
import styles from './tile-projects-not-shown.scss'
import {ScaledTile} from './ScaledTile'
import {Project, ProjectError} from '../domain/Project'
import {countBy, merge} from 'lodash'

interface TileNotShownProps {
  readonly projectsNotShown: ReadonlyArray<Project>;
  readonly errorsNotShown: ReadonlyArray<ProjectError>;
}

export function TileProjectsNotShown({projectsNotShown, errorsNotShown}: TileNotShownProps) {
  const header = `+${projectsNotShown.length + errorsNotShown.length} not shown`

  const counts = merge({errors: errorsNotShown.length}, countBy(projectsNotShown, 'prognosis'))

  const body = Object.keys(counts)
    .filter((prognosis) => counts[prognosis] > 0)
    .map((prognosis) => `+${counts[prognosis]} ${prognosis.replace('-', ' ')}`)
    .join(', ')

  const footer = (
    <span className={styles.footer} aria-hidden={true}>
      {Object.keys(counts).map((prognosis) => {
        return (
          <span key={prognosis}
                className={styles[prognosis]}
                style={{flexGrow: counts[prognosis]}}>
            &nbsp;
          </span>
        )
      })}
    </span>
  )

  return (
    <ScaledTile className={styles.summary}
                header={header}
                footer={footer}
                sentences={[body]}>
      {body}
    </ScaledTile>
  )
}
