import React, {ReactElement} from 'react'
import {Duration} from '../../../common/Duration'
import styles from './refresh.scss'
import {PrimaryButton} from '../../../common/forms/Button'
import {Loop} from '../../../common/icons/Loop'

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
                     icon={<Loop loaded={loaded}/>}
                     disabled={!loaded}>
        Refresh
      </PrimaryButton>
      <div className={styles.lastFetch}>
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
