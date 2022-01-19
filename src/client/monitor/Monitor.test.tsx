import React from 'react'
import {screen, waitFor} from '@testing-library/react'
import noop from 'lodash/noop'
import {Monitor} from './Monitor'
import {buildProject, buildFeed, render} from '../testHelpers'
import {FEEDS_ROOT} from '../settings/tracking/FeedsReducer'
import {SUCCESS_ROOT} from '../settings/success/SuccessReducer'
import * as ProjectsGateway from '../gateways/ProjectsGateway'
import * as Gateway from '../gateways/Gateway'
import {fakeRequest} from '../gateways/Gateway'
import {SETTINGS_ROOT} from '../settings/SettingsReducer'
import {Prognosis} from '../domain/Project'

const DEFAULT_PROPS = {
  menusHidden: false,
  toggleMenusHidden: noop
}

const trayId = 'some-tray-id'

beforeEach(() => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  // noinspection JSUnusedGlobalSymbols
  window.HTMLMediaElement.prototype.pause = noop
  // eslint-disable-next-line @typescript-eslint/unbound-method
  // noinspection JSUnusedGlobalSymbols
  window.HTMLMediaElement.prototype.play = () => Promise.resolve()
})

it('should request to hide the header and footer when the user first loads the page', () => {
  const toggleMenusHidden = jest.fn()
  const props = {...DEFAULT_PROPS, toggleMenusHidden}
  render(<Monitor {...props}/>)
  expect(toggleMenusHidden).toHaveBeenCalledWith(true)
})

it('should request to show the header and footer when the user navigates away from the page', () => {
  const toggleMenusHidden = jest.fn()
  const props = {...DEFAULT_PROPS, toggleMenusHidden}
  const {unmount} = render(<Monitor {...props}/>)
  unmount()
  expect(toggleMenusHidden).toHaveBeenCalledWith(false)
})

it('should show a helpful message if no feeds are added', () => {
  const state = {
    [FEEDS_ROOT]: {}
  }
  render(<Monitor {...DEFAULT_PROPS}/>, {state})
  expect(screen.getByText('Add a feed via the tracking page to start monitoring')).toBeInTheDocument()
})

it('should show a loading screen when first switching to the page', () => {
  const state = {
    [FEEDS_ROOT]: {
      [trayId]: buildFeed({trayId})
    }
  }
  render(<Monitor {...DEFAULT_PROPS}/>, {state})
  expect(screen.getByTestId('loading')).toBeInTheDocument()
})

it('should show a success message if there are no projects', async () => {
  jest.spyOn(ProjectsGateway, 'interesting').mockReturnValue(fakeRequest([]))
  const state = {
    [FEEDS_ROOT]: {
      [trayId]: buildFeed({trayId})
    },
    [SUCCESS_ROOT]: ['some-success-message']
  }
  render(<Monitor {...DEFAULT_PROPS}/>, {state})
  await waitFor(() => {
    expect(screen.getByText('some-success-message')).toBeInTheDocument()
  })
})

it('should not try updating after the user has navigated away from the page', () => {
  jest.spyOn(ProjectsGateway, 'interesting').mockReturnValue(fakeRequest([]))
  jest.spyOn(Gateway, 'send').mockRejectedValue(new Error('Aborted'))
  const state = {
    [FEEDS_ROOT]: {
      [trayId]: buildFeed({trayId})
    },
    [SUCCESS_ROOT]: ['some-success-message']
  }
  const {unmount} = render(<Monitor {...DEFAULT_PROPS}/>, {state})
  unmount()
  // we can't assert on React internals logging warnings, if this is broken you'll see
  // a log about "Warning: Can't perform a React state update on an unmounted component."
})

it('should display an error if the Nevergreen server is having issues', async () => {
  jest.spyOn(Gateway, 'send').mockRejectedValue(new Error('some-error'))
  const state = {
    [FEEDS_ROOT]: {
      [trayId]: buildFeed({trayId})
    }
  }
  render(<Monitor {...DEFAULT_PROPS}/>, {state})
  await waitFor(() => {
    expect(screen.getByText('some-error')).toBeInTheDocument()
  })
})

describe('audio notifications', () => {

  const trayId = 'some-tray-id'

  it('should play if its enabled and any project is broken', async () => {
    jest.spyOn(window.HTMLMediaElement.prototype, 'play').mockResolvedValue()
    jest.spyOn(window.HTMLMediaElement.prototype, 'pause').mockReturnValue()
    Object.defineProperty(global.window.HTMLMediaElement.prototype, 'paused', {
      get() {
        return false
      }
    })
    jest.spyOn(ProjectsGateway, 'interesting').mockReturnValue(fakeRequest([
      buildProject({trayId, prognosis: Prognosis.sick})
    ]))
    const state = {
      [FEEDS_ROOT]: {
        [trayId]: buildFeed({trayId})
      },
      [SETTINGS_ROOT]: {
        playBrokenBuildSoundFx: true,
        brokenBuildSoundFx: 'some-sfx'
      }
    }

    const {unmount} = render(<Monitor {...DEFAULT_PROPS}/>, {state})

    await waitFor(() => {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalled()
    })

    unmount()

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(window.HTMLMediaElement.prototype.pause).toHaveBeenCalled()
  })

  it('should not play when off even if any project is sick', async () => {
    jest.spyOn(window.HTMLMediaElement.prototype, 'play').mockResolvedValue()
    jest.spyOn(ProjectsGateway, 'interesting').mockReturnValue(fakeRequest([
      buildProject({trayId, prognosis: Prognosis.sick})
    ]))
    const state = {
      [FEEDS_ROOT]: {
        [trayId]: buildFeed({trayId})
      },
      [SETTINGS_ROOT]: {
        playBrokenBuildSoundFx: false
      }
    }

    render(<Monitor {...DEFAULT_PROPS}/>, {state})

    await waitFor(() => {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(window.HTMLMediaElement.prototype.play).not.toHaveBeenCalled()
    })
  })

  it('should not play when enabled but no projects are sick', async () => {
    jest.spyOn(window.HTMLMediaElement.prototype, 'play').mockResolvedValue()
    jest.spyOn(ProjectsGateway, 'interesting').mockReturnValue(fakeRequest([
      buildProject({trayId, prognosis: Prognosis.unknown})
    ]))
    const state = {
      [FEEDS_ROOT]: {
        [trayId]: buildFeed({trayId})
      },
      [SETTINGS_ROOT]: {
        playBrokenBuildSoundFx: true
      }
    }

    render(<Monitor {...DEFAULT_PROPS}/>, {state})

    await waitFor(() => {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(window.HTMLMediaElement.prototype.play).not.toHaveBeenCalled()
    })
  })

  it('should not play when enabled but a sound fx has not been set', async () => {
    jest.spyOn(window.HTMLMediaElement.prototype, 'play').mockResolvedValue()
    jest.spyOn(ProjectsGateway, 'interesting').mockReturnValue(fakeRequest([
      buildProject({trayId, prognosis: Prognosis.sick})
    ]))
    const state = {
      [FEEDS_ROOT]: {
        [trayId]: buildFeed({trayId})
      },
      [SETTINGS_ROOT]: {
        playBrokenBuildSoundFx: true,
        brokenBuildFx: ''
      }
    }

    render(<Monitor {...DEFAULT_PROPS}/>, {state})

    await waitFor(() => {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(window.HTMLMediaElement.prototype.play).not.toHaveBeenCalled()
    })
  })
})
