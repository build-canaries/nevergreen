import {
  getBackupLocations,
  remoteLocationsRoot,
  reducer as remoteBackupReducer,
  RemoteLocationsState,
  removeBackup,
} from './RemoteLocationsReducer'
import { testReducer } from '../../testUtils/testHelpers'
import { buildRemoteBackupLocation, buildState } from '../../testUtils/builders'
import type { RootState } from '../../configuration/ReduxStore'
import { RecursivePartial } from '../../common/Types'
import { configurationImported } from './BackupActionCreators'
import { RemoteLocationOptions } from './RemoteLocationOptions'

const reducer = testReducer({
  [remoteLocationsRoot]: remoteBackupReducer,
})

function state(existing?: RecursivePartial<RemoteLocationsState>): RootState {
  return buildState({ [remoteLocationsRoot]: existing })
}

it('should return the state unmodified for an unknown action', () => {
  const existingState = state()
  const newState = reducer(existingState, { type: 'not-a-real-action' })
  expect(newState).toEqual(existingState)
})

describe(configurationImported.toString(), () => {
  describe('adding locations', () => {
    it('should add all locations if the existing state is empty', () => {
      const existingState = state()
      const remoteLocation = buildRemoteBackupLocation({
        internalId: 'some-id',
      })
      const action = configurationImported({
        [remoteLocationsRoot]: { 'some-id': remoteLocation },
      })
      const newState = reducer(existingState, action)
      expect(getBackupLocations(newState)).toHaveProperty(
        'some-id',
        remoteLocation
      )
    })

    it('should add custom locations with different URLs', () => {
      const existingState = state({
        'existing-id': buildRemoteBackupLocation({
          internalId: 'existing-id',
          where: RemoteLocationOptions.custom,
          url: 'a',
        }),
      })
      const action = configurationImported({
        [remoteLocationsRoot]: {
          'imported-id': buildRemoteBackupLocation({
            internalId: 'imported-id',
            where: RemoteLocationOptions.custom,
            url: 'b',
          }),
        },
      })

      const newState = reducer(existingState, action)

      expect(getBackupLocations(newState)).toHaveProperty('existing-id')
      expect(getBackupLocations(newState)).toHaveProperty('imported-id')
    })

    // Realistically this would never happen, but it's simple to handle so we do
    it.each([RemoteLocationOptions.gitHub, RemoteLocationOptions.gitLab])(
      'should add %s locations with different URLs even if external ID is the same',
      (where) => {
        const existingState = state({
          'existing-id': buildRemoteBackupLocation({
            internalId: 'existing-id',
            where,
            url: 'a',
            externalId: 'a',
          }),
        })
        const action = configurationImported({
          [remoteLocationsRoot]: {
            'imported-id': buildRemoteBackupLocation({
              internalId: 'imported-id',
              where,
              url: 'b',
              externalId: 'a',
            }),
          },
        })

        const newState = reducer(existingState, action)

        expect(getBackupLocations(newState)).toHaveProperty('existing-id')
        expect(getBackupLocations(newState)).toHaveProperty('imported-id')
      }
    )

    it.each([RemoteLocationOptions.gitHub, RemoteLocationOptions.gitLab])(
      'should add %s locations with same URL but different external ID',
      (where) => {
        const existingState = state({
          'existing-id': buildRemoteBackupLocation({
            internalId: 'existing-id',
            where,
            url: 'a',
            externalId: 'a',
          }),
        })
        const action = configurationImported({
          [remoteLocationsRoot]: {
            'imported-id': buildRemoteBackupLocation({
              internalId: 'imported-id',
              where,
              url: 'a',
              externalId: 'b',
            }),
          },
        })

        const newState = reducer(existingState, action)

        expect(getBackupLocations(newState)).toHaveProperty('existing-id')
        expect(getBackupLocations(newState)).toHaveProperty('imported-id')
      }
    )
  })

  describe('updating existing locations', () => {
    it('should update locations with the same internal ID', () => {
      const existingState = state({
        'some-id': buildRemoteBackupLocation({
          internalId: 'some-id',
          where: RemoteLocationOptions.gitHub,
          url: 'a',
          automaticallyExport: false,
          externalId: 'a',
          encryptedAccessToken: 'a',
          description: 'a',
          exportTimestamp: 'a',
          importTimestamp: 'a',
        }),
      })
      const remoteLocation = buildRemoteBackupLocation({
        internalId: 'some-id',
        where: RemoteLocationOptions.gitHub,
        url: 'b',
        automaticallyExport: true,
        externalId: 'b',
        encryptedAccessToken: 'b',
        description: 'b',
        exportTimestamp: 'b',
        importTimestamp: 'b',
      })
      const action = configurationImported({
        [remoteLocationsRoot]: { 'some-id': remoteLocation },
      })

      const newState = reducer(existingState, action)

      expect(getBackupLocations(newState)).toHaveProperty(
        'some-id',
        remoteLocation
      )
    })

    it('should update custom locations with the same URL regardless of internal ID', () => {
      const existingState = state({
        'some-id': buildRemoteBackupLocation({
          internalId: 'some-id',
          where: RemoteLocationOptions.custom,
          url: 'a',
        }),
      })
      const remoteLocation = buildRemoteBackupLocation({
        internalId: 'different-id',
        where: RemoteLocationOptions.custom,
        url: 'a',
      })
      const action = configurationImported({
        [remoteLocationsRoot]: { 'some-id': remoteLocation },
      })

      const newState = reducer(existingState, action)

      expect(getBackupLocations(newState)).not.toHaveProperty('some-id')
      expect(getBackupLocations(newState)).toHaveProperty(
        'different-id',
        remoteLocation
      )
    })

    it.each([RemoteLocationOptions.gitHub, RemoteLocationOptions.gitLab])(
      'should update %s locations with the same URL and external ID regardless of internal ID',
      (where) => {
        const existingState = state({
          'some-id': buildRemoteBackupLocation({
            internalId: 'some-id',
            where,
            url: 'a',
            externalId: 'a',
          }),
        })
        const remoteLocation = buildRemoteBackupLocation({
          internalId: 'different-id',
          where,
          url: 'a',
          externalId: 'a',
        })
        const action = configurationImported({
          [remoteLocationsRoot]: { 'some-id': remoteLocation },
        })

        const newState = reducer(existingState, action)

        expect(getBackupLocations(newState)).not.toHaveProperty('some-id')
        expect(getBackupLocations(newState)).toHaveProperty(
          'different-id',
          remoteLocation
        )
      }
    )
  })
})

describe(removeBackup.toString(), () => {
  it('should remove the location with the given internal ID', () => {
    const existingState = state({
      'some-id': buildRemoteBackupLocation({ internalId: 'some-id' }),
    })
    const action = removeBackup('some-id')
    const newState = reducer(existingState, action)
    expect(getBackupLocations(newState)).toEqual({})
  })
})
