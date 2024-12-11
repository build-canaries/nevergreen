import type { ReactElement } from 'react'
import { Page } from '../../../common/Page'
import { feedUpdated } from '../TrackingActionCreators'
import { FeedLogo } from '../FeedLogo'
import { ConnectionForm, ConnectionFormFields } from '../ConnectionForm'
import { useFeedContext } from '../FeedPage'
import { useAppDispatch } from '../../../configuration/Hooks'
import { RoutePaths } from '../../../AppRoutes'

export function UpdateConnectionPage(): ReactElement {
  const feed = useFeedContext()
  const dispatch = useAppDispatch()

  const updateDetails = (details: ConnectionFormFields) => {
    dispatch(feedUpdated({ trayId: feed.trayId, feed: details }))
    return RoutePaths.tracking
  }

  return (
    <Page title="Update connection" icon={<FeedLogo feed={feed} />}>
      <ConnectionForm
        existingFeed={feed}
        onSuccess={updateDetails}
        onCancel={RoutePaths.tracking}
      />
    </Page>
  )
}

export const Component = UpdateConnectionPage
