import React from 'react'
import styles from './tile-error.scss'
import {ProjectError} from '../domain/Project'
import {trayIdentifier} from '../domain/Tray'
import {useSelector} from 'react-redux'
import {getTrays} from '../tracking/TraysReducer'
import {ScaledTile} from './ScaledTile'

interface TileError {
  readonly error: ProjectError;
}

export function TileError({error}: TileError) {
  const trays = useSelector(getTrays)
  const myTray = trays.find(({trayId}) => trayId === error.trayId)

  const header = (
    <div className={styles.identifier}>
      {trayIdentifier(myTray)}
    </div>
  )

  return (
    <ScaledTile className={styles.error}
                header={header}
                sentences={[error.errorMessage]}>
      {error.errorMessage}
    </ScaledTile>
  )
}
