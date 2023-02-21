import type { ReactElement } from 'react'
import { getFeeds } from './FeedsReducer'
import { Page } from '../../common/Page'
import { AddButton } from '../../common/LinkButton'
import { WarningMessages } from '../../common/Messages'
import { FeedCard } from './FeedCard'
import { DropDown } from '../../common/forms/DropDown'
import { secondsToString } from '../../common/DateTime'
import {
  getRefreshTime,
  setRefreshTime,
  validRefreshTimes,
} from '../SettingsReducer'
import { List } from '../../common/icons/List'
import { CardList } from '../../common/card/CardList'
import { useAppDispatch, useAppSelector } from '../../configuration/Hooks'
import styles from './tracking-page.scss'

export function TrackingPage(): ReactElement {
  const dispatch = useAppDispatch()
  const feeds = useAppSelector(getFeeds)
  const refreshTime = useAppSelector(getRefreshTime)
  const options = validRefreshTimes.map((time) => {
    return { value: time.toString(), display: secondsToString(time) }
  })

  return (
    <Page title="Tracking" icon={<List />}>
      <DropDown
        className={styles.refreshTime}
        options={options}
        value={refreshTime}
        onChange={({ target }) =>
          dispatch(setRefreshTime(Number.parseInt(target.value)))
        }
        data-locator="refresh-time"
      >
        Poll for feed changes every
      </DropDown>
      <AddButton>Add feed</AddButton>
      {feeds.length === 0 && (
        <WarningMessages messages="No feeds added, add a feed to start monitoring" />
      )}
      <CardList>
        {feeds.map((feed) => {
          return <FeedCard key={feed.trayId} feed={feed} />
        })}
      </CardList>
    </Page>
  )
}
