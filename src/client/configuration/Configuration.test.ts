import {
  Configuration,
  DataSource,
  toConfiguration,
  toExportableConfigurationJson,
} from './Configuration'
import { Either, isLeft, isRight } from 'fp-ts/Either'
import { buildRemoteBackupLocation, buildState } from '../testUtils/builders'
import { remoteLocationsRoot } from '../settings/backup/RemoteLocationsReducer'
import {
  AuthTypes,
  feedsRoot,
  ServerTypes,
  TrackingMode,
} from '../settings/tracking/FeedsReducer'
import { RemoteLocationOptions } from '../settings/backup/RemoteLocationOptions'
import { personalSettingsRoot } from '../settings/PersonalSettingsReducer'

function expectErrors(
  result: Either<ReadonlyArray<string>, Configuration>,
  errors: ReadonlyArray<string>
): void {
  if (isLeft(result)) {
    expect(result.left).toEqual(errors)
  } else {
    fail(
      'Expected result to contain left(errors) but it was right(configuration)'
    )
  }
}

describe('toConfiguration', () => {
  describe(feedsRoot, () => {
    it('parses valid to configuration', () => {
      const data: Configuration = {
        [feedsRoot]: {
          'some-tray-id': {
            url: 'some-url',
            trayId: 'some-tray-id',
            authType: AuthTypes.none,
            trackingMode: TrackingMode.everything,
            serverType: ServerTypes.generic,
          },
        },
      }
      const result = toConfiguration(data, DataSource.systemImport)
      if (isRight(result)) {
        expect(result.right.trays).toHaveProperty('some-tray-id')
      } else {
        fail(
          `Expected right(configuration) but got left([${result.left.join(
            ', '
          )}])`
        )
      }
    })

    it('rejects missing ID, as this is required to match projects to the owning feed', () => {
      const data = {
        [feedsRoot]: {
          'some-tray-id': {
            url: 'some-url',
            serverType: '',
          },
        },
      }
      const result = toConfiguration(data, DataSource.systemImport)
      expectErrors(result, [
        'Invalid value undefined supplied to /trays/some-tray-id/trayId expected string',
      ])
    })

    it('rejects missing URL, as this is required to actually contact the CI server', () => {
      const data = {
        [feedsRoot]: {
          'some-tray-id': {
            trayId: 'some-id',
            serverType: '',
          },
        },
      }
      const result = toConfiguration(data, DataSource.systemImport)
      expectErrors(result, [
        'Invalid value undefined supplied to /trays/some-tray-id/url expected string',
      ])
    })

    it('rejects if the key does not match the ID', () => {
      const data = {
        [feedsRoot]: {
          'some-tray-id': {
            trayId: 'another-id',
            url: 'some-url',
            serverType: '',
          },
        },
      }
      const result = toConfiguration(data, DataSource.systemImport)
      expectErrors(result, [
        'Invalid value "another-id" supplied to /trays/some-tray-id/trayId expected "some-tray-id"',
      ])
    })
  })

  describe(remoteLocationsRoot, () => {
    it('parses valid to configuration', () => {
      const data: Configuration = {
        [remoteLocationsRoot]: {
          'some-id': {
            internalId: 'some-id',
            where: RemoteLocationOptions.custom,
            url: 'some-url',
          },
        },
      }
      const result = toConfiguration(data, DataSource.systemImport)
      if (isRight(result)) {
        expect(result.right.backupRemoteLocations).toHaveProperty('some-id')
      } else {
        fail(
          `Expected right(configuration) but got left([${result.left.join(
            ', '
          )}])`
        )
      }
    })

    it('rejects a missing internal ID, as this is required to actually do anything', () => {
      const data = {
        [remoteLocationsRoot]: {
          'some-internal-id': {
            where: 'custom',
            url: 'some-url',
          },
        },
      }
      const result = toConfiguration(data, DataSource.systemImport)
      expectErrors(result, [
        'Invalid value undefined supplied to /backupRemoteLocations/some-internal-id/internalId expected string',
      ])
    })

    it('rejects a missing URL, as this is required to actually do anything', () => {
      const data = {
        [remoteLocationsRoot]: {
          'some-internal-id': {
            internalId: 'some-internal-id',
            where: 'custom',
          },
        },
      }
      const result = toConfiguration(data, DataSource.systemImport)
      expectErrors(result, [
        'Invalid value undefined supplied to /backupRemoteLocations/some-internal-id/url expected string',
      ])
    })

    it('rejects a missing where, as this is required to actually do anything', () => {
      const data = {
        [remoteLocationsRoot]: {
          'some-internal-id': {
            internalId: 'some-internal-id',
            url: 'some-url',
          },
        },
      }
      const result = toConfiguration(data, DataSource.systemImport)
      expectErrors(result, [
        'Invalid value undefined supplied to /backupRemoteLocations/some-internal-id/where expected "custom" | "github" | "gitlab"',
      ])
    })

    it('rejects if the key does not match the internal ID', () => {
      const data = {
        [remoteLocationsRoot]: {
          'some-id': {
            internalId: 'another-id',
            where: 'custom',
            url: 'some-url',
          },
        },
      }
      const result = toConfiguration(data, DataSource.systemImport)
      expectErrors(result, [
        'Invalid value "another-id" supplied to /backupRemoteLocations/some-id/internalId expected "some-id"',
      ])
    })
  })

  it('removes unknown properties', () => {
    const data = { foo: 'bar' }
    const result = toConfiguration(data, DataSource.systemImport)
    expect(isRight(result)).toBeTruthy()
    if (isRight(result)) {
      expect(result.right).not.toHaveProperty('foo')
    }
  })

  it('keeps known properties', () => {
    const data = { [feedsRoot]: {} }
    const result = toConfiguration(data, DataSource.systemImport)
    expect(isRight(result)).toBeTruthy()
    if (isRight(result)) {
      expect(result.right).toEqual(expect.objectContaining({ trays: {} }))
    }
  })

  it('removes personal settings when a user imports', () => {
    const data = {
      [personalSettingsRoot]: {
        allowSystemNotifications: true,
        allowAudioNotifications: true,
      },
    }
    const result = toConfiguration(data, DataSource.userImport)
    expect(isRight(result)).toBeTruthy()
    if (isRight(result)) {
      expect(result.right).not.toHaveProperty(personalSettingsRoot)
    }
  })

  it('keeps personal settings when loading from browser storage', () => {
    const data = {
      [personalSettingsRoot]: {
        allowSystemNotifications: true,
        allowAudioNotifications: true,
      },
    }
    const result = toConfiguration(data, DataSource.systemImport)
    expect(isRight(result)).toBeTruthy()
    if (isRight(result)) {
      expect(result.right).toHaveProperty(personalSettingsRoot)
    }
  })
})

describe('toExportableConfigurationJson', () => {
  it('removes timestamps from remote backups as they should be the last time those action were done on this instance of Nevergreen', () => {
    const state = buildState({
      [remoteLocationsRoot]: {
        internalId: buildRemoteBackupLocation({
          exportTimestamp: 'some-export-timestamp',
          importTimestamp: 'some-import-timestamp',
        }),
      },
    })
    const exportable = toExportableConfigurationJson(state)
    expect(exportable).not.toMatch('"exportTimestamp": "some-export-timestamp"')
    expect(exportable).not.toMatch('"importTimestamp": "some-import-timestamp"')
  })

  it('removes personal settings which are specific to the current user', () => {
    const state = buildState({
      [personalSettingsRoot]: {
        allowSystemNotifications: true,
        allowAudioNotifications: true,
      },
    })
    const exportable = toExportableConfigurationJson(state)
    expect(exportable).not.toMatch('"personal": {')
  })
})
