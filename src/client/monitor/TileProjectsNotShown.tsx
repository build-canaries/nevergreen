import React from 'react'
import styles from './tile-projects-not-shown.scss'
import {ScaledTile} from './ScaledTile'

interface TileNotShownProps {
  readonly count: number;
}

export function TileProjectsNotShown({count}: TileNotShownProps) {
  const message = `+${count} projects not shown`

  return (
    <ScaledTile className={styles.summary}
                sentences={[message]}>
      {message}
    </ScaledTile>
  )
}
