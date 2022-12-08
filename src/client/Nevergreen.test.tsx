import React from 'react'
import { left } from 'fp-ts/Either'
import { Nevergreen } from './Nevergreen'
import { render, waitForLoadingToFinish } from './testUtils/testHelpers'
import { screen } from '@testing-library/react'
import * as LocalConfiguration from './configuration/LocalRepository'
import * as Configuration from './configuration/Configuration'
import * as ServiceWorkerHook from './ServiceWorkerHook'
import * as Gateway from './gateways/Gateway'
import * as HideMenusHook from './HideMenusHook'
import { notificationsRoot } from './settings/notifications/NotificationsReducer'

beforeEach(() => {
  jest.spyOn(LocalConfiguration, 'init').mockResolvedValue()
  jest.spyOn(LocalConfiguration, 'load').mockResolvedValue({})
  jest.spyOn(ServiceWorkerHook, 'useServiceWorker').mockReturnValue()
})

it('should load configuration, register service worker and check for a new version', async () => {
  jest.spyOn(Gateway, 'get').mockResolvedValueOnce({
    tag_name: '9999.0.0', // this needs to be greater than the actual version in resources/version.txt
  })

  render(<Nevergreen />)

  await waitForLoadingToFinish()

  expect(LocalConfiguration.load).toHaveBeenCalled()
  expect(Gateway.get).toHaveBeenCalledWith({
    url: 'https://api.github.com/repos/build-canaries/nevergreen/releases/latest',
    signal: expect.any(AbortSignal) as AbortSignal,
  })
  expect(ServiceWorkerHook.useServiceWorker).toHaveBeenCalled()
  expect(
    screen.getByText(
      /^A new version [0-9.]* is available to download from GitHub now!$/
    )
  ).toBeInTheDocument()
})

it('when loaded config is invalid, should show error screen', async () => {
  jest
    .spyOn(Configuration, 'toConfiguration')
    .mockReturnValueOnce(left(['bang!']))

  render(<Nevergreen />)

  await waitForLoadingToFinish()

  expect(screen.getByText('Something went wrong.')).toBeInTheDocument()
})

it('when config fails to load, should show error screen', async () => {
  jest
    .spyOn(LocalConfiguration, 'load')
    .mockRejectedValueOnce(new Error('bang!'))

  render(<Nevergreen />)

  await waitForLoadingToFinish()

  expect(screen.getByText('Something went wrong.')).toBeInTheDocument()
})

it('should not check for a new version if the user has disabled checking', async () => {
  jest.spyOn(Gateway, 'get')

  render(<Nevergreen />, {
    state: {
      [notificationsRoot]: {
        enableNewVersionCheck: false,
      },
    },
  })

  await waitForLoadingToFinish()

  expect(Gateway.get).not.toHaveBeenCalledWith(
    'https://api.github.com/repos/build-canaries/nevergreen/releases/latest'
  )
  expect(screen.queryByTestId('notification')).not.toBeInTheDocument()
})

it('should show menus when any key is pressed, allowing the user to navigate to the header via tabbing', async () => {
  const showMenus = jest.fn()
  jest.spyOn(Gateway, 'get').mockResolvedValueOnce({ tag_name: '1.0.0' })
  jest.spyOn(HideMenusHook, 'useHideMenus').mockReturnValue({
    menusHidden: true,
    toggleMenusHidden: jest.fn(),
    showMenus,
  })

  const { user } = render(<Nevergreen />)

  await waitForLoadingToFinish()

  // The click is required to make sure focus is correct for the keyboard event.
  // In production the <Title/> forces focus so focus would be correct already.
  // The click also triggers showMenus, so we assert it's called twice
  await user.click(screen.getByRole('main'))
  await user.keyboard('a')

  expect(showMenus).toHaveBeenCalledTimes(2)
})
