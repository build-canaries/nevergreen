import { migrate } from './012_MoveNotificationSettings'

it('should return the given data if it does not contain settings', () => {
  const data = { foo: 'bar' }
  migrate(data)
  expect(data).toEqual({ foo: 'bar' })
})

it('should move settings to notifications', () => {
  const data = {
    settings: {
      enableNewVersionCheck: true,
      showSystemNotifications: false,
      playBrokenBuildSoundFx: false,
      brokenBuildSoundFx: 'defaultSoundFx',
    },
  }
  migrate(data)
  expect(data).toEqual({
    notifications: {
      enableNewVersionCheck: true,
      showSystemNotifications: false,
      playBrokenBuildSoundFx: false,
      brokenBuildSoundFx: 'defaultSoundFx',
    },
    settings: {},
  })
})

it('should keep all non notification settings', () => {
  const data = {
    settings: {
      someKey: 'someValue',
    },
  }
  migrate(data)
  expect(data).toEqual({
    settings: { someKey: 'someValue' },
  })
})
