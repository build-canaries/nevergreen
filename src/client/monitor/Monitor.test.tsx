import React from 'react'
import {screen, waitFor} from '@testing-library/react'
import noop from 'lodash/noop'
import {Monitor} from './Monitor'
import {buildProject, buildTray, render} from '../testHelpers'
import {TRAYS_ROOT} from '../tracking/TraysReducer'
import {SUCCESS_ROOT} from '../settings/success/SuccessReducer'
import * as TimerHook from '../common/TimerHook'
import * as ProjectsGateway from '../gateways/ProjectsGateway'
import * as Gateway from '../gateways/Gateway'
import {fakeRequest} from '../gateways/Gateway'
import {SETTINGS_ROOT} from '../settings/SettingsReducer'
import {Prognosis} from '../domain/Project'

const DEFAULT_PROPS = {
  fullScreen: false,
  requestFullScreen: noop
}

const trayId = 'some-tray-id'

beforeEach(() => {
  jest.spyOn(TimerHook, 'useTimer').mockImplementation(noop)

  // eslint-disable-next-line @typescript-eslint/unbound-method
  // noinspection JSUnusedGlobalSymbols
  window.HTMLMediaElement.prototype.pause = noop
  // eslint-disable-next-line @typescript-eslint/unbound-method
  // noinspection JSUnusedGlobalSymbols
  window.HTMLMediaElement.prototype.play = () => Promise.resolve()
})

it('should request fullscreen on mount', () => {
  const requestFullScreen = jest.fn()
  const props = {...DEFAULT_PROPS, requestFullScreen}
  render(<Monitor {...props}/>)
  expect(requestFullScreen).toHaveBeenCalledWith(true)
})

it('should cancel fullscreen on unmount', () => {
  const requestFullScreen = jest.fn()
  const props = {...DEFAULT_PROPS, requestFullScreen}
  const {unmount} = render(<Monitor {...props}/>)
  unmount()
  expect(requestFullScreen).toHaveBeenCalledWith(false)
})

it('should show a helpful message if no trays are added', () => {
  const state = {
    [TRAYS_ROOT]: {}
  }
  render(<Monitor {...DEFAULT_PROPS}/>, {state})
  expect(screen.queryByText('Add a feed via the tracking page to start monitoring')).toBeInTheDocument()
})

it('should show a loading screen when first switching to the page', () => {
  const state = {
    [TRAYS_ROOT]: {
      [trayId]: buildTray({trayId})
    }
  }
  render(<Monitor {...DEFAULT_PROPS}/>, {state})
  expect(screen.queryByTestId('loading')).toBeInTheDocument()
})

it('should show a success message if there are no projects', async () => {
  jest.spyOn(TimerHook, 'useTimer').mockImplementationOnce((onTrigger) => {
    void onTrigger()
  })
  jest.spyOn(ProjectsGateway, 'interesting').mockReturnValue(fakeRequest([]))
  const state = {
    [TRAYS_ROOT]: {
      [trayId]: buildTray({trayId})
    },
    [SUCCESS_ROOT]: ['some-success-message']
  }
  render(<Monitor {...DEFAULT_PROPS}/>, {state})
  await waitFor(() => {
    expect(screen.queryByText('some-success-message')).toBeInTheDocument()
  })
})

it('should not try updating after the user has navigated away from the page', () => {
  jest.spyOn(TimerHook, 'useTimer').mockImplementationOnce((onTrigger) => {
    void onTrigger()
  })
  jest.spyOn(ProjectsGateway, 'interesting').mockReturnValue(fakeRequest([]))
  jest.spyOn(Gateway, 'send').mockRejectedValue(new Error('Aborted'))
  const state = {
    [TRAYS_ROOT]: {
      [trayId]: buildTray({trayId})
    },
    [SUCCESS_ROOT]: ['some-success-message']
  }
  const {unmount} = render(<Monitor {...DEFAULT_PROPS}/>, {state})
  unmount()
  // we can't assert on React internals logging warnings, if this is broken you'll see
  // a log about "Warning: Can't perform a React state update on an unmounted component."
})

it('should display an error if the Nevergreen server is having issues', async () => {
  jest.spyOn(TimerHook, 'useTimer').mockImplementationOnce((onTrigger) => {
    void onTrigger()
  })
  jest.spyOn(Gateway, 'send').mockRejectedValue(new Error('some-error'))
  const state = {
    [TRAYS_ROOT]: {
      [trayId]: buildTray({trayId})
    }
  }
  render(<Monitor {...DEFAULT_PROPS}/>, {state})
  await waitFor(() => {
    expect(screen.queryByText('some-error')).toBeInTheDocument()
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
    jest.spyOn(TimerHook, 'useTimer').mockImplementationOnce((onTrigger) => {
      void onTrigger()
    })
    jest.spyOn(ProjectsGateway, 'interesting').mockReturnValue(fakeRequest([
      buildProject({trayId, prognosis: Prognosis.sick})
    ]))
    const state = {
      [TRAYS_ROOT]: {
        [trayId]: buildTray({trayId})
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

  it('should not play if its off even if any project is sick', async () => {
    jest.spyOn(window.HTMLMediaElement.prototype, 'play').mockResolvedValue()
    jest.spyOn(TimerHook, 'useTimer').mockImplementationOnce((onTrigger) => {
      void onTrigger()
    })
    jest.spyOn(ProjectsGateway, 'interesting').mockReturnValue(fakeRequest([
      buildProject({trayId, prognosis: Prognosis.sick})
    ]))
    const state = {
      [TRAYS_ROOT]: {
        [trayId]: buildTray({trayId})
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

  it('should not play if its enabled but no projects are sick', async () => {
    jest.spyOn(window.HTMLMediaElement.prototype, 'play').mockResolvedValue()
    jest.spyOn(TimerHook, 'useTimer').mockImplementationOnce((onTrigger) => {
      void onTrigger()
    })
    jest.spyOn(ProjectsGateway, 'interesting').mockReturnValue(fakeRequest([
      buildProject({trayId, prognosis: Prognosis.unknown})
    ]))
    const state = {
      [TRAYS_ROOT]: {
        [trayId]: buildTray({trayId})
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

  it('should not play if its enabled but a sound fx has not been set', async () => {
    jest.spyOn(window.HTMLMediaElement.prototype, 'play').mockResolvedValue()
    jest.spyOn(TimerHook, 'useTimer').mockImplementationOnce((onTrigger) => {
      void onTrigger()
    })
    jest.spyOn(ProjectsGateway, 'interesting').mockReturnValue(fakeRequest([
      buildProject({trayId, prognosis: Prognosis.sick})
    ]))
    const state = {
      [TRAYS_ROOT]: {
        [trayId]: buildTray({trayId})
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
