import React from 'react'
import {Nevergreen} from '../../src/client/Nevergreen'
import {render} from './testHelpers'
import {waitForDomChange} from '@testing-library/react'
import * as LocalConfiguration from '../../src/client/configuration/LocalRepository'
import * as CheckForNewVersionHook from '../../src/client/CheckForNewVersionHook'
import * as ServiceWorkerHook from '../../src/client/ServiceWorkerHook'

it('should load configuration, register service worker and check for a new version', async () => {
  jest.spyOn(CheckForNewVersionHook, 'useCheckForNewVersion').mockReturnValue()
  jest.spyOn(LocalConfiguration, 'init').mockResolvedValue()
  jest.spyOn(LocalConfiguration, 'load').mockResolvedValue({})
  jest.spyOn(ServiceWorkerHook, 'useServiceWorker').mockReturnValue()

  render(<Nevergreen/>)

  await waitForDomChange()

  expect(LocalConfiguration.load).toHaveBeenCalled()
  expect(CheckForNewVersionHook.useCheckForNewVersion).toHaveBeenCalled()
  expect(ServiceWorkerHook.useServiceWorker).toHaveBeenCalled()
})
