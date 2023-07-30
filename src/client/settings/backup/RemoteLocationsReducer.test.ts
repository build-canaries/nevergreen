import {
  getBackupLocation,
  getBackupLocations,
  reducer as remoteBackupReducer,
  remoteLocationsRoot,
  RemoteLocationsState,
} from './RemoteLocationsReducer'
import { testReducer } from '../../testUtils/testHelpers'
import { buildRemoteBackupLocation, buildState } from '../../testUtils/builders'
import type { RootState } from '../../configuration/ReduxStore'
import { RecursivePartial } from '../../common/Types'
import { configurationImported } from './BackupActionCreators'
import { backupExported, removeBackupLocation } from './RemoteLocationsActions'

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
  it('should set the backup locations', () => {
    const existingState = state({
      oldId: buildRemoteBackupLocation({ internalId: 'oldId', url: 'a' }),
    })
    const remoteLocation = buildRemoteBackupLocation({
      internalId: 'newId',
      url: 'b',
    })
    const action = configurationImported({
      [remoteLocationsRoot]: { newId: remoteLocation },
    })
    const newState = reducer(existingState, action)
    expect(getBackupLocations(newState)).toEqual({
      newId: remoteLocation,
    })
  })

  it('should handle no remote locations root', () => {
    const remoteLocation = buildRemoteBackupLocation({
      internalId: 'id',
    })
    const existingState = state({ id: remoteLocation })
    const action = configurationImported({})
    const newState = reducer(existingState, action)
    expect(getBackupLocations(newState)).toEqual({
      id: remoteLocation,
    })
  })
})

describe(removeBackupLocation.toString(), () => {
  it('should remove the location with the given internal ID', () => {
    const existingState = state({
      'some-id': buildRemoteBackupLocation({ internalId: 'some-id' }),
    })
    const action = removeBackupLocation('some-id')
    const newState = reducer(existingState, action)
    expect(getBackupLocations(newState)).toEqual({})
  })
})

describe(backupExported.toString(), () => {
  it('should set the external id', () => {
    const existingState = state({
      'internal-id': buildRemoteBackupLocation({ externalId: '' }),
    })
    const action = backupExported('internal-id', 'external-id')
    const newState = reducer(existingState, action)
    expect(getBackupLocation('internal-id')(newState)).toEqual(
      expect.objectContaining({
        externalId: 'external-id',
      }),
    )
  })
})
