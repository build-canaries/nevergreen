import {migrate} from './012_MoveNotificationSettings'
import {settingsRoot} from '../../settings/SettingsReducer'
import {notificationsRoot} from '../../settings/notifications/NotificationsReducer'

it('should return the given data if it does not contain settings', () => {
  const data = {foo: 'bar'}
  migrate(data)
  expect(data).toEqual({foo: 'bar'})
})

it('should move settings to notifications', () => {
  const data = {
    [settingsRoot]: {
      enableNewVersionCheck: true,
      showSystemNotifications: false,
      playBrokenBuildSoundFx: false,
      brokenBuildSoundFx: 'defaultSoundFx'
    }
  }
  migrate(data)
  expect(data).toEqual({
    [notificationsRoot]: {
      enableNewVersionCheck: true,
      showSystemNotifications: false,
      playBrokenBuildSoundFx: false,
      brokenBuildSoundFx: 'defaultSoundFx'
    },
    [settingsRoot]: {}
  })
})

it('should keep all non notification settings', () => {
  const data = {
    [settingsRoot]: {
      someKey: 'someValue'
    }
  }
  migrate(data)
  expect(data).toEqual({
    [settingsRoot]: {someKey: 'someValue'}
  })
})
