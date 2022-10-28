import {Migrate} from './index'
import {copyData, moveData} from '../Migrate'
import get from 'lodash/get'
import set from 'lodash/set'
import {isNotBlank} from '../../common/Utils'

export const id = '013_MigrateNotifications'

export const migrate: Migrate = (data) => {
  moveData(data, 'notifications.playBrokenBuildSoundFx', 'notifications.allowAudioNotifications')
  if (get(data, 'notifications.showSystemNotifications')) {
    set(data, 'notifications.notifications.sick.sfx', '')
    copyData(data, 'notifications.showSystemNotifications', 'notifications.notifications.sick.systemNotification')
    set(data, 'notifications.notifications.healthy.sfx', '')
    copyData(data, 'notifications.showSystemNotifications', 'notifications.notifications.healthy.systemNotification')
  }
  if (isNotBlank(get(data, 'notifications.brokenBuildSoundFx'))) {
    moveData(data, 'notifications.brokenBuildSoundFx', 'notifications.notifications.sick.sfx')
    if (!get(data, 'notifications.showSystemNotifications')) {
      set(data, 'notifications.notifications.sick.systemNotification', false)
    }
  }
  moveData(data, 'notifications.showSystemNotifications', 'notifications.allowSystemNotifications')
}
