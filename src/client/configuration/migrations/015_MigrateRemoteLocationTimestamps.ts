import { Migrate } from './index'
import { forEachObjectAt, moveData } from '../Migrate'
import { personalSettingsRoot } from '../../settings/PersonalSettingsReducer'
import { remoteLocationsRoot } from '../../settings/backup/RemoteLocationsReducer'
import set from 'lodash/set'

export const id = '015_MigrateRemoteLocationTimestamps'

export const migrate: Migrate = (data) => {
  set(data, [personalSettingsRoot, 'backupRemoteLocations'], {})
  forEachObjectAt(data, remoteLocationsRoot, (_, id) => {
    moveData(
      data,
      [remoteLocationsRoot, id, 'exportTimestamp'],
      [personalSettingsRoot, 'backupRemoteLocations', id, 'exportTimestamp']
    )
    moveData(
      data,
      [remoteLocationsRoot, id, 'importTimestamp'],
      [personalSettingsRoot, 'backupRemoteLocations', id, 'importTimestamp']
    )
  })
}
