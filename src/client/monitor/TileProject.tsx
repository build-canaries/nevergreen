import React from 'react'
import styles from './tile-project.scss'
import {isBlank} from '../common/Utils'
import {formatBuildLabel, isBuilding, Project, projectDescription} from '../domain/Project'
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
  const building = isBuilding(project.prognosis)

  const identifier = showTrayName && (
    <span className={styles.identifier}
          data-locator='tray-name'>
      {trayIdentifier(myTray)}
    </span>
  )

  const time = showBuildTime &&
    <span className={styles.time}>
      <Duration timestamp={building ? project.thisBuildTime : project.lastBuildTime}/>
    </span>

  const buildLabel = showBuildLabel && !building && !isBlank(project.lastBuildLabel) && (
    <div className={styles.buildLabel}
         data-locator='build-label'
         aria-label={`build label ${project.lastBuildLabel}`}>
      {formatBuildLabel(project.lastBuildLabel)}
    </div>
  )

  const showAdditionalInfo = showBuildTime || showBuildLabel

  const additional = showAdditionalInfo && (
    <span className={styles.additionalInfo}>
      <VisuallyHidden>prognosis {project.prognosis}</VisuallyHidden>
      {time || <div aria-hidden={true}>&nbsp;</div>}
      {buildLabel}
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
