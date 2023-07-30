import type { ReactElement } from 'react'
import { toExportableConfigurationJson } from '../../../configuration/Configuration'
import { TextArea } from '../TextArea'
import { exportConfiguration } from '../../../gateways/BackupGateway'
import { Form } from '../../../common/forms/Form'
import { Page } from '../../../common/Page'
import { FullBackupSummary } from '../BackupSummary'
import { BackupLogo } from '../BackupLogo'
import { useRemoteLocationContext } from '../RemoteLocationPage'
import { RoutePaths } from '../../../AppRoutes'
import { useAppDispatch, useAppSelector } from '../../../configuration/Hooks'
import { backupExported } from '../RemoteLocationsActions'
import { isBlank } from '../../../common/Utils'
import { RemoteLocationOptions } from '../RemoteLocationOptions'
import { store } from '../../../configuration/ReduxStore'

const usesExternalId = [
  RemoteLocationOptions.gitHub,
  RemoteLocationOptions.gitLab,
]

export function ExportRemotePage(): ReactElement {
  const location = useRemoteLocationContext()
  const dispatch = useAppDispatch()
  const configuration = useAppSelector(toExportableConfigurationJson)

  const exportNow = async (signal?: AbortSignal) => {
    const isNewLocation =
      isBlank(location.externalId) && usesExternalId.includes(location.where)

    const { id } = await exportConfiguration(location, configuration, signal)

    dispatch(backupExported(location.internalId, id))

    /*
     * We need to trigger a 2nd export for new locations to make sure the
     * external ID is set in the exported configuration.
     * We need to use the store.getState() as the configuration variable
     * is a snapshot of the store state and isn't updated until this component
     * re-renders.
     * See issue #347 for more details.
     */
    if (isNewLocation) {
      await exportConfiguration(
        location,
        toExportableConfigurationJson(store.getState()),
      )
    }

    return { successMessage: 'Successfully exported configuration' }
  }

  return (
    <Page title="Export remote" icon={<BackupLogo where={location.where} />}>
      <FullBackupSummary location={location} />
      <Form
        onSuccess={exportNow}
        onCancel={RoutePaths.backup}
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

export const Component = ExportRemotePage
