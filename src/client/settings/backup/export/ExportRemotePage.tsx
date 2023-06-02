import type { ReactElement } from 'react'
import { useEffect, useState } from 'react'
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
import { isBlank } from '../../../common/Utils'
import { RemoteLocationOptions } from '../RemoteLocationOptions'

const usesExternalId = [
  RemoteLocationOptions.gitHub,
  RemoteLocationOptions.gitLab,
]

export function ExportRemotePage(): ReactElement {
  const location = useRemoteLocationContext()
  const dispatch = useAppDispatch()
  const configuration = useAppSelector(toExportableConfigurationJson)
  const [shouldTrigger2ndExport, setShouldTrigger2ndExport] = useState(false)

  /*
   * We have to trigger the 2nd export in an effect as we need the configuration
   * to have been updated correctly by the reducers for it to contain the
   * external id.
   */
  useEffect(() => {
    if (shouldTrigger2ndExport) {
      void exportConfiguration(location, configuration)
      setShouldTrigger2ndExport(false)
    }
  }, [shouldTrigger2ndExport, location, configuration])

  const exportNow = async (signal?: AbortSignal) => {
    const { id } = await exportConfiguration(location, configuration, signal)
    dispatch(backupExported(location.internalId, id))
    const aborted = signal?.aborted ?? false
    setShouldTrigger2ndExport(
      !aborted &&
        isBlank(location.externalId) &&
        usesExternalId.includes(location.where)
    )
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
