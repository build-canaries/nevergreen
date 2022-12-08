import { Migrate } from './index'
import { moveData } from '../Migrate'

export const id = '012_MoveNotificationSettings'

export const migrate: Migrate = (data) => {
  moveData(
    data,
    'settings.enableNewVersionCheck',
    'notifications.enableNewVersionCheck'
  )
  moveData(
    data,
    'settings.showSystemNotifications',
    'notifications.showSystemNotifications'
  )
  moveData(
    data,
    'settings.playBrokenBuildSoundFx',
    'notifications.playBrokenBuildSoundFx'
  )
  moveData(
    data,
    'settings.brokenBuildSoundFx',
    'notifications.brokenBuildSoundFx'
  )
}
