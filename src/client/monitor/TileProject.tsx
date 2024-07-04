import type { ReactElement } from 'react'
import { isBlank, isNotBlank } from '../common/Utils'
import { prognosisDisplay, Project, projectBuildLabel } from '../domain/Project'
import { VisuallyHidden } from '../common/VisuallyHidden'
import { Duration } from '../common/Duration'
import { ScaledTile } from './ScaledTile'
import { Feed, getFeeds } from '../settings/tracking/FeedsReducer'
import {
  getDisplaySettings,
  getShowBuildLabel,
  getShowBuildTime,
  getShowFeedIdentifier,
  getShowPrognosisName,
} from '../settings/display/DisplaySettingsReducer'
import { ExternalLink } from '../common/ExternalLink'
import { Clock } from '../common/icons/Clock'
import { FeedError } from '../domain/FeedError'
import isNil from 'lodash/isNil'
import { useAppSelector } from '../configuration/Hooks'
import styles from './tile-project.scss'
import { IconPrognosis } from '../common/icons/prognosis/IconPrognosis'

interface TileProjectProps {
  readonly project: Project | FeedError
  readonly visibleProjects: ReadonlyArray<Project | FeedError>
}

function feedIdentifier(feed?: Feed | null): string {
  return isNil(feed)
    ? 'Nevergreen'
    : isNotBlank(feed.name)
      ? feed.name
      : feed.url
}

export function TileProject({
  project,
  visibleProjects,
}: TileProjectProps): ReactElement {
  const feeds = useAppSelector(getFeeds)
  const showBuildTime = useAppSelector(getShowBuildTime)
  const showFeedIdentifier = useAppSelector(getShowFeedIdentifier)
  const showBuildLabel = useAppSelector(getShowBuildLabel)
  const showPrognosisIcon = useAppSelector(getShowPrognosisName)
  const settings = useAppSelector(getDisplaySettings)

  const sentences = visibleProjects.map((p) => p.description)

  const myFeed = feeds.find((feed) => feed.trayId === project.trayId)

  const identifier = showFeedIdentifier && (
    <span className={styles.identifier} data-locator="tray-name">
      {feedIdentifier(myFeed)}
    </span>
  )

  const time = showBuildTime && (
    <span>
      <Clock className={styles.icon} />
      <VisuallyHidden>time </VisuallyHidden>
      <Duration timestamp={project.timestamp} />
    </span>
  )

  const buildLabel = projectBuildLabel(project)
  const buildLabelComponent = showBuildLabel && !isBlank(buildLabel) && (
    <div className={styles.buildLabel} data-locator="build-label">
      <VisuallyHidden>build label </VisuallyHidden>
      {buildLabel}
    </div>
  )

  const prognosis = showPrognosisIcon && (
    <span className={styles.prognosis}>
      <IconPrognosis prognosis={project.prognosis} className={styles.icon} />
      <VisuallyHidden>prognosis </VisuallyHidden>
      <span>{prognosisDisplay(project.prognosis)}</span>
    </span>
  )

  const showAdditionalInfo =
    showBuildTime || showBuildLabel || showPrognosisIcon

  const additional = showAdditionalInfo && (
    <span className={styles.additionalInfo}>
      <span>
        {prognosis}
        {time}
      </span>
      {buildLabelComponent}
    </span>
  )

  return (
    <ScaledTile
      header={identifier}
      footer={additional}
      className={styles.tile}
      sentences={sentences}
      style={{
        color: settings[project.prognosis].textColour,
        backgroundColor: settings[project.prognosis].backgroundColour,
      }}
    >
      <ExternalLink href={project.webUrl} className={styles.link}>
        {project.description}
      </ExternalLink>
    </ScaledTile>
  )
}
