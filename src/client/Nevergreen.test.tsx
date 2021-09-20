import React from 'react'
import {left} from 'fp-ts/Either'
import {Nevergreen} from './Nevergreen'
import {render} from './testHelpers'
import {screen, waitFor} from '@testing-library/react'
import * as LocalConfiguration from './configuration/LocalRepository'
import * as Configuration from './configuration/Configuration'
import * as ServiceWorkerHook from './ServiceWorkerHook'
import * as Gateway from './gateways/Gateway'
import {fakeRequest} from './gateways/Gateway'
import * as HideMenusHook from './HideMenusHook'
import {SETTINGS_ROOT} from './settings/SettingsReducer'
import userEvent from '@testing-library/user-event'
import {ROUTE_MONITOR, ROUTE_SETTINGS_TRACKING} from './Routes'

beforeEach(() => {
  jest.spyOn(LocalConfiguration, 'init').mockResolvedValue()
  jest.spyOn(LocalConfiguration, 'load').mockResolvedValue({})
  jest.spyOn(ServiceWorkerHook, 'useServiceWorker').mockReturnValue()
})

it('should load configuration, register service worker and check for a new version', async () => {
  jest.spyOn(Gateway, 'get').mockReturnValue(fakeRequest({
    tag_name: '9999.0.0' // this needs to be greater than the actual version in resources/version.txt
  }))

  render(<Nevergreen/>, {mountPath: ROUTE_SETTINGS_TRACKING, currentLocation: ROUTE_SETTINGS_TRACKING})

  await waitFor(() => {
    expect(LocalConfiguration.load).toHaveBeenCalled()
    expect(Gateway.get).toHaveBeenCalledWith('https://api.github.com/repos/build-canaries/nevergreen/releases/latest')
    expect(ServiceWorkerHook.useServiceWorker).toHaveBeenCalled()
    expect(screen.getByTestId('notification')).toHaveTextContent(/^A new version [0-9.]* is available to download from GitHub now!$/)
  })
})

it('when loaded config is invalid, should show error screen', async () => {
  jest.spyOn(Configuration, 'toConfiguration').mockReturnValue(left(['bang!']))

  render(<Nevergreen/>)

  await waitFor(() => {
    expect(screen.queryByText('Something went wrong.')).toBeInTheDocument()
  })
})

it('when config fails to load, should show error screen', async () => {
  jest.spyOn(LocalConfiguration, 'load').mockRejectedValue(new Error('bang!'))

  render(<Nevergreen/>)

  await waitFor(() => {
    expect(screen.queryByText('Something went wrong.')).toBeInTheDocument()
  })
})

it('should not check for a new version if the user has disabled checking', async () => {
  jest.spyOn(Gateway, 'get')

  render(<Nevergreen/>, {
    state: {
      [SETTINGS_ROOT]: {
        enableNewVersionCheck: false
      }
    }
  })

  await waitFor(() => {
    expect(Gateway.get).not.toHaveBeenCalledWith('https://api.github.com/repos/build-canaries/nevergreen/releases/latest')
    expect(screen.queryByTestId('notification')).not.toBeInTheDocument()
  })
})

it('should disable fullscreen when any key is pressed, allowing the user to navigate to the header via tabbing', async () => {
  const disableFullScreen = jest.fn()
  jest.spyOn(Gateway, 'get').mockReturnValue(fakeRequest({}))
  jest.spyOn(HideMenusHook, 'useHideMenus').mockReturnValue([true, jest.fn(), disableFullScreen])

  render(<Nevergreen/>, {mountPath: ROUTE_MONITOR, currentLocation: ROUTE_MONITOR})

  await waitFor(() => {
    expect(screen.queryByRole('main')).not.toBeInTheDocument()
  })

  userEvent.type(screen.getByRole('main'), 'a', {skipClick: true})

  await waitFor(() => {
    expect(disableFullScreen).toHaveBeenCalledTimes(1)
  })
})
