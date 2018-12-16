import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {Shortcut} from '../../common/Shortcut'
import {Duration} from '../../common/Duration'
import styles from './refresh.scss'
import {PrimaryButton} from '../../common/forms/Button'
import {iRefresh} from '../../common/fonts/Icons'

export function Refresh({index, timestamp, refreshTray}) {
  return (
    <Fragment>
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
    </Fragment>
  )
}

Refresh.propTypes = {
  index: PropTypes.number.isRequired,
  timestamp: PropTypes.string,
  refreshTray: PropTypes.func.isRequired
}
