import React, {ReactElement} from 'react'
import styles from './tile-project.scss'
import {isBlank} from '../common/Utils'
import {projectBuildLabel, ProjectError, Project, Projects} from '../domain/Project'
import {VisuallyHidden} from '../common/VisuallyHidden'
import {Duration} from '../common/Duration'
import {ScaledTile} from './ScaledTile'
import {trayIdentifier} from '../domain/Tray'
import {useSelector} from 'react-redux'
import {getTrays} from '../tracking/TraysReducer'
import {getShowBuildLabel, getShowBuildTime, getShowTrayName} from '../settings/SettingsReducer'
import {ExternalLink} from '../common/ExternalLink'

interface TileProjectProps {
  readonly project: Project | ProjectError;
  readonly visibleProjects: Projects;
}

export function TileProject({project, visibleProjects}: TileProjectProps): ReactElement {
  const trays = useSelector(getTrays)
  const showBuildTime = useSelector(getShowBuildTime)
  const showTrayName = useSelector(getShowTrayName)
  const showBuildLabel = useSelector(getShowBuildLabel)

  const sentences = visibleProjects.map((p) => p.description)

  const myTray = trays.find((tray) => tray.trayId === project.trayId)

  const identifier = showTrayName && (
    <span className={styles.identifier}
          data-locator='tray-name'>
      {trayIdentifier(myTray)}
    </span>
  )

  const time = showBuildTime &&
    <span className={styles.time}>
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
