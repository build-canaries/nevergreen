import {migrate} from './012_MoveNotificationSettings'
import {SETTINGS_ROOT} from '../../settings/SettingsReducer'
import {NOTIFICATIONS_ROOT} from '../../settings/notifications/NotificationsReducer'

it('should return the given data if it does not contain settings', () => {
  const data = {foo: 'bar'}
  migrate(data)
  expect(data).toEqual({foo: 'bar'})
})

it('should move settings to notifications', () => {
  const data = {
    [SETTINGS_ROOT]: {
      enableNewVersionCheck: true,
      showSystemNotifications: false,
      playBrokenBuildSoundFx: false,
      brokenBuildSoundFx: 'defaultSoundFx'
    }
  }
  migrate(data)
  expect(data).toEqual({
    [NOTIFICATIONS_ROOT]: {
      enableNewVersionCheck: true,
      showSystemNotifications: false,
      playBrokenBuildSoundFx: false,
      brokenBuildSoundFx: 'defaultSoundFx'
    },
    [SETTINGS_ROOT]: {}
  })
})

it('should keep all non notification settings', () => {
  const data = {
    [SETTINGS_ROOT]: {
      someKey: 'someValue'
    }
  }
  migrate(data)
  expect(data).toEqual({
    [SETTINGS_ROOT]: {someKey: 'someValue'}
  })
})
