import {
  getAllowAudioNotifications,
  getAllowSystemNotifications,
  getAudioNotificationVolume,
  getBackupLocationTimestamps,
  personalSettingsRoot,
  PersonalSettingsState,
  reducer as personalSettingsReducer,
  setAllowAudioNotifications,
  setAllowSystemNotifications,
  setAudioNotificationVolume,
} from './PersonalSettingsReducer'
import { setSystemTime, testReducer } from '../testUtils/testHelpers'
import { buildRemoteBackupLocation, buildState } from '../testUtils/builders'
import { RecursivePartial } from '../common/Types'
import { configurationImported } from './backup/BackupActionCreators'
import {
  addBackupLocation,
  backupExported,
  removeBackupLocation,
} from './backup/RemoteLocationsActions'
import { remoteLocationsRoot } from './backup/RemoteLocationsReducer'

const reducer = testReducer({
  [personalSettingsRoot]: personalSettingsReducer,
})

function state(existing?: RecursivePartial<PersonalSettingsState>) {
  return buildState({ [personalSettingsRoot]: existing })
}

it('should return the state unmodified for an unknown action', () => {
  const existingState = state()
  const newState = reducer(existingState, { type: 'not-a-real-action' })
  expect(newState).toEqual(existingState)
})

describe(configurationImported.toString(), () => {
  it('should overwrite any included state', () => {
    const existingState = state({
      allowAudioNotifications: false,
      allowSystemNotifications: false,
      backupRemoteLocations: {},
    })
    const action = configurationImported({
      [personalSettingsRoot]: {
        allowAudioNotifications: true,
        allowSystemNotifications: true,
        backupRemoteLocations: {
          locationId: {},
        },
      },
    })
    const newState = reducer(existingState, action)
    expect(getAllowAudioNotifications(newState)).toBeTruthy()
    expect(getAllowSystemNotifications(newState)).toBeTruthy()
    expect(getBackupLocationTimestamps('locationId')(newState)).toEqual({})
  })

  it('should handle no personal settings root', () => {
    const existingState = state({
      allowAudioNotifications: false,
      allowSystemNotifications: false,
      backupRemoteLocations: {},
    })
    const action = configurationImported({})
    const newState = reducer(existingState, action)
    expect(getAllowAudioNotifications(newState)).toBeFalsy()
    expect(getAllowSystemNotifications(newState)).toBeFalsy()
  })

  it('should removed remote locations timestamps for removed locations', () => {
    const existingState = state({
      allowAudioNotifications: false,
      allowSystemNotifications: false,
      backupRemoteLocations: {
        oldId: {
          importTimestamp: 'irrelevant',
          exportTimestamp: 'irrelevant',
        },
      },
    })
    const action = configurationImported({
      [remoteLocationsRoot]: {},
    })
    const newState = reducer(existingState, action)
    expect(getBackupLocationTimestamps('oldId')(newState)).toBeUndefined()
  })

  it('should update the import timestamp if the configuration was imported from a matching location id', () => {
    setSystemTime('2022-12-13T17:24:00Z')
    const existingState = state({
      allowAudioNotifications: false,
      allowSystemNotifications: false,
      backupRemoteLocations: {
        locationId: {
          importTimestamp: '',
        },
      },
    })
    const location = buildRemoteBackupLocation({ internalId: 'locationId' })
    const action = configurationImported(
      {
        [remoteLocationsRoot]: {
          locationId: location,
        },
      },
      location,
    )
    const newState = reducer(existingState, action)
    expect(getBackupLocationTimestamps('locationId')(newState)).toEqual({
      importTimestamp: expect.stringMatching(/2022-12-13T17:24:00/) as string,
    })
  })
})

describe(setAllowAudioNotifications.toString(), () => {
  it('should set the broken build sounds enabled property', () => {
    const existingState = state({ allowAudioNotifications: false })
    const action = setAllowAudioNotifications(true)
    const newState = reducer(existingState, action)
    expect(getAllowAudioNotifications(newState)).toBeTruthy()
  })
})

describe(setAllowSystemNotifications.toString(), () => {
  it('should set the show browser notifications property', () => {
    const existingState = state({ allowSystemNotifications: false })
    const action = setAllowSystemNotifications(true)
    const newState = reducer(existingState, action)
    expect(getAllowSystemNotifications(newState)).toBeTruthy()
  })
})

describe(setAudioNotificationVolume.toString(), () => {
  it('should set the audio notification volume property', () => {
    const expectedVolume = 0.5
    const existingState = state({ audioNotificationVolume: 1 })
    const action = setAudioNotificationVolume(expectedVolume)
    const newState = reducer(existingState, action)
    expect(getAudioNotificationVolume(newState)).toEqual(expectedVolume)
  })
})

describe(addBackupLocation.toString(), () => {
  it('should add the location with the given internal ID', () => {
    const existingState = state({
      backupRemoteLocations: {},
    })
    const action = addBackupLocation(
      buildRemoteBackupLocation({ internalId: 'some-id' }),
    )
    const newState = reducer(existingState, action)
    expect(getBackupLocationTimestamps('some-id')(newState)).toEqual({})
  })
})

describe(removeBackupLocation.toString(), () => {
  it('should remove the location with the given internal ID', () => {
    const existingState = state({
      backupRemoteLocations: {
        'some-id': { importTimestamp: '1', exportTimestamp: '1' },
      },
    })
    const action = removeBackupLocation('some-id')
    const newState = reducer(existingState, action)
    expect(getBackupLocationTimestamps('some-id')(newState)).toBeUndefined()
  })
})

describe(backupExported.toString(), () => {
  it('should set the export timestamp', () => {
    setSystemTime('2022-12-13T17:24:00Z')
    const existingState = state({
      backupRemoteLocations: {
        'internal-id': {},
      },
    })
    const action = backupExported('internal-id', 'external-id')
    const newState = reducer(existingState, action)
    expect(getBackupLocationTimestamps('internal-id')(newState)).toEqual({
      exportTimestamp: expect.stringMatching(/2022-12-13T17:24:00/) as string,
    })
  })
})
