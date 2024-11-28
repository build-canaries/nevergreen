import { act, screen, waitFor } from '@testing-library/react'
import noop from 'lodash/noop'
import { Monitor } from './Monitor'
import { render, waitForLoadingToFinish } from '../testUtils/testHelpers'
import {
  buildFeed,
  buildFeedError,
  buildProjectApi,
} from '../testUtils/builders'
import { feedsRoot } from '../settings/tracking/FeedsReducer'
import { successRoot } from '../settings/success/SuccessReducer'
import * as Gateway from '../gateways/Gateway'
import {
  displaySettingsRoot,
  SortBy,
} from '../settings/display/DisplaySettingsReducer'
import { Prognosis } from '../domain/Project'
import * as NotificationsHook from './notifications/NotificationsHook'
import * as AudioPlayer from '../common/AudioPlayer'
import { notificationsRoot } from '../settings/notifications/NotificationsReducer'
import { personalSettingsRoot } from '../settings/PersonalSettingsReducer'
import { triggerShortcut } from '../common/Keyboard'

const outletContext = {
  menusHidden: false,
  toggleMenusHidden: noop,
  setNotification: noop,
}

const feedId = 'some-tray-id'

beforeEach(() => {
  jest.spyOn(Gateway, 'post').mockResolvedValue({})
})

it('should hide the header and footer on load and show them on leave', () => {
  const toggleMenusHidden = jest.fn()
  const { unmount } = render(<Monitor />, {
    outletContext: { ...outletContext, toggleMenusHidden },
  })
  expect(toggleMenusHidden).toHaveBeenCalledWith(true)
  unmount()
  expect(toggleMenusHidden).toHaveBeenCalledWith(false)
})

it('should show a helpful message if no feeds are added', () => {
  const state = {
    [feedsRoot]: {},
  }
  render(<Monitor />, { state, outletContext })
  expect(
    screen.getByText('Add a feed via the tracking page to start monitoring'),
  ).toBeInTheDocument()
})

it('should show a success message if there are no interesting projects', async () => {
  jest.spyOn(Gateway, 'post').mockResolvedValueOnce([
    buildProjectApi({
      prognosis: Prognosis.healthy,
    }),
  ])
  jest.spyOn(AudioPlayer, 'playAudio')
  const state = {
    [feedsRoot]: {
      [feedId]: buildFeed({ trayId: feedId }),
    },
    [successRoot]: { messages: ['some-success-message'] },
    [displaySettingsRoot]: {
      showPrognosis: [Prognosis.sick],
    },
  }
  render(<Monitor />, { state, outletContext })
  await waitFor(() => {
    expect(screen.getByText('some-success-message')).toBeInTheDocument()
  })
  expect(AudioPlayer.playAudio).not.toHaveBeenCalled()
})

it('should display an error if the Nevergreen server is having issues', async () => {
  jest
    .spyOn(Gateway, 'post')
    .mockResolvedValueOnce([
      buildProjectApi({
        trayId: feedId,
        description: 'some-project',
        prognosis: Prognosis.sick,
      }),
    ])
    .mockRejectedValueOnce(new Error('some-error'))
  const state = {
    [feedsRoot]: {
      [feedId]: buildFeed({ trayId: feedId }),
    },
    [displaySettingsRoot]: {
      refreshTime: 1,
      showPrognosis: [Prognosis.sick],
    },
  }

  render(<Monitor />, { state, outletContext })

  await waitForLoadingToFinish()

  expect(screen.getByText('some-project')).toBeInTheDocument()

  await waitFor(
    () => {
      expect(screen.getByText('some-error')).toBeInTheDocument()
    },
    { timeout: 4000 },
  )
  expect(screen.queryByText('some-project')).not.toBeInTheDocument()
})

it('should show projects', async () => {
  jest.spyOn(Gateway, 'post').mockResolvedValueOnce([
    buildProjectApi({
      trayId: feedId,
      description: 'some-project-name',
      prognosis: Prognosis.sick,
    }),
  ])
  const state = {
    [feedsRoot]: {
      [feedId]: buildFeed({ trayId: feedId }),
    },
    [displaySettingsRoot]: {
      showPrognosis: [Prognosis.sick],
    },
  }

  render(<Monitor />, { state, outletContext })

  await waitForLoadingToFinish()

  expect(screen.getByText('some-project-name')).toBeInTheDocument()
  expect(Gateway.post).toHaveBeenCalledWith({
    url: '/api/projects',
    data: {
      feeds: [expect.objectContaining({ trayId: feedId })],
      sort: SortBy.default,
    },
    signal: expect.any(AbortSignal) as AbortSignal,
  })
})

it('should show feed errors', async () => {
  jest.spyOn(Gateway, 'post').mockResolvedValueOnce([
    buildFeedError({
      trayId: feedId,
      description: 'some-error',
    }),
  ])
  const state = {
    [feedsRoot]: {
      [feedId]: buildFeed({ trayId: feedId }),
    },
    [displaySettingsRoot]: {
      showPrognosis: [Prognosis.sick],
    },
  }

  render(<Monitor />, { state, outletContext })

  await waitForLoadingToFinish()

  expect(screen.getByText('some-error')).toBeInTheDocument()
})

it('should trigger notifications and stop any audio notifications if user leaves the page', () => {
  const feedId = 'some-tray-id'
  jest.spyOn(NotificationsHook, 'useNotifications').mockReturnValueOnce()
  jest
    .spyOn(Gateway, 'post')
    .mockResolvedValueOnce([
      buildProjectApi({ trayId: feedId, prognosis: Prognosis.sick }),
    ])
  jest.spyOn(AudioPlayer, 'stopAnyPlayingAudio')
  const state = {
    [feedsRoot]: {
      [feedId]: buildFeed({ trayId: feedId }),
    },
  }

  const { unmount } = render(<Monitor />, { state, outletContext })

  expect(NotificationsHook.useNotifications).toHaveBeenCalled()

  unmount()

  expect(AudioPlayer.stopAnyPlayingAudio).toHaveBeenCalled()
})

it('should allow muting audio notifications', async () => {
  const feedId = 'some-tray-id'
  jest
    .spyOn(Gateway, 'post')
    .mockResolvedValueOnce([
      buildProjectApi({
        trayId: feedId,
        prognosis: Prognosis.sick,
        description: 'some-project-sick',
      }),
    ])
    .mockResolvedValueOnce([
      buildProjectApi({
        trayId: feedId,
        prognosis: Prognosis.healthy,
        description: 'some-project-healthy',
      }),
    ])
  jest.spyOn(AudioPlayer, 'playAudio').mockResolvedValue()
  jest.spyOn(AudioPlayer, 'stopAnyPlayingAudio')
  const state = {
    [feedsRoot]: {
      [feedId]: buildFeed({ trayId: feedId }),
    },
    [personalSettingsRoot]: {
      allowAudioNotifications: true,
    },
    [notificationsRoot]: {
      notifications: {
        [Prognosis.sick]: { sfx: 'sick-sfx', systemNotification: false },
        [Prognosis.healthy]: { sfx: 'healthy-sfx', systemNotification: false },
      },
    },
    [displaySettingsRoot]: {
      refreshTime: 1,
      showPrognosis: [Prognosis.sick, Prognosis.healthy],
    },
  }

  render(<Monitor />, { state, outletContext })

  await waitForLoadingToFinish()

  expect(AudioPlayer.playAudio).toHaveBeenCalledWith(
    'sick-sfx',
    expect.any(Number),
  )

  // Trigger shortcut manually as I couldn't figure out how to get it working by firing key events :'(
  act(() => {
    triggerShortcut('space')
  })

  expect(AudioPlayer.stopAnyPlayingAudio).toHaveBeenCalled()

  await waitFor(
    () => {
      expect(screen.getByText('some-project-healthy')).toBeInTheDocument()
    },
    { timeout: 4000 },
  )
  expect(AudioPlayer.playAudio).not.toHaveBeenCalledWith(
    'healthy-sfx',
    expect.any(Number),
  )
})
