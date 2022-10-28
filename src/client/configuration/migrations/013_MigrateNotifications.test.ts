import {migrate} from './013_MigrateNotifications'
import {NOTIFICATIONS_ROOT} from '../../settings/notifications/NotificationsReducer'

it('should return the given data if it does not contain settings', () => {
  const data = {foo: 'bar'}
  migrate(data)
  expect(data).toEqual({foo: 'bar'})
})

it('should add sick and healthy notifications if sfx is set and system notifications are on', () => {
  const data = {
    [NOTIFICATIONS_ROOT]: {
      showSystemNotifications: true,
      brokenBuildSoundFx: 'some-sfx.mp3'
    }
  }
  migrate(data)
  expect(data).toEqual({
    [NOTIFICATIONS_ROOT]: {
      allowSystemNotifications: true,
      notifications: {
        sick: {
          systemNotification: true,
          sfx: 'some-sfx.mp3'
        },
        healthy: {
          systemNotification: true,
          sfx: ''
        }
      }
    }
  })
})

it('should add sick notification if sfx is set but system notifications are off', () => {
  const data = {
    [NOTIFICATIONS_ROOT]: {
      showSystemNotifications: false,
      brokenBuildSoundFx: 'some-sfx.mp3'
    }
  }
  migrate(data)
  expect(data).toEqual({
    [NOTIFICATIONS_ROOT]: {
      allowSystemNotifications: false,
      notifications: {
        sick: {
          systemNotification: false,
          sfx: 'some-sfx.mp3'
        }
      }
    }
  })
})

it('should add sick and healthy notifications system notifications are on', () => {
  const data = {
    [NOTIFICATIONS_ROOT]: {
      showSystemNotifications: true
    }
  }
  migrate(data)
  expect(data).toEqual({
    [NOTIFICATIONS_ROOT]: {
      allowSystemNotifications: true,
      notifications: {
        sick: {
          systemNotification: true,
          sfx: ''
        },
        healthy: {
          systemNotification: true,
          sfx: ''
        }
      }
    }
  })
})

it('should not add any notifications if sfx is not set and system notifications are off', () => {
  const data = {
    [NOTIFICATIONS_ROOT]: {
      showSystemNotifications: false
    }
  }
  migrate(data)
  expect(data).toEqual({
    [NOTIFICATIONS_ROOT]: {
      allowSystemNotifications: false
    }
  })
})

it('should migrate playBrokenBuildSoundFx to allowAudioNotifications', () => {
  const data = {
    [NOTIFICATIONS_ROOT]: {
      playBrokenBuildSoundFx: true
    }
  }
  migrate(data)
  expect(data).toEqual({
    [NOTIFICATIONS_ROOT]: {
      allowAudioNotifications: true
    }
  })
})
