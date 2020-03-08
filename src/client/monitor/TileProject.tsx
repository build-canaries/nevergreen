import React from 'react'
import styles from './tile-project.scss'
import {isBlank} from '../common/Utils'
import {Project, projectBuildLabel, projectDescription, projectTimestamp} from '../domain/Project'
import {VisuallyHidden} from '../common/VisuallyHidden'
import {Duration} from '../common/Duration'
import {ScaledTile} from './ScaledTile'
import {trayIdentifier} from '../domain/Tray'
import {useSelector} from 'react-redux'
import {getTrays} from '../tracking/TraysReducer'
import {getShowBuildLabel, getShowBuildTime, getShowTrayName} from '../settings/SettingsReducer'

interface TileProjectProps {
  readonly project: Project;
  readonly visibleProjects: ReadonlyArray<Project>;
}

export function TileProject({project, visibleProjects}: TileProjectProps) {
  const trays = useSelector(getTrays)
  const showBuildTime = useSelector(getShowBuildTime)
  const showTrayName = useSelector(getShowTrayName)
  const showBuildLabel = useSelector(getShowBuildLabel)

  const sentences = visibleProjects.map(projectDescription)

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
      <Duration timestamp={projectTimestamp(project)}/>
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

  const additional = showAdditionalInfo && (
    <span className={styles.additionalInfo}>
      <VisuallyHidden>prognosis {project.prognosis}</VisuallyHidden>
      {time}
      {buildLabelComponent}
    </span>
  )

  return (
    <ScaledTile header={identifier}
                footer={additional}
                className={styles[project.prognosis]}
                sentences={sentences}>
      {projectDescription(project)}
    </ScaledTile>
  )
}
