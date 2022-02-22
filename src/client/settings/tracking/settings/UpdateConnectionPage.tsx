import React, {ReactElement} from 'react'
import {Page} from '../../../common/Page'
import {useDispatch} from 'react-redux'
import {feedUpdated} from '../TrackingActionCreators'
import {FeedLogo} from '../FeedLogo'
import {ConnectionForm, ConnectionFormFields} from '../ConnectionForm'
import {useFeedContext} from '../FeedPage'

export function UpdateConnectionPage(): ReactElement {
  const feed = useFeedContext()
  const dispatch = useDispatch()
  const detailsRoute = `/settings/tracking/${feed.trayId}/details`

  const updateDetails = (details: ConnectionFormFields) => {
    dispatch(feedUpdated(feed.trayId, details))
    return detailsRoute
  }

  return (
    <Page title='Update connection' icon={<FeedLogo feed={feed}/>}>
      <ConnectionForm existingFeed={feed}
                      onSuccess={updateDetails}
                      onCancel={detailsRoute}/>
    </Page>
  )
}
