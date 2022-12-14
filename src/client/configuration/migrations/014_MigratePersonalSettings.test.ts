import { migrate } from './014_MigratePersonalSettings'
import { notificationsRoot } from '../../settings/notifications/NotificationsReducer'
import { personalSettingsRoot } from '../../settings/PersonalSettingsReducer'

it('should migrate allowAudioNotifications', () => {
  const data = {
    [notificationsRoot]: {
      allowAudioNotifications: true,
    },
  }
  migrate(data)
  expect(data).toEqual({
    [notificationsRoot]: {},
    [personalSettingsRoot]: {
      allowAudioNotifications: true,
    },
  })
})

it('should migrate allowSystemNotifications', () => {
  const data = {
    [notificationsRoot]: {
      allowSystemNotifications: true,
    },
  }
  migrate(data)
  expect(data).toEqual({
    [notificationsRoot]: {},
    [personalSettingsRoot]: {
      allowSystemNotifications: true,
    },
  })
})
