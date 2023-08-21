import { Migrate } from './index'
import { forEachObjectAt, moveData } from '../Migrate'
import set from 'lodash/set'

export const id = '015_MigrateRemoteLocationTimestamps'

export const migrate: Migrate = (data) => {
  set(data, 'personal.backupRemoteLocations', {})
  forEachObjectAt(data, 'backupRemoteLocations', (_, id) => {
    moveData(
      data,
      ['backupRemoteLocations', id, 'exportTimestamp'],
      ['personal', 'backupRemoteLocations', id, 'exportTimestamp'],
    )
    moveData(
      data,
      ['backupRemoteLocations', id, 'importTimestamp'],
      ['personal', 'backupRemoteLocations', id, 'importTimestamp'],
    )
  })
}
