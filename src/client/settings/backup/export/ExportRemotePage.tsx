import type { ReactElement } from 'react'
import { toExportableConfigurationJson } from '../../../configuration/Configuration'
import { TextArea } from '../TextArea'
import { exportConfiguration } from '../../../gateways/BackupGateway'
import { Form } from '../../../common/forms/Form'
import { Page } from '../../../common/Page'
import { FullBackupSummary } from '../BackupSummary'
import { BackupLogo } from '../BackupLogo'
import { useRemoteLocationContext } from '../RemoteLocationPage'
import { ROUTE_BACKUP } from '../../../AppRoutes'
import { useAppDispatch, useAppSelector } from '../../../configuration/Hooks'
import { backupExported } from '../RemoteLocationsActions'

export function ExportRemotePage(): ReactElement {
  const location = useRemoteLocationContext()
  const dispatch = useAppDispatch()
  const configuration = useAppSelector(toExportableConfigurationJson)

  const exportNow = async (signal?: AbortSignal) => {
    const res = await exportConfiguration(location, configuration, signal)
    dispatch(backupExported(location.internalId, res.id))
    return { successMessage: 'Successfully exported configuration' }
  }

  return (
    <Page title="Export remote" icon={<BackupLogo where={location.where} />}>
      <FullBackupSummary location={location} />
      <Form
        onSuccess={exportNow}
        onCancel={ROUTE_BACKUP}
        submitButtonText="Export"
      >
        {() => {
          return (
            <TextArea
              label="Current configuration"
              value={configuration}
              readOnly
            />
          )
        }}
      </Form>
    </Page>
  )
}
