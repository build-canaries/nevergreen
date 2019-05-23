import React from 'react'
import {Shortcut} from '../../common/Shortcut'
import {Duration} from '../../common/Duration'
import styles from './refresh.scss'
import {PrimaryButton} from '../../common/forms/Button'
import {iRefresh} from '../../common/fonts/Icons'

interface RefreshProps {
  index: number;
  timestamp?: string;
  refreshTray: () => void;
}

export function Refresh({index, timestamp, refreshTray}: RefreshProps) {
  return (
    <>
      <PrimaryButton className={styles.refresh}
                     onClick={refreshTray}
                     icon={iRefresh}>
        refresh
        <Shortcut hotkeys={[`r ${index}`]}/>
      </PrimaryButton>
      <div className={styles.lastFetch} data-locator='refresh-time'>
        {
          timestamp && <Duration fullDescriptionPrefix='projects last refreshed'
                                 fullDescriptionSuffix='ago'
                                 timestamp={timestamp}/>
        }
        {
          !timestamp && 'projects last refreshed never'
        }
      </div>
    </>
  )
}
