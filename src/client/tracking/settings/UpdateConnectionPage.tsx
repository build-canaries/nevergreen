import React, {ReactElement} from 'react'
import {Page} from '../../common/Page'
import {Tray} from '../../domain/Tray'
import {useDispatch} from 'react-redux'
import {trayUpdated} from '../TrackingActionCreators'
import {routeFeedDetails} from '../../Routes'
import {FeedLogo} from '../FeedLogo'
import {ConnectionForm, ConnectionFormFields} from '../ConnectionForm'

interface UpdateConnectionPageProps {
  readonly feed: Tray;
}

export function UpdateConnectionPage({feed}: UpdateConnectionPageProps): ReactElement {
  const dispatch = useDispatch()

  const updateDetails = (details: ConnectionFormFields) => {
    dispatch(trayUpdated(feed.trayId, details))
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
