import { Migrate } from './index'
import { moveData } from '../Migrate'
import { personalSettingsRoot } from '../../settings/PersonalSettingsReducer'

export const id = '014_MigratePersonalSettings'

export const migrate: Migrate = (data) => {
  moveData(data, 'notifications.allowAudioNotifications', [
    personalSettingsRoot,
    'allowAudioNotifications',
  ])
  moveData(data, 'notifications.allowSystemNotifications', [
    personalSettingsRoot,
    'allowSystemNotifications',
  ])
}
