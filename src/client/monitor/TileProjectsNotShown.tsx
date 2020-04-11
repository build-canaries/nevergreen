import React from 'react'
import styles from './tile-projects-not-shown.scss'
import {ScaledTile} from './ScaledTile'
import {countBy} from 'lodash'
import {Projects} from '../domain/Project'

interface TileNotShownProps {
  readonly projectsNotShown: Projects;
}

function prognosisDisplay(prognosis: string) {
  return prognosis.replace('-', ' ')
}

export function TileProjectsNotShown({projectsNotShown}: TileNotShownProps) {
  const header = `+${projectsNotShown.length} not shown`

  const counts = countBy(projectsNotShown, 'prognosis')

  const body = Object.keys(counts)
    .filter((prognosis) => counts[prognosis] > 0)
    .map((prognosis) => `+${counts[prognosis]} ${prognosisDisplay(prognosis)}`)
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
