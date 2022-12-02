import {Configuration, DataSource, toConfiguration, toExportableConfigurationJson} from './Configuration'
import {Either, isLeft, isRight} from 'fp-ts/Either'
import {buildRemoteBackupLocation, buildState} from '../testUtils/builders'
import {remoteLocationsRoot} from '../settings/backup/RemoteLocationsReducer'
import {feedsRoot} from '../settings/tracking/FeedsReducer'
import {notificationsRoot} from '../settings/notifications/NotificationsReducer'
import {RemoteLocationOptions} from '../settings/backup/RemoteLocationOptions'

function expectErrors(result: Either<ReadonlyArray<string>, Configuration>, errors: ReadonlyArray<string>): void {
  if (isLeft(result)) {
    expect(result.left).toEqual(errors)
  } else {
    fail('Expected result to contain left(errors) but it was right(configuration)')
  }
}

describe('toConfiguration', () => {

  describe(feedsRoot, () => {

    it('parses valid to configuration', () => {
      const data: Configuration = {
        [feedsRoot]: {
          'some-tray-id': {
            url: 'some-url',
            trayId: 'some-tray-id'
          }
        }
      }
      const result = toConfiguration(data, DataSource.browserStorage)
      if (isRight(result)) {
        expect(result.right.trays).toHaveProperty('some-tray-id')
      } else {
        fail(`Expected right(configuration) but got left([${result.left.join(', ')}])`)
      }
    })

    it('rejects missing ID, as this is required to match projects to the owning feed', () => {
      const data = {
        [feedsRoot]: {
          'some-tray-id': {
            url: 'some-url'
          }
        }
      }
      const result = toConfiguration(data, DataSource.browserStorage)
      expectErrors(result, ['Invalid value undefined supplied to /trays/some-tray-id/trayId expected string'])
    })

    it('rejects missing URL, as this is required to actually contact the CI server', () => {
      const data = {
        [feedsRoot]: {
          'some-tray-id': {
            trayId: 'some-id'
          }
        }
      }
      const result = toConfiguration(data, DataSource.browserStorage)
      expectErrors(result, ['Invalid value undefined supplied to /trays/some-tray-id/url expected string'])
    })

    it('rejects if the key does not match the ID', () => {
      const data = {
        [feedsRoot]: {
          'some-tray-id': {
            trayId: 'another-id',
            url: 'some-url'
          }
        }
      }
      const result = toConfiguration(data, DataSource.browserStorage)
      expectErrors(result, ['Invalid value "another-id" supplied to /trays/some-tray-id/trayId expected "some-tray-id"'])
    })
  })

  describe(remoteLocationsRoot, () => {

    it('parses valid to configuration', () => {
      const data: Configuration = {
        [remoteLocationsRoot]: {
          'some-id': {
            internalId: 'some-id',
            where: RemoteLocationOptions.custom,
            url: 'some-url'
          }
        }
      }
      const result = toConfiguration(data, DataSource.browserStorage)
      if (isRight(result)) {
        expect(result.right.backupRemoteLocations).toHaveProperty('some-id')
      } else {
        fail(`Expected right(configuration) but got left([${result.left.join(', ')}])`)
      }
    })

    it('rejects a missing internal ID, as this is required to actually do anything', () => {
      const data = {
        [remoteLocationsRoot]: {
          'some-internal-id': {
            where: 'custom',
            url: 'some-url'
          }
        }
      }
      const result = toConfiguration(data, DataSource.browserStorage)
      expectErrors(result, ['Invalid value undefined supplied to /backupRemoteLocations/some-internal-id/internalId expected string'])
    })

    it('rejects a missing URL, as this is required to actually do anything', () => {
      const data = {
        [remoteLocationsRoot]: {
          'some-internal-id': {
            internalId: 'some-internal-id',
            where: 'custom'
          }
        }
      }
      const result = toConfiguration(data, DataSource.browserStorage)
      expectErrors(result, ['Invalid value undefined supplied to /backupRemoteLocations/some-internal-id/url expected string'])
    })

    it('rejects a missing where, as this is required to actually do anything', () => {
      const data = {
        [remoteLocationsRoot]: {
          'some-internal-id': {
            internalId: 'some-internal-id',
            url: 'some-url'
          }
        }
      }
      const result = toConfiguration(data, DataSource.browserStorage)
      expectErrors(result, ['Invalid value undefined supplied to /backupRemoteLocations/some-internal-id/where expected "custom" | "github" | "gitlab"'])
    })

    it('rejects if the key does not match the internal ID', () => {
      const data = {
        [remoteLocationsRoot]: {
          'some-id': {
            internalId: 'another-id',
            where: 'custom',
            url: 'some-url'
          }
        }
      }
      const result = toConfiguration(data, DataSource.browserStorage)
      expectErrors(result, ['Invalid value "another-id" supplied to /backupRemoteLocations/some-id/internalId expected "some-id"'])
    })
  })

  it('removes unknown properties', () => {
    const data = {foo: 'bar'}
    const result = toConfiguration(data, DataSource.browserStorage)
    expect(isRight(result)).toBeTruthy()
    if (isRight(result)) {
      expect(result.right).not.toHaveProperty('foo')
    }
  })

  it('keeps known properties', () => {
    const data = {[feedsRoot]: {}}
    const result = toConfiguration(data, DataSource.browserStorage)
    expect(isRight(result)).toBeTruthy()
    if (isRight(result)) {
      expect(result.right).toEqual(expect.objectContaining({trays: {}}))
    }
  })

  it('removes the show system notifications property when a user import, as this property is no longer exported (but this import could be from an old version)', () => {
    const data = {[notificationsRoot]: {allowSystemNotifications: true}}
    const result = toConfiguration(data, DataSource.userImport)
    expect(isRight(result)).toBeTruthy()
    if (isRight(result)) {
      expect(result.right).not.toHaveProperty('notifications.allowSystemNotifications')
    }
  })

  it('keeps the show system notifications property when loading from browser storage', () => {
    const data = {[notificationsRoot]: {allowSystemNotifications: true}}
    const result = toConfiguration(data, DataSource.browserStorage)
    expect(isRight(result)).toBeTruthy()
    if (isRight(result)) {
      expect(result.right).toHaveProperty('notifications.allowSystemNotifications')
    }
  })
})

describe('toExportableConfigurationJson', () => {

  it('removes timestamps from remote backups as they should be the last time those action were done on this instance of Nevergreen', () => {
    const state = buildState({
      [remoteLocationsRoot]: {
        internalId: buildRemoteBackupLocation({
          exportTimestamp: 'some-export-timestamp',
          importTimestamp: 'some-import-timestamp'
        })
      }
    })
    const exportable = toExportableConfigurationJson(state)
    expect(exportable).not.toMatch('"exportTimestamp": "some-export-timestamp"')
    expect(exportable).not.toMatch('"importTimestamp": "some-import-timestamp"')
  })

  it('removes system notifications preference because we treat them as personal settings', () => {
    const state = buildState({
      [notificationsRoot]: {
        allowSystemNotifications: true
      }
    })
    const exportable = toExportableConfigurationJson(state)
    expect(exportable).not.toMatch('"allowSystemNotifications": true')
  })
})
