import React, {ReactElement} from 'react'
import {createId} from '../../domain/Tray'
import {trayAdded} from './TrackingActionCreators'
import {useDispatch} from 'react-redux'
import {Page} from '../../common/Page'
import {ROUTE_SETTINGS_TRACKING, routeFeedProjects} from '../../Routes'
import {Xml} from '../../common/icons/Xml'
import {ConnectionForm, ConnectionFormFields} from './ConnectionForm'

export function AddTray(): ReactElement {
  const dispatch = useDispatch()

  const addTray = ({url, authType, username, encryptedPassword, encryptedAccessToken}: ConnectionFormFields) => {
    const trayId = createId()
    dispatch(trayAdded(trayId, url, authType, username, encryptedPassword, encryptedAccessToken))
    return routeFeedProjects(trayId, true)
  }

  return (
    <Page title='Add CCTray XML feed' icon={<Xml/>}>
      <ConnectionForm onSuccess={addTray}
                      onCancel={ROUTE_SETTINGS_TRACKING}/>
    </Page>
  )
}
