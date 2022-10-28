import React, {ReactElement} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getFeeds} from './FeedsReducer'
import {Page} from '../../common/Page'
import {AddButton} from '../../common/LinkButton'
import {WarningMessages} from '../../common/Messages'
import {FeedCard} from './FeedCard'
import styles from './tracking-page.scss'
import {DropDown} from '../../common/forms/DropDown'
import {setRefreshTime, VALID_REFRESH_TIMES} from '../SettingsActionCreators'
import {secondsToString} from '../../common/DateTime'
import {getRefreshTime} from '../SettingsReducer'
import {List} from '../../common/icons/List'
import {CardList} from '../../common/card/CardList'

export function TrackingPage(): ReactElement {
  const dispatch = useDispatch()
  const feeds = useSelector(getFeeds)
  const refreshTime = useSelector(getRefreshTime)
  const options = VALID_REFRESH_TIMES.map((time) => {
    return {value: time.toString(), display: secondsToString(time)}
  })

  return (
    <Page title="Tracking" icon={<List/>}>
      <DropDown className={styles.refreshTime}
                options={options}
                value={refreshTime}
                onChange={({target}) => dispatch(setRefreshTime(target.value))}
                data-locator="refresh-time">
        Poll for feed changes every
      </DropDown>
      <AddButton>Add feed</AddButton>
      {feeds.length === 0 && <WarningMessages messages="No feeds added, add a feed to start monitoring"/>}
      <CardList>
        {feeds.map((feed) => {
          return (
            <FeedCard key={feed.trayId} feed={feed}/>
          )
        })}
      </CardList>
    </Page>
  )
}
