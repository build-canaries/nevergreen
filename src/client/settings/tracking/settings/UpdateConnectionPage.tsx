import React, { ReactElement } from 'react'
import { Page } from '../../../common/Page'
import { feedUpdated } from '../TrackingActionCreators'
import { FeedLogo } from '../FeedLogo'
import { ConnectionForm, ConnectionFormFields } from '../ConnectionForm'
import { useFeedContext } from '../FeedPage'
import { useAppDispatch } from '../../../configuration/Hooks'

export function UpdateConnectionPage(): ReactElement {
  const feed = useFeedContext()
  const dispatch = useAppDispatch()
  const detailsRoute = `/settings/tracking/${feed.trayId}/details`

  const updateDetails = (details: ConnectionFormFields) => {
    dispatch(feedUpdated({ trayId: feed.trayId, feed: details }))
    return detailsRoute
  }

  return (
    <Page title="Update connection" icon={<FeedLogo feed={feed} />}>
      <ConnectionForm
        existingFeed={feed}
        onSuccess={updateDetails}
        onCancel={detailsRoute}
      />
    </Page>
  )
}
