import {backupRaw} from './AutomaticBackupListener'
import {buildRemoteBackupLocation, buildState} from '../../testUtils/builders'
import * as BackupGateway from '../../gateways/BackupGateway'
import {BACKUP_REMOTE_LOCATIONS_ROOT} from './RemoteLocationsReducer'
import {toExportableConfigurationJson} from '../../configuration/Configuration'
import {fakeRequest} from '../../testUtils/testHelpers'

it('should export to any enabled remote locations if the configuration has changed since the last export', async () => {
  jest.spyOn(BackupGateway, 'exportConfiguration').mockReturnValue(fakeRequest({id: 'some-external-id'}))

  const location = buildRemoteBackupLocation({
    internalId: 'internalId',
    automaticallyExport: true
  })

  const previous = buildState()
  const current = buildState({
    [BACKUP_REMOTE_LOCATIONS_ROOT]: {
      internalId: location
    }
  })
  const dispatch = jest.fn()

  await backupRaw(previous, current, dispatch)

  expect(BackupGateway.exportConfiguration).toHaveBeenCalledWith(location, toExportableConfigurationJson(current))
})

it('should not export to any enabled remote locations if the configuration is the same as the last export', async () => {
  jest.spyOn(BackupGateway, 'exportConfiguration').mockReturnValue(fakeRequest({id: 'some-external-id'}))

  const previous = buildState({
    [BACKUP_REMOTE_LOCATIONS_ROOT]: {
      internalId: buildRemoteBackupLocation({
        internalId: 'internalId',
        automaticallyExport: true,
        exportTimestamp: '1',
        importTimestamp: '1'
      })
    }
  })
  const current = buildState({
    [BACKUP_REMOTE_LOCATIONS_ROOT]: {
      internalId: buildRemoteBackupLocation({
        internalId: 'internalId',
        automaticallyExport: true,
        exportTimestamp: '2', // timestamps aren't exported so these shouldn't trigger an export even though they different
        importTimestamp: '2'
      })
    }
  })
  const dispatch = jest.fn()

  await backupRaw(previous, current, dispatch)

  expect(BackupGateway.exportConfiguration).not.toHaveBeenCalled()
})

it('should not export on first load when previous state is undefined', async () => {
  jest.spyOn(BackupGateway, 'exportConfiguration').mockReturnValue(fakeRequest({id: 'some-external-id'}))

  const previous = undefined
  const current = buildState({
    [BACKUP_REMOTE_LOCATIONS_ROOT]: {
      internalId: buildRemoteBackupLocation({
        internalId: 'internalId',
        automaticallyExport: true
      })
    }
  })
  const dispatch = jest.fn()

  await backupRaw(previous, current, dispatch)

  expect(BackupGateway.exportConfiguration).not.toHaveBeenCalled()
})
