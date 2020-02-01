import React from 'react'
import styles from './tile-not-shown.scss'
import {Tile} from './Tile'

interface TileNotShownProps {
  readonly count: number;
}

export function TileNotShown({count}: TileNotShownProps) {
  return (
    <Tile className={styles.summary}>
      <span>+{count} not shown</span>
    </Tile>
  )
}
