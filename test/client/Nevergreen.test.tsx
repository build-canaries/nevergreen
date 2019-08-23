import React from 'react'
import {Nevergreen} from '../../src/client/Nevergreen'
import {buildState, render} from './testHelpers'
import {waitForDomChange, waitForElement} from '@testing-library/react'
import * as LocalConfiguration from '../../src/client/configuration/LocalRepository'
import * as CheckForNewVersionHook from '../../src/client/CheckForNewVersionHook'

describe('<Nevergreen/>', () => {

  beforeEach(() => {
    jest.spyOn(CheckForNewVersionHook, 'useCheckForNewVersion')
    jest.spyOn(LocalConfiguration, 'init').mockResolvedValue()
    jest.spyOn(LocalConfiguration, 'load').mockResolvedValue(buildState())
  })

  test('should load configuration', async () => {
    render(<Nevergreen>child</Nevergreen>)
    await waitForDomChange()
    expect(LocalConfiguration.load).toHaveBeenCalled()
  })

  test('should check for new versions', async () => {
    render(<Nevergreen>child</Nevergreen>)
    await waitForDomChange()
    expect(CheckForNewVersionHook.useCheckForNewVersion).toHaveBeenCalled()
  })

  test('should show children once configuration is loaded', async () => {
    const {getByText} = render(<Nevergreen>child</Nevergreen>)
    await waitForElement(() => getByText('child'))
  })
})
