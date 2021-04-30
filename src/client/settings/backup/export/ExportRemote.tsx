import React, {ReactElement} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {toExportableConfigurationJson} from '../../../configuration/Configuration'
import {TextArea} from '../TextArea'
import {getBackupLocation, RemoteLocation} from '../RemoteLocationsReducer'
import {send} from '../../../gateways/Gateway'
import {exportConfiguration} from '../../../gateways/BackupGateway'
import {backupExported} from '../BackupActionCreators'
import {Form} from '../../../common/forms/Form'
import {useParams} from 'react-router-dom'
import {Redirect} from 'react-router'
import {ROUTE_SETTINGS_ANCHOR_BACKUP} from '../../../Routes'
import {ExportPage} from './ExportPage'

interface ExportRemoteProps {
  readonly location: RemoteLocation;
}

export function ExportRemote(): ReactElement {
  const {internalId} = useParams<{ internalId: string }>()
  const location = useSelector(getBackupLocation(internalId))

  if (location) {
    return <ExportRemoteLocation location={location}/>
  } else {
    return <Redirect to={ROUTE_SETTINGS_ANCHOR_BACKUP}/>
  }
}

function ExportRemoteLocation({location}: ExportRemoteProps): ReactElement {
  const dispatch = useDispatch()
  const configuration = useSelector(toExportableConfigurationJson)

  const exportNow = async () => {
    const res = await send(exportConfiguration(location, configuration))
    dispatch(backupExported(location.internalId, res.id))
    return ROUTE_SETTINGS_ANCHOR_BACKUP
  }

  return (
    <ExportPage title='Export remote'
                location={location}>
      <Form onSuccess={exportNow}
            submitButtonText='Export'>
        {() => {
          return (
            <TextArea label='Current configuration'
                      value={configuration}
                      readOnly/>
          )
        }}
      </Form>
    </ExportPage>
  )
}
