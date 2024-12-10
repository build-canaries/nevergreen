import { render } from '../../testUtils/testHelpers'
import { screen, fireEvent } from '@testing-library/react'
import { NotificationSettingsPage } from './NotificationSettingsPage'
import {
  getEnableNewVersionCheck,
  notificationsRoot,
} from './NotificationsReducer'
import {
  getAllowAudioNotifications,
  getAudioNotificationVolume,
  personalSettingsRoot,
} from '../PersonalSettingsReducer'
import * as AudioPlayer from '../../common/AudioPlayer'

it('should allow for turning on and off checking for new versions', async () => {
  const state = {
    [notificationsRoot]: {
      enableNewVersionCheck: false,
    },
  }

  const { store, user } = render(<NotificationSettingsPage />, { state })
  await user.click(screen.getByLabelText('Check for new Nevergreen versions'))

  expect(getEnableNewVersionCheck(store.getState())).toBeTruthy()
})

it('should allow turning on and off play audio notifications', async () => {
  const state = {
    [personalSettingsRoot]: {
      allowAudioNotifications: false,
    },
  }

  const { store, user } = render(<NotificationSettingsPage />, { state })
  await user.click(screen.getByLabelText('Allow audio notifications'))

  expect(getAllowAudioNotifications(store.getState())).toBeTruthy()
})

it('should allow the audio notification volume to be changed and previewed', async () => {
  jest.spyOn(AudioPlayer, 'playAudio').mockResolvedValue()

  const state = {
    [personalSettingsRoot]: {
      allowAudioNotifications: true,
      audioNotificationVolume: 0.75,
    },
  }

  const { store, user } = render(<NotificationSettingsPage />, { state })
  // range input not supported by userEvent, see https://github.com/testing-library/user-event/issues/871
  fireEvent.change(screen.getByLabelText('Audio notification volume'), {
    target: { value: 0.5 },
  })
  await user.click(screen.getByRole('button', { name: 'Test audio volume' }))

  expect(getAudioNotificationVolume(store.getState())).toEqual(0.5)
  expect(AudioPlayer.playAudio).toHaveBeenCalledWith('test-file-stub', 0.5)
})
