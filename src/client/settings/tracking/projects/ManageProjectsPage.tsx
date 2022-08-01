import React, {ReactElement} from 'react'
import {Page} from '../../../common/Page'
import {AvailableProjects} from './AvailableProjects'
import {CheckboxChecked} from '../../../common/icons/CheckboxChecked'
import {UpdateFeedDetailsButton} from '../../../common/LinkButton'
import {useFeedContext} from '../FeedPage'
import {TRACKING_MODE_OPTIONS, TrackingMode} from '../../../domain/Feed'
import {DropDown} from '../../../common/forms/DropDown'
import {feedUpdated} from '../TrackingActionCreators'
import {useDispatch} from 'react-redux'
import styles from './manage-projects-page.scss'

export function ManageProjectsPage(): ReactElement {
  const dispatch = useDispatch()
  const feed = useFeedContext()

  return (
    <Page title="Manage projects" icon={<CheckboxChecked/>}>
      <DropDown options={TRACKING_MODE_OPTIONS}
                value={feed.trackingMode}
                onChange={({target}) => dispatch(feedUpdated(feed.trayId, {trackingMode: target.value as TrackingMode}))}
                className={styles.trackingMode}>
        Tracking mode
      </DropDown>
      {feed.trackingMode === TrackingMode.selected && (
        <AvailableProjects feed={feed}/>
      )}
      <UpdateFeedDetailsButton feedId={feed.trayId} title={feed.name}/>
    </Page>
  )
}
