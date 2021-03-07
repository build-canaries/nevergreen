import {BACKUP_REMOTE_LOCATIONS_ROOT, getBackupLocations, reduce, RemoteLocationsState} from './RemoteLocationsReducer'
import {Actions} from '../../Actions'
import {buildRemoteBackupLocation, buildState, testReducer} from '../../testHelpers'
import {State} from '../../Reducer'
import {RecursivePartial} from '../../common/Types'
import {configurationImported, removeBackup} from './BackupActionCreators'
import {RemoteLocationOptions} from './RemoteLocationOptions'

const reducer = testReducer({
  [BACKUP_REMOTE_LOCATIONS_ROOT]: reduce
})

function state(existing?: RecursivePartial<RemoteLocationsState>): State {
  return buildState({[BACKUP_REMOTE_LOCATIONS_ROOT]: existing})
}

it('should return the state unmodified for an unknown action', () => {
  const existingState = state()
  const newState = reducer(existingState, {type: 'not-a-real-action'})
  expect(newState).toEqual(existingState)
})

describe(Actions.CONFIGURATION_IMPORTED, () => {

  describe('adding locations', () => {

    it('should add all locations if the existing state is empty', () => {
      const existingState = state()
      const remoteLocation = buildRemoteBackupLocation({internalId: 'some-id'})
      const action = configurationImported({[BACKUP_REMOTE_LOCATIONS_ROOT]: {'some-id': remoteLocation}})
      const newState = reducer(existingState, action)
      expect(getBackupLocations(newState)).toHaveProperty('some-id', remoteLocation)
    })

    it('should add custom locations with different URLs', () => {
      const existingState = state({
        'existing-id': buildRemoteBackupLocation({
          internalId: 'existing-id',
          where: RemoteLocationOptions.Custom,
          url: 'a'
        })
      })
      const action = configurationImported({
        [BACKUP_REMOTE_LOCATIONS_ROOT]: {
          'imported-id': buildRemoteBackupLocation({
            internalId: 'imported-id',
            where: RemoteLocationOptions.Custom,
            url: 'b'
          })
        }
      })

      const newState = reducer(existingState, action)

      expect(getBackupLocations(newState)).toHaveProperty('existing-id')
      expect(getBackupLocations(newState)).toHaveProperty('imported-id')
    })

    // Realistically this would never happen, but it's simple to handle so we do
    it.each([
      RemoteLocationOptions.GitHub,
      RemoteLocationOptions.GitLab
    ])('should add %s locations with different URLs even if external ID is the same', (where) => {
      const existingState = state({
        'existing-id': buildRemoteBackupLocation({
          internalId: 'existing-id',
          where,
          url: 'a',
          externalId: 'a'
        })
      })
      const action = configurationImported({
        [BACKUP_REMOTE_LOCATIONS_ROOT]: {
          'imported-id': buildRemoteBackupLocation({
            internalId: 'imported-id',
            where,
            url: 'b',
            externalId: 'a'
          })
        }
      })

      const newState = reducer(existingState, action)

      expect(getBackupLocations(newState)).toHaveProperty('existing-id')
      expect(getBackupLocations(newState)).toHaveProperty('imported-id')
    })

    it.each([
      RemoteLocationOptions.GitHub,
      RemoteLocationOptions.GitLab
    ])('should add %s locations with same URL but different external ID', (where) => {
      const existingState = state({
        'existing-id': buildRemoteBackupLocation({
          internalId: 'existing-id',
          where,
          url: 'a',
          externalId: 'a'
        })
      })
      const action = configurationImported({
        [BACKUP_REMOTE_LOCATIONS_ROOT]: {
          'imported-id': buildRemoteBackupLocation({
            internalId: 'imported-id',
            where,
            url: 'a',
            externalId: 'b'
          })
        }
      })

      const newState = reducer(existingState, action)

      expect(getBackupLocations(newState)).toHaveProperty('existing-id')
      expect(getBackupLocations(newState)).toHaveProperty('imported-id')
    })
  })

  describe('updating existing locations', () => {

    it('should update locations with the same internal ID', () => {
      const existingState = state({
        'some-id': buildRemoteBackupLocation({
          internalId: 'some-id',
          where: RemoteLocationOptions.GitHub,
          url: 'a',
          automaticallyExport: false,
          externalId: 'a',
          encryptedAccessToken: 'a',
          description: 'a',
          exportTimestamp: 'a',
          importTimestamp: 'a'
        })
      })
      const remoteLocation = buildRemoteBackupLocation({
        internalId: 'some-id',
        where: RemoteLocationOptions.GitHub,
        url: 'b',
        automaticallyExport: true,
        externalId: 'b',
        encryptedAccessToken: 'b',
        description: 'b',
        exportTimestamp: 'b',
        importTimestamp: 'b'
      })
      const action = configurationImported({[BACKUP_REMOTE_LOCATIONS_ROOT]: {'some-id': remoteLocation}})

      const newState = reducer(existingState, action)

      expect(getBackupLocations(newState)).toHaveProperty('some-id', remoteLocation)
    })

    it('should update custom locations with the same URL regardless of internal ID', () => {
      const existingState = state({
        'some-id': buildRemoteBackupLocation({
          internalId: 'some-id',
          where: RemoteLocationOptions.Custom,
          url: 'a'
        })
      })
      const remoteLocation = buildRemoteBackupLocation({
        internalId: 'different-id',
        where: RemoteLocationOptions.Custom,
        url: 'a'
      })
      const action = configurationImported({[BACKUP_REMOTE_LOCATIONS_ROOT]: {'some-id': remoteLocation}})

      const newState = reducer(existingState, action)

      expect(getBackupLocations(newState)).not.toHaveProperty('some-id')
      expect(getBackupLocations(newState)).toHaveProperty('different-id', remoteLocation)
    })

    it.each([
      RemoteLocationOptions.GitHub,
      RemoteLocationOptions.GitLab
    ])('should update %s locations with the same URL and external ID regardless of internal ID', (where) => {
      const existingState = state({
        'some-id': buildRemoteBackupLocation({
          internalId: 'some-id',
          where,
          url: 'a',
          externalId: 'a'
        })
      })
      const remoteLocation = buildRemoteBackupLocation({
        internalId: 'different-id',
        where,
        url: 'a',
        externalId: 'a'
      })
      const action = configurationImported({[BACKUP_REMOTE_LOCATIONS_ROOT]: {'some-id': remoteLocation}})

      const newState = reducer(existingState, action)

      expect(getBackupLocations(newState)).not.toHaveProperty('some-id')
      expect(getBackupLocations(newState)).toHaveProperty('different-id', remoteLocation)
    })
  })
})

describe(Actions.BACKUP_REMOVE, () => {

  it('should remove the location with the given internal ID', () => {
    const existingState = state({
      'some-id': buildRemoteBackupLocation({internalId: 'some-id'})
    })
    const action = removeBackup('some-id')
    const newState = reducer(existingState, action)
    expect(getBackupLocations(newState)).toEqual({})
  })
})
