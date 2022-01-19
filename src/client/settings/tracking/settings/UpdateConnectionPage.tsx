import React, {ReactElement} from 'react'
import {Page} from '../../../common/Page'
import {Feed} from '../../../domain/Feed'
import {useDispatch} from 'react-redux'
import {feedUpdated} from '../TrackingActionCreators'
import {routeFeedDetails} from '../../../Routes'
import {FeedLogo} from '../FeedLogo'
import {ConnectionForm, ConnectionFormFields} from '../ConnectionForm'

interface UpdateConnectionPageProps {
  readonly feed: Feed;
}

export function UpdateConnectionPage({feed}: UpdateConnectionPageProps): ReactElement {
  const dispatch = useDispatch()

  const updateDetails = (details: ConnectionFormFields) => {
    dispatch(feedUpdated(feed.trayId, details))
    return routeFeedDetails(feed.trayId)
  }

  return (
    <Page title='Update connection' icon={<FeedLogo feed={feed}/>}>
      <ConnectionForm existingFeed={feed}
                      onSuccess={updateDetails}
                      onCancel={routeFeedDetails(feed.trayId)}/>
    </Page>
  )
}
