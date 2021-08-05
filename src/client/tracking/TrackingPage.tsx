import React, {ReactElement} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getTrays} from './TraysReducer'
import {Page} from '../common/Page'
import {AddButton} from '../common/LinkButton'
import {ROUTE_TRACKING_ADD} from '../Routes'
import {WarningMessages} from '../common/Messages'
import {FeedCard} from './FeedCard'
import styles from './tracking-page.scss'
import {DropDown} from '../common/forms/DropDown'
import {setRefreshTime, VALID_REFRESH_TIMES} from '../settings/SettingsActionCreators'
import {secondsToString} from '../common/DateTime'
import {getRefreshTime} from '../settings/SettingsReducer'

export function TrackingPage(): ReactElement {
  const dispatch = useDispatch()
  const trays = useSelector(getTrays)
  const refreshTime = useSelector(getRefreshTime)
  const options = VALID_REFRESH_TIMES.map((time) => {
    return {value: time.toString(), display: secondsToString(time)}
  })

  return (
    <Page title='Tracking'>
      <DropDown className={styles.refreshTime}
                options={options}
                value={refreshTime}
                onChange={({target}) => dispatch(setRefreshTime(target.value))}
                data-locator='refresh-time'>
        Poll for feed changes every
      </DropDown>
      <AddButton to={ROUTE_TRACKING_ADD}
                 className={styles.addFeed}>
        Add feed
      </AddButton>
      {trays.length === 0 && <WarningMessages messages='No feeds added, add a feed to start monitoring'/>}
      <ul className={styles.container}>
        {
          trays.map((tray, index) => {
            return (
              <li key={tray.trayId}>
                <FeedCard key={tray.trayId}
                          tray={tray}
                          index={index + 1}/>
              </li>
            )
          })
        }
      </ul>
    </Page>
  )
}
