import React from 'react'
import {Nevergreen} from '../../src/client/Nevergreen'
import {render} from './testHelpers'
import {fireEvent, waitFor} from '@testing-library/react'
import * as LocalConfiguration from '../../src/client/configuration/LocalRepository'
import * as ServiceWorkerHook from '../../src/client/ServiceWorkerHook'
import * as Gateway from '../../src/client/gateways/Gateway'
import {fakeRequest} from '../../src/client/gateways/Gateway'
import * as FullScreenHook from '../../src/client/FullScreenHook'

beforeEach(() => {
  jest.spyOn(LocalConfiguration, 'init').mockResolvedValue()
  jest.spyOn(LocalConfiguration, 'load').mockResolvedValue({})
  jest.spyOn(ServiceWorkerHook, 'useServiceWorker').mockReturnValue()
})

it('should load configuration, register service worker and check for a new version', async () => {
  jest.spyOn(Gateway, 'get').mockReturnValue(fakeRequest({
    tag_name: '9999.0.0' // this needs to be greater than the actual version in resources/version.txt
  }))

  const {getByTestId} = render(<Nevergreen/>)

  await waitFor(() => {
    expect(LocalConfiguration.load).toHaveBeenCalled()
    expect(Gateway.get).toHaveBeenCalledWith('https://api.github.com/repos/build-canaries/nevergreen/releases/latest')
    expect(ServiceWorkerHook.useServiceWorker).toHaveBeenCalled()
    expect(getByTestId('notification')).toHaveTextContent(/^A new version [0-9.]* is available to download from GitHub now!$/)
  })
})

it('should disable fullscreen when any key is pressed, allowing the user to navigate to the header via tabbing', async () => {
  const disableFullScreen = jest.fn()
  jest.spyOn(Gateway, 'get').mockReturnValue(fakeRequest({}))
  jest.spyOn(FullScreenHook, 'useFullScreen').mockReturnValue([true, jest.fn(), disableFullScreen])

  const {container} = render(<Nevergreen/>, {}, '/monitor')

  await waitFor(() => {
    expect(container.querySelector('main')).not.toBeNull()
  })

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  fireEvent.keyDown(container.querySelector('main')!, {key: 'A', code: 'KeyA', which: 65})

  await waitFor(() => {
    expect(disableFullScreen).toHaveBeenCalledTimes(1)
  })
})
