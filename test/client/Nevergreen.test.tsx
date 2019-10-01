import React from 'react'
import {Nevergreen} from '../../src/client/Nevergreen'
import {render} from './testHelpers'
import * as CheckForNewVersionHook from '../../src/client/CheckForNewVersionHook'
import * as ServiceWorkerHook from '../../src/client/ServiceWorkerHook'

describe('<Nevergreen/>', () => {

  beforeEach(() => {
    jest.spyOn(CheckForNewVersionHook, 'useCheckForNewVersion').mockReturnValue()
  })

  it('should check for new versions', () => {
    render(<Nevergreen/>)
    expect(CheckForNewVersionHook.useCheckForNewVersion).toHaveBeenCalled()
  })

  it('should register the service worker on mount', () => {
    jest.spyOn(ServiceWorkerHook, 'useServiceWorker').mockReturnValue()
    render(<Nevergreen/>)
    expect(ServiceWorkerHook.useServiceWorker).toHaveBeenCalled()
  })
})
