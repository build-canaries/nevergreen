import { render } from '../../testUtils/testHelpers'
import { screen, waitFor } from '@testing-library/react'
import { getNotifications, notificationsRoot } from './NotificationsReducer'
import { AddNotificationPage } from './AddNotificationPage'
import { Prognosis } from '../../domain/Project'
import * as AudioPlayer from '../../common/AudioPlayer'
import { personalSettingsRoot } from '../PersonalSettingsReducer'

it.each([
  Prognosis.error,
  Prognosis.sick,
  Prognosis.sickBuilding,
  Prognosis.healthyBuilding,
  Prognosis.unknown,
  Prognosis.healthy,
])('should allow adding a %s notification', async (prognosis) => {
  const state = { [notificationsRoot]: {} }

  const { store, user } = render(<AddNotificationPage />, { state })
  await user.selectOptions(
    screen.getByLabelText('When transitioning to'),
    prognosis,
  )
  await user.click(screen.getByLabelText('Show system notification'))
  await user.type(screen.getByLabelText('Play audio'), '/some-sfx.mp3')
  await user.click(screen.getByRole('button', { name: 'Add notification' }))

  expect(getNotifications(store.getState())).toEqual(
    expect.objectContaining({
      [prognosis]: {
        systemNotification: true,
        sfx: '/some-sfx.mp3',
      },
    }),
  )
  await waitFor(() => {
    expect(window.location.pathname).toMatch('/settings/notifications')
  })
})

it('should be able to preview audio files', async () => {
  jest.spyOn(AudioPlayer, 'playAudio').mockResolvedValue()
  jest.spyOn(AudioPlayer, 'stopAudio').mockReturnValue()
  const state = { [notificationsRoot]: {} }

  const { user } = render(<AddNotificationPage />, { state })
  await user.type(screen.getByLabelText('Play audio'), '/some-sfx.mp3')
  await user.click(screen.getByRole('button', { name: 'Play' }))
  await user.click(screen.getByRole('button', { name: 'Stop' }))

  expect(AudioPlayer.playAudio).toHaveBeenCalledWith(
    '/some-sfx.mp3',
    1,
    expect.anything(),
  )
  expect(AudioPlayer.stopAudio).toHaveBeenCalledWith('/some-sfx.mp3')
})

it('should be able to cancel without adding', async () => {
  const state = { [notificationsRoot]: {} }

  const { store, user } = render(<AddNotificationPage />, { state })
  await user.click(screen.getByRole('button', { name: 'Cancel' }))

  expect(getNotifications(store.getState())).toEqual({})
  expect(window.location.pathname).toMatch('/settings/notifications')
})

describe('warnings', () => {
  it('system notifications have not been allowed', () => {
    const state = {
      [personalSettingsRoot]: {
        allowSystemNotifications: false,
        allowAudioNotifications: true,
      },
    }

    render(<AddNotificationPage />, { state })

    expect(
      screen.getByText('System notification have not been allowed yet.'),
    ).toBeInTheDocument()
    expect(
      screen.getByText('They will need to be allowed before they will show.'),
    ).toBeInTheDocument()
  })

  it('audio notifications have not been allowed', () => {
    const state = {
      [personalSettingsRoot]: {
        allowSystemNotifications: true,
        allowAudioNotifications: false,
      },
    }

    render(<AddNotificationPage />, { state })

    expect(
      screen.getByText('Audio notification have not been allowed yet.'),
    ).toBeInTheDocument()
    expect(
      screen.getByText('They will need to be allowed before they will play.'),
    ).toBeInTheDocument()
  })

  it('system and audio notifications have not been allowed', () => {
    const state = {
      [personalSettingsRoot]: {
        allowSystemNotifications: false,
        allowAudioNotifications: false,
      },
    }

    render(<AddNotificationPage />, { state })

    expect(
      screen.getByText(
        'System and audio notifications have not been allowed yet.',
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'They will need to be allowed before they will show or play.',
      ),
    ).toBeInTheDocument()
  })
})
