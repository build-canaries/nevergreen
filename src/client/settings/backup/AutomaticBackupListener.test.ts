import { backupRaw } from './AutomaticBackupListener'
import { buildRemoteBackupLocation, buildState } from '../../testUtils/builders'
import * as BackupGateway from '../../gateways/BackupGateway'
import { remoteLocationsRoot } from './RemoteLocationsReducer'
import { toExportableConfigurationJson } from '../../configuration/Configuration'

it('should export to any enabled remote locations if the configuration has changed since the last export', async () => {
  jest
    .spyOn(BackupGateway, 'exportConfiguration')
    .mockResolvedValueOnce({ id: 'some-external-id' })

  const location = buildRemoteBackupLocation({
    internalId: 'internalId',
    automaticallyExport: true,
  })

  const previous = buildState()
  const current = buildState({
    [remoteLocationsRoot]: {
      internalId: location,
    },
  })
  const dispatch = jest.fn()

  await backupRaw(previous, current, dispatch)

  expect(BackupGateway.exportConfiguration).toHaveBeenCalledWith(
    location,
    toExportableConfigurationJson(current),
  )
})

it('should not export to any enabled remote locations if the configuration is the same as the last export', async () => {
  jest
    .spyOn(BackupGateway, 'exportConfiguration')
    .mockResolvedValueOnce({ id: 'some-external-id' })

  const previous = buildState({
    [remoteLocationsRoot]: {
      internalId: buildRemoteBackupLocation({
        internalId: 'internalId',
        automaticallyExport: true,
      }),
    },
  })
  const current = buildState({
    [remoteLocationsRoot]: {
      internalId: buildRemoteBackupLocation({
        internalId: 'internalId',
        automaticallyExport: true,
      }),
    },
  })
  const dispatch = jest.fn()

  await backupRaw(previous, current, dispatch)

  expect(BackupGateway.exportConfiguration).not.toHaveBeenCalled()
})

it('should not export on first load when previous state is undefined', async () => {
  jest
    .spyOn(BackupGateway, 'exportConfiguration')
    .mockResolvedValueOnce({ id: 'some-external-id' })

  const previous = undefined
  const current = buildState({
    [remoteLocationsRoot]: {
      internalId: buildRemoteBackupLocation({
        internalId: 'internalId',
        automaticallyExport: true,
      }),
    },
  })
  const dispatch = jest.fn()

  await backupRaw(previous, current, dispatch)

  expect(BackupGateway.exportConfiguration).not.toHaveBeenCalled()
})
