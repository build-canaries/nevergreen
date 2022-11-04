import React from 'react'
import {screen, waitFor} from '@testing-library/react'
import noop from 'lodash/noop'
import {Monitor} from './Monitor'
import {render, waitForLoadingToFinish} from '../testUtils/testHelpers'
import {buildFeed, buildFeedError, buildProjectApi} from '../testUtils/builders'
import {FEEDS_ROOT} from '../settings/tracking/FeedsReducer'
import {SUCCESS_ROOT} from '../settings/success/SuccessReducer'
import * as Gateway from '../gateways/Gateway'
import {fakeRequest} from '../gateways/Gateway'
import {SETTINGS_ROOT} from '../settings/SettingsReducer'
import {Prognosis} from '../domain/Project'
import {SortBy} from '../gateways/ProjectsGateway'
import * as NotificationsHook from './notifications/NotificationsHook'
import * as AudioPlayer from '../common/AudioPlayer'

const outletContext = {
  menusHidden: false,
  toggleMenusHidden: noop,
  setNotification: noop
}

const feedId = 'some-tray-id'

beforeEach(() => {
  jest.spyOn(Gateway, 'post').mockReturnValue(fakeRequest())
})

it('should hide the header and footer on load and show them on leave', () => {
  const toggleMenusHidden = jest.fn()
  const {unmount} = render(<Monitor/>, {outletContext: {...outletContext, toggleMenusHidden}})
  expect(toggleMenusHidden).toHaveBeenCalledWith(true)
  unmount()
  expect(toggleMenusHidden).toHaveBeenCalledWith(false)
})

it('should show a helpful message if no feeds are added', () => {
  const state = {
    [FEEDS_ROOT]: {}
  }
  render(<Monitor/>, {state, outletContext})
  expect(screen.getByText('Add a feed via the tracking page to start monitoring')).toBeInTheDocument()
})

it('should show a success message if there are no interesting projects', async () => {
  jest.spyOn(Gateway, 'post').mockReturnValueOnce(fakeRequest([
    buildProjectApi({
      prognosis: Prognosis.healthy
    })
  ]))
  const state = {
    [FEEDS_ROOT]: {
      [feedId]: buildFeed({trayId: feedId})
    },
    [SUCCESS_ROOT]: ['some-success-message'],
    [SETTINGS_ROOT]: {
      showPrognosis: [Prognosis.sick]
    }
  }
  render(<Monitor/>, {state, outletContext})
  await waitFor(() => {
    expect(screen.getByText('some-success-message')).toBeInTheDocument()
  })
})

it('should display an error if the Nevergreen server is having issues', async () => {
  jest.spyOn(Gateway, 'post')
    .mockResolvedValueOnce(fakeRequest([
      buildProjectApi({
        trayId: feedId,
        description: 'some-project',
        prognosis: Prognosis.sick,
      })
    ]))
    .mockRejectedValueOnce(new Error('some-error'))
  const state = {
    [FEEDS_ROOT]: {
      [feedId]: buildFeed({trayId: feedId})
    },
    [SETTINGS_ROOT]: {
      refreshTime: 1,
      showPrognosis: [Prognosis.sick]
    }
  }

  render(<Monitor/>, {state, outletContext})

  await waitForLoadingToFinish()

  expect(screen.getByText('some-project')).toBeInTheDocument()

  jest.advanceTimersToNextTimer()

  await waitFor(() => {
    expect(screen.getByText('some-error')).toBeInTheDocument()
  }, {timeout: 4000})
  expect(screen.queryByText('some-project')).not.toBeInTheDocument()
})

it('should show projects', async () => {
  jest.spyOn(Gateway, 'post').mockReturnValueOnce(fakeRequest([
    buildProjectApi({
      trayId: feedId,
      description: 'some-project-name',
      prognosis: Prognosis.sick,
    })
  ]))
  const state = {
    [FEEDS_ROOT]: {
      [feedId]: buildFeed({trayId: feedId})
    },
    [SETTINGS_ROOT]: {
      showPrognosis: [Prognosis.sick]
    }
  }

  render(<Monitor/>, {state, outletContext})

  await waitForLoadingToFinish()

  expect(screen.getByText('some-project-name')).toBeInTheDocument()
  expect(Gateway.post).toHaveBeenCalledWith('/api/projects', {
    feeds: [expect.objectContaining({trayId: feedId})],
    sort: SortBy.default
  })
})

it('should show feed errors', async () => {
  jest.spyOn(Gateway, 'post').mockReturnValueOnce(fakeRequest([
    buildFeedError({
      trayId: feedId,
      description: 'some-error'
    })
  ]))
  const state = {
    [FEEDS_ROOT]: {
      [feedId]: buildFeed({trayId: feedId})
    },
    [SETTINGS_ROOT]: {
      showPrognosis: [Prognosis.sick]
    }
  }

  render(<Monitor/>, {state, outletContext})

  await waitForLoadingToFinish()

  expect(screen.getByText('some-error')).toBeInTheDocument()
})

it('should trigger notifications and stop any audio notifications if user leaves the page', () => {
  const feedId = 'some-tray-id'
  jest.spyOn(NotificationsHook, 'useNotifications').mockReturnValueOnce()
  jest.spyOn(Gateway, 'post').mockReturnValueOnce(fakeRequest([
    buildProjectApi({trayId: feedId, prognosis: Prognosis.sick})
  ]))
  jest.spyOn(AudioPlayer, 'stopAnyPlayingAudio')
  const state = {
    [FEEDS_ROOT]: {
      [feedId]: buildFeed({trayId: feedId})
    }
  }

  const {unmount} = render(<Monitor/>, {state, outletContext})

  expect(NotificationsHook.useNotifications).toHaveBeenCalled()

  unmount()

  expect(AudioPlayer.stopAnyPlayingAudio).toHaveBeenCalled()
})
