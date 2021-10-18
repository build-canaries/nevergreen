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
import {ROUTE_SETTINGS_BACKUP} from '../../../Routes'
import {Page} from '../../../common/Page'
import {backupSummary} from '../BackupSummary'
import {Summary} from '../../../common/Summary'
import {BackupLogo} from '../logo/BackupLogo'

interface ExportRemoteProps {
  readonly location: RemoteLocation;
}

export function ExportRemote(): ReactElement {
  const {internalId} = useParams<{ internalId: string }>()
  const location = useSelector(getBackupLocation(internalId))

  if (location) {
    return <ExportRemoteLocation location={location}/>
  } else {
    return <Redirect to={ROUTE_SETTINGS_BACKUP}/>
  }
}

function ExportRemoteLocation({location}: ExportRemoteProps): ReactElement {
  const dispatch = useDispatch()
  const configuration = useSelector(toExportableConfigurationJson)

  const exportNow = async () => {
    const res = await send(exportConfiguration(location, configuration))
    dispatch(backupExported(location.internalId, res.id))
    return ROUTE_SETTINGS_BACKUP
  }

  return (
    <Page title='Export remote' icon={<BackupLogo where={location.where}/>}>
      <Summary values={backupSummary(location)}/>
      <Form onSuccess={exportNow}
            onCancel={ROUTE_SETTINGS_BACKUP}
            submitButtonText='Export'>
        {() => {
          return (
            <TextArea label='Current configuration'
                      value={configuration}
                      readOnly/>
          )
        }}
      </Form>
    </Page>
  )
}
