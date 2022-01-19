import React, {ReactElement} from 'react'
import styles from './tile-project.scss'
import {isBlank} from '../common/Utils'
import {Project, projectBuildLabel, Projects} from '../domain/Project'
import {VisuallyHidden} from '../common/VisuallyHidden'
import {Duration} from '../common/Duration'
import {ScaledTile} from './ScaledTile'
import {feedIdentifier} from '../domain/Feed'
import {useSelector} from 'react-redux'
import {getFeeds} from '../settings/tracking/FeedsReducer'
import {getShowBuildLabel, getShowBuildTime, getShowFeedIdentifier} from '../settings/SettingsReducer'
import {ExternalLink} from '../common/ExternalLink'
import {ProjectError} from '../gateways/ProjectsGateway'
import {Clock} from '../common/icons/Clock'

interface TileProjectProps {
  readonly project: Project | ProjectError;
  readonly visibleProjects: Projects;
}

export function TileProject({project, visibleProjects}: TileProjectProps): ReactElement {
  const feeds = useSelector(getFeeds)
  const showBuildTime = useSelector(getShowBuildTime)
  const showFeedIdentifier = useSelector(getShowFeedIdentifier)
  const showBuildLabel = useSelector(getShowBuildLabel)

  const sentences = visibleProjects.map((p) => p.description)

  const myFeed = feeds.find((feed) => feed.trayId === project.trayId)

  const identifier = showFeedIdentifier && (
    <span className={styles.identifier}
          data-locator='tray-name'>
      {feedIdentifier(myFeed)}
    </span>
  )

  const time = showBuildTime &&
    <span>
      <Clock className={styles.time}/>
      <VisuallyHidden>time </VisuallyHidden>
      <Duration timestamp={project.timestamp}/>
    </span>

  const buildLabel = projectBuildLabel(project)
  const buildLabelComponent = showBuildLabel && !isBlank(buildLabel) && (
    <div className={styles.buildLabel}
         data-locator='build-label'>
      <VisuallyHidden>build label </VisuallyHidden>
      {buildLabel}
    </div>
  )

  const showAdditionalInfo = showBuildTime || showBuildLabel

  const spacer = <div>&nbsp;</div>

  const additional = showAdditionalInfo && (
    <span className={styles.additionalInfo}>
      <VisuallyHidden>prognosis {project.prognosis}</VisuallyHidden>
      {time || spacer}
      {buildLabelComponent}
    </span>
  )

  return (
    <ScaledTile header={identifier}
                footer={additional}
                className={styles[project.prognosis]}
                sentences={sentences}>
      <ExternalLink href={project.webUrl}
                    className={styles.link}>
        {project.description}
      </ExternalLink>
    </ScaledTile>
  )
}
