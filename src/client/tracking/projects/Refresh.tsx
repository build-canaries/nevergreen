import React, {ReactElement} from 'react'
import {Duration} from '../../common/Duration'
import styles from './refresh.scss'
import {PrimaryButton} from '../../common/forms/Button'
import {iRefresh} from '../../common/fonts/Icons'
import {useShortcut} from '../../common/Keyboard'

interface RefreshProps {
  readonly index: number;
  readonly timestamp?: string;
  readonly refreshTray: () => void;
}

export function Refresh({index, timestamp, refreshTray}: RefreshProps): ReactElement {
  useShortcut(`r ${index}`, refreshTray)

  return (
    <>
      <PrimaryButton className={styles.refresh}
                     onClick={refreshTray}
                     icon={iRefresh}>
        Refresh
      </PrimaryButton>
      <div className={styles.lastFetch} data-locator='refresh-time'>
        {
          timestamp && <Duration prefix='projects last refreshed'
                                 suffix='ago'
                                 timestamp={timestamp}/>
        }
        {
          !timestamp && 'projects last refreshed never'
        }
      </div>
    </>
  )
}
