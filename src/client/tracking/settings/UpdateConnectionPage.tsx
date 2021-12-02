import React, {ReactElement} from 'react'
import {Page} from '../../common/Page'
import {Tray} from '../../domain/Tray'
import {useDispatch} from 'react-redux'
import {trayUpdated} from '../TrackingActionCreators'
import {routeFeedDetails, routeFeedProjects} from '../../Routes'
import {FeedLogo} from '../FeedLogo'
import {ConnectionForm, ConnectionFormFields} from '../ConnectionForm'

interface UpdateConnectionPageProps {
  readonly feed: Tray;
}

export function UpdateConnectionPage({feed}: UpdateConnectionPageProps): ReactElement {
  const dispatch = useDispatch()

  const updateDetails = (details: ConnectionFormFields) => {
    const urlChanged = details.url !== feed.url
    const authChanged = details.authType !== feed.authType
    const connectionChanged = urlChanged || authChanged

    dispatch(trayUpdated(feed.trayId, details))

    return connectionChanged
      ? routeFeedProjects(feed.trayId, true)
      : routeFeedDetails(feed.trayId)
  }

  return (
    <Page title='Update connection' icon={<FeedLogo feed={feed}/>}>
      <ConnectionForm existingFeed={feed}
                      onSuccess={updateDetails}
                      onCancel={routeFeedDetails(feed.trayId)}/>
    </Page>
  )
}
