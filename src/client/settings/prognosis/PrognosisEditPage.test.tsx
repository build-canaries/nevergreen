import { render, waitForLocationToChange } from '../../testUtils/testHelpers'
import { screen } from '@testing-library/react'
import { Prognosis } from '../../domain/Project'
import * as AudioPlayer from '../../common/AudioPlayer'
import { personalSettingsRoot } from '../PersonalSettingsReducer'
import {
  AUDIO_NOT_ALLOWED_WARNING,
  LOW_CONTRAST_WARNING,
  PrognosisEditPage,
  SYSTEM_NOT_ALLOWED_WARNING,
} from './PrognosisEditPage'
import {
  getPrognosisSettings,
  prognosisSettingsRoot,
} from './PrognosisSettingsReducer'

it('should allow editing prognosis settings', async () => {
  const state = {
    [prognosisSettingsRoot]: {
      [Prognosis.sick]: {
        show: false,
        systemNotification: false,
        sfx: '',
        backgroundColour: '#aaaaaa',
        textColour: '#bbbbbb',
      },
    },
  }

  const { store, user } = render(
    <PrognosisEditPage prognosis={Prognosis.sick} />,
    { state },
  )
  await user.click(screen.getByLabelText('Show on Monitor page'))
  await user.click(screen.getByLabelText('Show system notification'))
  await user.type(
    screen.getByLabelText('Play audio notification'),
    'some-sfx.mp3',
  )
  await user.clear(screen.getByLabelText('Background colour'))
  await user.type(screen.getByLabelText('Background colour'), '#cccccc')
  await user.clear(screen.getByLabelText('Text colour'))
  await user.type(screen.getByLabelText('Text colour'), '#dddddd')
  await user.click(screen.getByRole('button', { name: 'Save changes' }))

  await waitForLocationToChange()

  expect(window.location.pathname).toMatch('/settings/prognosis')
  expect(getPrognosisSettings(Prognosis.sick)(store.getState())).toEqual({
    show: true,
    systemNotification: true,
    sfx: 'some-sfx.mp3',
    backgroundColour: '#cccccc',
    textColour: '#dddddd',
  })
})

it('should be able to preview audio files', async () => {
  jest.spyOn(AudioPlayer, 'playAudio').mockResolvedValue()
  jest.spyOn(AudioPlayer, 'stopAudio').mockReturnValue()
  const state = {
    [prognosisSettingsRoot]: {
      [Prognosis.sick]: {
        show: true,
      },
    },
  }

  const { user } = render(<PrognosisEditPage prognosis={Prognosis.sick} />, {
    state,
  })
  await user.type(
    screen.getByLabelText('Play audio notification'),
    '/some-sfx.mp3',
  )
  await user.click(screen.getByRole('button', { name: 'Play' }))
  await user.click(screen.getByRole('button', { name: 'Stop' }))

  expect(AudioPlayer.playAudio).toHaveBeenCalledWith(
    '/some-sfx.mp3',
    1,
    expect.anything(),
  )
  expect(AudioPlayer.stopAudio).toHaveBeenCalledWith('/some-sfx.mp3')
})

it('should show errors previewing audio files', async () => {
  jest
    .spyOn(AudioPlayer, 'playAudio')
    .mockRejectedValue(new Error('Some audio error'))
  const state = {
    [prognosisSettingsRoot]: {
      [Prognosis.sick]: {
        show: true,
      },
    },
  }

  const { user } = render(<PrognosisEditPage prognosis={Prognosis.sick} />, {
    state,
  })
  await user.type(
    screen.getByLabelText('Play audio notification'),
    '/some-sfx.mp3',
  )
  await user.click(screen.getByRole('button', { name: 'Play' }))

  expect(screen.getByText('Some audio error')).toBeInTheDocument()
})

it('should be able to cancel without adding', async () => {
  const state = {
    [prognosisSettingsRoot]: {
      [Prognosis.sick]: { show: false },
    },
  }

  const { store, user } = render(
    <PrognosisEditPage prognosis={Prognosis.sick} />,
    { state },
  )
  await user.click(screen.getByLabelText('Show on Monitor page'))
  await user.click(screen.getByRole('link', { name: 'Cancel' }))

  expect(
    getPrognosisSettings(Prognosis.sick)(store.getState()).show,
  ).toBeFalsy()
  expect(window.location.pathname).toMatch('/settings/prognosis')
})

describe('warnings', () => {
  it('system notifications have not been allowed', async () => {
    const state = {
      [prognosisSettingsRoot]: {
        [Prognosis.sick]: { show: true },
      },
      [personalSettingsRoot]: {
        allowSystemNotifications: false,
        allowAudioNotifications: true,
      },
    }

    const { user } = render(<PrognosisEditPage prognosis={Prognosis.sick} />, {
      state,
    })
    await user.click(screen.getByLabelText('Show system notification'))

    expect(screen.getByText(SYSTEM_NOT_ALLOWED_WARNING)).toBeInTheDocument()
  })

  it('audio notifications have not been allowed', async () => {
    const state = {
      [prognosisSettingsRoot]: {
        [Prognosis.sick]: { show: true },
      },
      [personalSettingsRoot]: {
        allowSystemNotifications: true,
        allowAudioNotifications: false,
      },
    }

    const { user } = render(<PrognosisEditPage prognosis={Prognosis.sick} />, {
      state,
    })
    await user.type(
      screen.getByLabelText('Play audio notification'),
      'some-sfx',
    )

    expect(screen.getByText(AUDIO_NOT_ALLOWED_WARNING)).toBeInTheDocument()
  })

  it('low contrast', async () => {
    const state = {
      [prognosisSettingsRoot]: {
        [Prognosis.sick]: { show: true },
      },
      [personalSettingsRoot]: {
        allowSystemNotifications: true,
        allowAudioNotifications: true,
      },
    }

    const { user } = render(<PrognosisEditPage prognosis={Prognosis.sick} />, {
      state,
    })
    await user.type(screen.getByLabelText('Background colour'), '#000000')
    await user.type(screen.getByLabelText('Text colour'), '#000000')

    expect(screen.getByText(LOW_CONTRAST_WARNING)).toBeInTheDocument()
  })

  it('all warnings can be displayed at the same time', async () => {
    const state = {
      [prognosisSettingsRoot]: {
        [Prognosis.sick]: { show: true },
      },
      [personalSettingsRoot]: {
        allowSystemNotifications: false,
        allowAudioNotifications: false,
      },
    }

    const { user } = render(<PrognosisEditPage prognosis={Prognosis.sick} />, {
      state,
    })
    await user.click(screen.getByLabelText('Show system notification'))
    await user.type(
      screen.getByLabelText('Play audio notification'),
      'some-sfx',
    )
    await user.type(screen.getByLabelText('Background colour'), '#000000')
    await user.type(screen.getByLabelText('Text colour'), '#000000')

    expect(screen.getByText(SYSTEM_NOT_ALLOWED_WARNING)).toBeInTheDocument()
    expect(screen.getByText(AUDIO_NOT_ALLOWED_WARNING)).toBeInTheDocument()
    expect(screen.getByText(LOW_CONTRAST_WARNING)).toBeInTheDocument()
  })
})
