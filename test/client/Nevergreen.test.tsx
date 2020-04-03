import React from 'react'
import {Nevergreen} from '../../src/client/Nevergreen'
import {render} from './testHelpers'
import {waitFor} from '@testing-library/react'
import * as LocalConfiguration from '../../src/client/configuration/LocalRepository'
import * as ServiceWorkerHook from '../../src/client/ServiceWorkerHook'
import * as Gateway from '../../src/client/gateways/Gateway'
import {fakeRequest} from '../../src/client/gateways/Gateway'

it('should load configuration, register service worker and check for a new version', async () => {
  jest.spyOn(Gateway, 'get').mockReturnValue(fakeRequest({
    // eslint-disable-next-line @typescript-eslint/camelcase
    tag_name: '9999.0.0' // this needs to be greater than the actual version in resources/version.txt
  }))
  jest.spyOn(LocalConfiguration, 'init').mockResolvedValue()
  jest.spyOn(LocalConfiguration, 'load').mockResolvedValue({})
  jest.spyOn(ServiceWorkerHook, 'useServiceWorker').mockReturnValue()

  const {getByTestId} = render(<Nevergreen/>)

  await waitFor(() => {
    expect(LocalConfiguration.load).toHaveBeenCalled()
    expect(Gateway.get).toHaveBeenCalledWith('https://api.github.com/repos/build-canaries/nevergreen/releases/latest')
    expect(ServiceWorkerHook.useServiceWorker).toHaveBeenCalled()
    expect(getByTestId('notification')).toHaveTextContent(/^A new version [0-9.]* is available to download from GitHub now!$/)
  })
})
