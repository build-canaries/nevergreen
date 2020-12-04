import {Configuration, DataSource, toConfiguration, toExportableConfigurationJson} from './Configuration'
import {Either, isLeft, isRight} from 'fp-ts/lib/Either'
import {buildRemoteBackupLocation, buildState} from '../testHelpers'
import {BACKUP_REMOTE_LOCATIONS_ROOT} from '../backup/remote/RemoteLocationsReducer'
import {SETTINGS_ROOT} from '../settings/SettingsReducer'
import {PROJECTS_ROOT} from '../tracking/ProjectsReducer'
import {TRAYS_ROOT} from '../tracking/TraysReducer'
import {APPLIED_MIGRATIONS_ROOT} from './MigrationsReducer'

function expectErrors(result: Either<ReadonlyArray<string>, Configuration>, errors: ReadonlyArray<string>): void {
  if (isLeft(result)) {
    expect(result.left).toEqual(errors)
  } else {
    fail('Expected result to contain left(errors) but it was right(configuration)')
  }
}

describe('toConfiguration', () => {

  describe(TRAYS_ROOT, () => {

    it('parses valid to configuration', () => {
      const data: Configuration = {
        [TRAYS_ROOT]: {
          'some-tray-id': {
            url: 'some-url',
            trayId: 'some-tray-id'
          }
        }
      }
      const result = toConfiguration(data, DataSource.BrowserStorage)
      if (isRight(result)) {
        expect(result.right.trays).toHaveProperty('some-tray-id')
      } else {
        fail(`Expected right(configuration) but got left([${result.left.join(', ')}])`)
      }
    })

    it('rejects missing ID, as this is required to match projects to the owning tray', () => {
      const data = {
        [TRAYS_ROOT]: {
          'some-tray-id': {
            url: 'some-url'
          }
        }
      }
      const result = toConfiguration(data, DataSource.BrowserStorage)
      expectErrors(result, ['Invalid value undefined supplied to /trays/some-tray-id/trayId expected string'])
    })

    it('rejects missing URL, as this is required to actually contact the CI server', () => {
      const data = {
        [TRAYS_ROOT]: {
          'some-tray-id': {
            trayId: 'some-id'
          }
        }
      }
      const result = toConfiguration(data, DataSource.BrowserStorage)
      expectErrors(result, ['Invalid value undefined supplied to /trays/some-tray-id/url expected string'])
    })

    it('rejects if the key does not match the ID', () => {
      const data = {
        [TRAYS_ROOT]: {
          'some-tray-id': {
            trayId: 'another-id',
            url: 'some-url'
          }
        }
      }
      const result = toConfiguration(data, DataSource.BrowserStorage)
      expectErrors(result, ['Invalid value "another-id" supplied to /trays/some-tray-id/trayId expected "some-tray-id"'])
    })
  })

  describe(PROJECTS_ROOT, () => {

    it('parses valid to configuration', () => {
      const data: Configuration = {
        [PROJECTS_ROOT]: {
          'some-tray-id': [{
            projectId: 'some-project-id',
            description: 'some-description',
            trayId: 'some-tray-id'
          }]
        },
        [APPLIED_MIGRATIONS_ROOT]: [
          // this migration needs to have been run otherwise it will update the description based on the name and stage
          {
            id: '007_SetProjectDescription',
            timestamp: '2020-08-08T01:57:14.285+01:00'
          }
        ]
      }
      const result = toConfiguration(data, DataSource.BrowserStorage)
      if (isRight(result)) {
        expect(result.right.projects).toHaveProperty('some-tray-id')
      } else {
        fail(`Expected right(configuration) but got left([${result.left.join(', ')}])`)
      }
    })

    it('rejects missing project ID, as this is required to select projects', () => {
      const data = {
        [PROJECTS_ROOT]: {
          'some-tray-id': [{
            description: 'some-description',
            trayId: 'some-tray-id'
          }]
        },
        [APPLIED_MIGRATIONS_ROOT]: [
          // this migration needs to have been run otherwise it will update the description based on the name and stage
          {
            id: '007_SetProjectDescription',
            timestamp: '2020-08-08T01:57:14.285+01:00'
          }
        ]
      }
      const result = toConfiguration(data, DataSource.BrowserStorage)
      expectErrors(result, ['Invalid value undefined supplied to /projects/some-tray-id/0/projectId expected string'])
    })

    it('rejects missing description, as this is required to display projects on the UI', () => {
      const data = {
        [PROJECTS_ROOT]: {
          'some-tray-id': [{
            projectId: 'some-id',
            trayId: 'some-tray-id'
          }]
        },
        [APPLIED_MIGRATIONS_ROOT]: [
          // this migration needs to have been run otherwise it will update the description based on the name and stage
          {
            id: '007_SetProjectDescription',
            timestamp: '2020-08-08T01:57:14.285+01:00'
          }
        ]
      }
      const result = toConfiguration(data, DataSource.BrowserStorage)
      expectErrors(result, ['Invalid value undefined supplied to /projects/some-tray-id/0/description expected string'])
    })

    it('rejects if the key does not match the tray ID', () => {
      const data = {
        [PROJECTS_ROOT]: {
          'some-tray-id': [{
            projectId: 'some-id',
            trayId: 'another-tray-id',
            description: 'some-description'
          }]
        },
        [APPLIED_MIGRATIONS_ROOT]: [
          // this migration needs to have been run otherwise it will correctly set all the tray IDs
          {
            id: '004_AddTrayIdToProjects',
            timestamp: '2020-08-08T01:57:14.280+01:00'
          },
          // this migration needs to have been run otherwise it will update the description based on the name and stage
          {
            id: '007_SetProjectDescription',
            timestamp: '2020-08-08T01:57:14.285+01:00'
          }
        ]
      }
      const result = toConfiguration(data, DataSource.BrowserStorage)
      expectErrors(result, ['Invalid value "another-tray-id" supplied to /projects/some-tray-id/0/trayId expected "some-tray-id"'])
    })
  })

  describe(BACKUP_REMOTE_LOCATIONS_ROOT, () => {

    it('parses valid to configuration', () => {
      const data: Configuration = {
        [BACKUP_REMOTE_LOCATIONS_ROOT]: {
          'some-id': {
            internalId: 'some-id',
            where: 'custom',
            url: 'some-url'
          }
        }
      }
      const result = toConfiguration(data, DataSource.BrowserStorage)
      if (isRight(result)) {
        expect(result.right.backupRemoteLocations).toHaveProperty('some-id')
      } else {
        fail(`Expected right(configuration) but got left([${result.left.join(', ')}])`)
      }
    })

    it('rejects a missing internal ID, as this is required to actually do anything', () => {
      const data = {
        [BACKUP_REMOTE_LOCATIONS_ROOT]: {
          'some-internal-id': {
            where: 'custom',
            url: 'some-url'
          }
        }
      }
      const result = toConfiguration(data, DataSource.BrowserStorage)
      expectErrors(result, ['Invalid value undefined supplied to /backupRemoteLocations/some-internal-id/internalId expected string'])
    })

    it('rejects a missing URL, as this is required to actually do anything', () => {
      const data = {
        [BACKUP_REMOTE_LOCATIONS_ROOT]: {
          'some-internal-id': {
            internalId: 'some-internal-id',
            where: 'custom'
          }
        }
      }
      const result = toConfiguration(data, DataSource.BrowserStorage)
      expectErrors(result, ['Invalid value undefined supplied to /backupRemoteLocations/some-internal-id/url expected string'])
    })

    it('rejects a missing where, as this is required to actually do anything', () => {
      const data = {
        [BACKUP_REMOTE_LOCATIONS_ROOT]: {
          'some-internal-id': {
            internalId: 'some-internal-id',
            url: 'some-url'
          }
        }
      }
      const result = toConfiguration(data, DataSource.BrowserStorage)
      expectErrors(result, ['Invalid value undefined supplied to /backupRemoteLocations/some-internal-id/where expected "custom" | "github" | "gitlab"'])
    })

    it('rejects if the key does not match the internal ID', () => {
      const data = {
        [BACKUP_REMOTE_LOCATIONS_ROOT]: {
          'some-id': {
            internalId: 'another-id',
            where: 'custom',
            url: 'some-url'
          }
        }
      }
      const result = toConfiguration(data, DataSource.BrowserStorage)
      expectErrors(result, ['Invalid value "another-id" supplied to /backupRemoteLocations/some-id/internalId expected "some-id"'])
    })
  })

  it('removes unknown properties', () => {
    const data = {foo: 'bar'}
    const result = toConfiguration(data, DataSource.BrowserStorage)
    expect(isRight(result)).toBeTruthy()
    if (isRight(result)) {
      expect(result.right).not.toHaveProperty('foo')
    }
  })

  it('keeps known properties', () => {
    const data = {[TRAYS_ROOT]: {}}
    const result = toConfiguration(data, DataSource.BrowserStorage)
    expect(isRight(result)).toBeTruthy()
    if (isRight(result)) {
      expect(result.right).toEqual(expect.objectContaining({trays: {}}))
    }
  })

  it('removes the show system notifications property when a user import, as this property is no longer exported (but this import could be from an old version)', () => {
    const data = {[SETTINGS_ROOT]: {showSystemNotifications: true}}
    const result = toConfiguration(data, DataSource.UserImport)
    expect(isRight(result)).toBeTruthy()
    if (isRight(result)) {
      expect(result.right).not.toHaveProperty('settings.showSystemNotifications')
    }
  })

  it('keeps the show system notifications property when loading from browser storage', () => {
    const data = {[SETTINGS_ROOT]: {showSystemNotifications: true}}
    const result = toConfiguration(data, DataSource.BrowserStorage)
    expect(isRight(result)).toBeTruthy()
    if (isRight(result)) {
      expect(result.right).toHaveProperty('settings.showSystemNotifications')
    }
  })
})

describe('toExportableConfigurationJson', () => {

  it('removes timestamps from remote backups as they should be the last time those action were done on this instance of Nevergreen', () => {
    const state = buildState({
      [BACKUP_REMOTE_LOCATIONS_ROOT]: {
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
      [SETTINGS_ROOT]: {
        showSystemNotifications: true
      }
    })
    const exportable = toExportableConfigurationJson(state)
    expect(exportable).not.toMatch('"showSystemNotifications": true')
  })
})
