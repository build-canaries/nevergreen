import type { ReactElement } from 'react'
import { Page } from '../../../common/Page'
import { AvailableProjects } from './AvailableProjects'
import { CheckboxChecked } from '../../../common/icons/CheckboxChecked'
import { UpdateFeedDetailsButton } from '../../../common/LinkButton'
import { useFeedContext } from '../FeedPage'
import { DropDown } from '../../../common/forms/DropDown'
import { feedUpdated } from '../TrackingActionCreators'
import { useAppDispatch } from '../../../configuration/Hooks'
import { TrackingMode } from '../FeedsReducer'
import styles from './manage-projects-page.scss'

export function ManageProjectsPage(): ReactElement {
  const dispatch = useAppDispatch()
  const feed = useFeedContext()

  return (
    <Page title="Manage projects" icon={<CheckboxChecked />}>
      <DropDown
        options={[
          { value: TrackingMode.everything, display: 'Everything' },
          { value: TrackingMode.selected, display: 'Selected' },
        ]}
        value={feed.trackingMode}
        onChange={({ target }) =>
          dispatch(
            feedUpdated({
              trayId: feed.trayId,
              feed: { trackingMode: target.value as TrackingMode },
            }),
          )
        }
        className={styles.trackingMode}
      >
        Tracking mode
      </DropDown>
      {feed.trackingMode === TrackingMode.selected && (
        <AvailableProjects feed={feed} />
      )}
      <UpdateFeedDetailsButton feedId={feed.trayId} title={feed.name} />
    </Page>
  )
}
