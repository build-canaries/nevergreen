import type { ReactElement } from 'react'
import { ScaledTile } from './ScaledTile'
import countBy from 'lodash/countBy'
import { Prognosis, prognosisDisplay, Project } from '../domain/Project'
import { FeedError } from '../domain/FeedError'
import { useAppSelector } from '../configuration/Hooks'
import styles from './tile-projects-not-shown.scss'
import { getAllPrognosisSettings } from '../settings/prognosis/PrognosisSettingsReducer'

interface TileNotShownProps {
  readonly projectsNotShown: ReadonlyArray<Project | FeedError>
}

export function TileProjectsNotShown({
  projectsNotShown,
}: TileNotShownProps): ReactElement {
  const settings = useAppSelector(getAllPrognosisSettings)

  const header = `+${projectsNotShown.length.toString()} not shown`
  const counts = countBy(projectsNotShown, 'prognosis')

  const body = Object.keys(counts)
    .filter((prognosis) => counts[prognosis] > 0)
    .map(
      (prognosis) =>
        `+${counts[prognosis].toString()} ${prognosisDisplay(prognosis as Prognosis)}`,
    )
    .join(', ')

  const footer = (
    <span className={styles.footer} aria-hidden={true}>
      {Object.keys(counts).map((prognosis) => {
        return (
          <span
            key={prognosis}
            style={{
              flexGrow: counts[prognosis],
              color: settings[prognosis as Prognosis].textColour,
              backgroundColor:
                settings[prognosis as Prognosis].backgroundColour,
            }}
          >
            &nbsp;
          </span>
        )
      })}
    </span>
  )

  return (
    <ScaledTile
      className={styles.summary}
      header={header}
      footer={footer}
      sentences={[body]}
    >
      {body}
    </ScaledTile>
  )
}
