import { migrate } from './015_MigrateRemoteLocationTimestamps'
import { personalSettingsRoot } from '../../settings/PersonalSettingsReducer'
import { remoteLocationsRoot } from '../../settings/backup/RemoteLocationsReducer'

it('should migrate existing remote location timestamps', () => {
  const data = {
    [remoteLocationsRoot]: {
      locationId1: {
        exportTimestamp: '1',
        importTimestamp: '2',
      },
      locationId2: {
        exportTimestamp: '3',
        importTimestamp: '4',
      },
    },
  }
  migrate(data)
  expect(data).toEqual({
    [remoteLocationsRoot]: {
      locationId1: {},
      locationId2: {},
    },
    [personalSettingsRoot]: {
      backupRemoteLocations: {
        locationId1: {
          exportTimestamp: '1',
          importTimestamp: '2',
        },
        locationId2: {
          exportTimestamp: '3',
          importTimestamp: '4',
        },
      },
    },
  })
})
