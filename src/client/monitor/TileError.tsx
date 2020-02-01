import React from 'react'
import styles from './tile-error.scss'
import {Tile} from './Tile'
import {ProjectError} from '../domain/Project'
import {getIdentifier, Tray} from '../domain/Tray'

interface TileError {
  readonly error: ProjectError;
  readonly tray?: Tray;
}

export function TileError({error: {errorMessage}, tray}: TileError) {
  const identifier = tray ? getIdentifier(tray) : 'Nevergreen'
  return (
    <Tile className={styles.error}
          header={identifier}>
      {errorMessage}
    </Tile>
  )
}
