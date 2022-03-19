import React, {ReactElement} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {toExportableConfigurationJson} from '../../../configuration/Configuration'
import {TextArea} from '../TextArea'
import {send} from '../../../gateways/Gateway'
import {exportConfiguration} from '../../../gateways/BackupGateway'
import {backupExported} from '../BackupActionCreators'
import {Form} from '../../../common/forms/Form'
import {Page} from '../../../common/Page'
import {fullBackupSummary} from '../BackupSummary'
import {Summary} from '../../../common/Summary'
import {BackupLogo} from '../BackupLogo'
import {useRemoteLocationContext} from '../RemoteLocationPage'
import {ROUTE_BACKUP} from '../../../AppRoutes'

export function ExportRemote(): ReactElement {
  const location = useRemoteLocationContext()
  const dispatch = useDispatch()
  const configuration = useSelector(toExportableConfigurationJson)

  const exportNow = async (signal: AbortSignal | undefined) => {
    const res = await send(exportConfiguration(location, configuration), signal)
    dispatch(backupExported(location.internalId, res.id))
    return {successMessage: 'Successfully exported configuration'}
  }

  return (
    <Page title='Export remote' icon={<BackupLogo where={location.where}/>}>
      <Summary values={fullBackupSummary(location)}/>
      <Form onSuccess={exportNow}
            onCancel={ROUTE_BACKUP}
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
