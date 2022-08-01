import React, {ReactElement} from 'react'
import {createId} from '../../domain/Feed'
import {feedAdded} from './TrackingActionCreators'
import {useDispatch} from 'react-redux'
import {Page} from '../../common/Page'
import {Xml} from '../../common/icons/Xml'
import {ConnectionForm, ConnectionFormFields} from './ConnectionForm'
import {ROUTE_TRACKING} from '../../AppRoutes'

export function AddFeed(): ReactElement {
  const dispatch = useDispatch()

  const onSuccess = ({url, authType, username, encryptedPassword, encryptedAccessToken}: ConnectionFormFields) => {
    const trayId = createId()
    dispatch(feedAdded(trayId, url, authType, username, encryptedPassword, encryptedAccessToken))
    return `/settings/tracking/${trayId}/projects`
  }

  return (
    <Page title='Add CCTray XML feed' icon={<Xml/>}>
      <ConnectionForm onSuccess={onSuccess}
                      onCancel={ROUTE_TRACKING}/>
    </Page>
  )
}
