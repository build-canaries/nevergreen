import { migrate } from './013_MigrateNotifications'
import { notificationsRoot } from '../../settings/notifications/NotificationsReducer'

it('should add sick and healthy notifications if sfx is set and system notifications are on', () => {
  const data = {
    [notificationsRoot]: {
      showSystemNotifications: true,
      brokenBuildSoundFx: 'some-sfx.mp3',
    },
  }
  migrate(data)
  expect(data).toEqual({
    [notificationsRoot]: {
      allowSystemNotifications: true,
      notifications: {
        sick: {
          systemNotification: true,
          sfx: 'some-sfx.mp3',
        },
        healthy: {
          systemNotification: true,
          sfx: '',
        },
      },
    },
  })
})

it('should add sick notification if sfx is set but system notifications are off', () => {
  const data = {
    [notificationsRoot]: {
      showSystemNotifications: false,
      brokenBuildSoundFx: 'some-sfx.mp3',
    },
  }
  migrate(data)
  expect(data).toEqual({
    [notificationsRoot]: {
      allowSystemNotifications: false,
      notifications: {
        sick: {
          systemNotification: false,
          sfx: 'some-sfx.mp3',
        },
      },
    },
  })
})

it('should add sick and healthy notifications system notifications are on', () => {
  const data = {
    [notificationsRoot]: {
      showSystemNotifications: true,
    },
  }
  migrate(data)
  expect(data).toEqual({
    [notificationsRoot]: {
      allowSystemNotifications: true,
      notifications: {
        sick: {
          systemNotification: true,
          sfx: '',
        },
        healthy: {
          systemNotification: true,
          sfx: '',
        },
      },
    },
  })
})

it('should not add any notifications if sfx is not set and system notifications are off', () => {
  const data = {
    [notificationsRoot]: {
      showSystemNotifications: false,
    },
  }
  migrate(data)
  expect(data).toEqual({
    [notificationsRoot]: {
      allowSystemNotifications: false,
    },
  })
})

it('should migrate playBrokenBuildSoundFx to allowAudioNotifications', () => {
  const data = {
    [notificationsRoot]: {
      playBrokenBuildSoundFx: true,
    },
  }
  migrate(data)
  expect(data).toEqual({
    [notificationsRoot]: {
      allowAudioNotifications: true,
    },
  })
})
