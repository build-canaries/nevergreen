import {backupRaw} from '../../../../src/client/backup/remote/AutomaticBackupListener'
import {buildRemoteBackupLocation, buildState} from '../../testHelpers'
import {fakeRequest} from '../../../../src/client/gateways/Gateway'
import * as BackupGateway from '../../../../src/client/gateways/BackupGateway'
import {BACKUP_REMOTE_LOCATIONS_ROOT} from '../../../../src/client/backup/remote/RemoteLocationsReducer'
import {toExportableConfigurationJson} from '../../../../src/client/configuration/Configuration'

it('should export to any enabled remote locations if the configuration has changed since the last export', async () => {
  jest.spyOn(BackupGateway, 'exportConfigurationNew').mockReturnValue(fakeRequest({id: 'some-external-id'}))

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

  expect(BackupGateway.exportConfigurationNew).toHaveBeenCalledWith(location, toExportableConfigurationJson(current))
})

it('should not export to any enabled remote locations if the configuration is the same as the last export', async () => {
  jest.spyOn(BackupGateway, 'exportConfigurationNew').mockReturnValue(fakeRequest({id: 'some-external-id'}))

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

  expect(BackupGateway.exportConfigurationNew).not.toHaveBeenCalled()
})

it('should not export on first load when previous state is undefined', async () => {
  jest.spyOn(BackupGateway, 'exportConfigurationNew').mockReturnValue(fakeRequest({id: 'some-external-id'}))

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

  expect(BackupGateway.exportConfigurationNew).not.toHaveBeenCalled()
})
