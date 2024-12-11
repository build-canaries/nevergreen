import { ReactElement, useState } from 'react'
import { Page } from '../../../common/Page'
import { AvailableProjects } from './AvailableProjects'
import { CheckboxChecked } from '../../../common/icons/CheckboxChecked'
import { useFeedContext } from '../FeedPage'
import { DropDown } from '../../../common/forms/DropDown'
import { feedUpdated } from '../TrackingActionCreators'
import { useAppDispatch, useAppSelector } from '../../../configuration/Hooks'
import { TrackingMode } from '../FeedsReducer'
import { RoutePaths } from '../../../AppRoutes'
import { Form } from '../../../common/forms/Form'
import { getSelectedProjectsForFeed, projectSelected } from '../SelectedReducer'
import styles from './manage-projects-page.scss'

export function ManageProjectsPage(): ReactElement {
  const dispatch = useAppDispatch()
  const feed = useFeedContext()
  const currentlySelected = useAppSelector(
    getSelectedProjectsForFeed(feed.trayId),
  )

  const [trackingMode, setTrackingMode] = useState(feed.trackingMode)
  const [selected, setSelected] = useState(currentlySelected)

  const onSuccess = () => {
    dispatch(
      feedUpdated({
        trayId: feed.trayId,
        feed: { trackingMode },
      }),
    )
    dispatch(
      projectSelected({
        trayId: feed.trayId,
        projectIds: selected,
      }),
    )
    return {
      navigateTo: RoutePaths.tracking,
    }
  }

  return (
    <Page title="Manage projects" icon={<CheckboxChecked />}>
      <Form
        onValidate={() => {}}
        onSuccess={onSuccess}
        onCancel={RoutePaths.tracking}
      >
        {() => {
          return (
            <>
              <DropDown
                options={[
                  { value: TrackingMode.everything, display: 'Everything' },
                  { value: TrackingMode.selected, display: 'Selected' },
                ]}
                value={trackingMode}
                onChange={({ target }) =>
                  setTrackingMode(target.value as TrackingMode)
                }
                className={styles.trackingMode}
              >
                Tracking mode
              </DropDown>
              {trackingMode === TrackingMode.selected && (
                <AvailableProjects
                  feed={feed}
                  selected={selected}
                  setSelected={setSelected}
                />
              )}
            </>
          )
        }}
      </Form>
    </Page>
  )
}

export const Component = ManageProjectsPage
