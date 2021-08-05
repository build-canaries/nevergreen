import React, {ReactElement} from 'react'
import {Duration} from '../../common/Duration'
import styles from './refresh.scss'
import {PrimaryButton} from '../../common/forms/Button'
import {iRefresh} from '../../common/fonts/Icons'

interface RefreshProps {
  readonly timestamp?: string;
  readonly refreshTray: () => void;
  readonly loaded: boolean;
}

export function Refresh({timestamp, refreshTray, loaded}: RefreshProps): ReactElement {
  return (
    <>
      <PrimaryButton className={styles.refresh}
                     onClick={refreshTray}
                     icon={iRefresh}
                     disabled={!loaded}>
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
