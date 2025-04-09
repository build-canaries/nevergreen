import {
  Configuration,
  DataSource,
  toConfiguration,
  toExportableConfigurationJson,
} from './Configuration'
import { buildState } from '../testUtils/builders'
import { remoteLocationsRoot } from '../settings/backup/RemoteLocationsReducer'
import {
  AuthTypes,
  feedsRoot,
  ServerTypes,
  TrackingMode,
} from '../settings/tracking/FeedsReducer'
import { RemoteLocationOptions } from '../settings/backup/RemoteLocationOptions'
import { personalSettingsRoot } from '../settings/PersonalSettingsReducer'
import { prognosisSettingsRoot } from '../settings/prognosis/PrognosisSettingsReducer'
import { Prognosis } from '../domain/Project'

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
      const configuration = toConfiguration(data, DataSource.systemImport)
      expect(configuration.trays).toHaveProperty('some-tray-id')
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
      expect(() => toConfiguration(data, DataSource.systemImport)).toThrow()
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
      expect(() => toConfiguration(data, DataSource.systemImport)).toThrow()
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
      expect(() => toConfiguration(data, DataSource.systemImport)).toThrow()
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
      const configuration = toConfiguration(data, DataSource.systemImport)
      expect(configuration.backupRemoteLocations).toHaveProperty('some-id')
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
      expect(() => toConfiguration(data, DataSource.systemImport)).toThrow()
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
      expect(() => toConfiguration(data, DataSource.systemImport)).toThrow()
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
      expect(() => toConfiguration(data, DataSource.systemImport)).toThrow()
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
      expect(() => toConfiguration(data, DataSource.systemImport)).toThrow()
    })
  })

  describe(prognosisSettingsRoot, () => {
    it('allows partial configuration to be imported', () => {
      const data: Configuration = {
        [prognosisSettingsRoot]: {
          [Prognosis.sick]: {
            systemNotification: true,
            sfx: 'a',
          },
        },
      }
      const configuration = toConfiguration(data, DataSource.systemImport)
      expect(configuration.prognosis?.sick).not.toBeNull()
    })
  })

  it('removes unknown properties', () => {
    const data = { foo: 'bar' }
    const configuration = toConfiguration(data, DataSource.systemImport)
    expect(configuration).not.toHaveProperty('foo')
  })

  it('keeps known properties', () => {
    const data = { [feedsRoot]: {} }
    const configuration = toConfiguration(data, DataSource.systemImport)
    expect(configuration).toEqual(expect.objectContaining({ trays: {} }))
  })

  it('removes personal settings when a user imports', () => {
    const data = {
      [personalSettingsRoot]: {
        allowSystemNotifications: true,
        allowAudioNotifications: true,
      },
    }
    const configuration = toConfiguration(data, DataSource.userImport)
    expect(configuration).not.toHaveProperty(personalSettingsRoot)
  })

  it('keeps personal settings when loading from browser storage', () => {
    const data = {
      [personalSettingsRoot]: {
        allowSystemNotifications: true,
        allowAudioNotifications: true,
        backupRemoteLocations: {},
      },
    }
    const configuration = toConfiguration(data, DataSource.systemImport)
    expect(configuration).toHaveProperty(personalSettingsRoot)
  })
})

describe('toExportableConfigurationJson', () => {
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
