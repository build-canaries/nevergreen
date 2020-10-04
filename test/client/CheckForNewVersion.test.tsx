import React from 'react'
import {Nevergreen} from '../../src/client/Nevergreen'
import {render} from './testHelpers'
import {waitFor} from '@testing-library/react'
import * as Gateway from '../../src/client/gateways/Gateway'
import {fakeRequest} from '../../src/client/gateways/Gateway'

it('should check for a new version', async () => {
  jest.spyOn(Gateway, 'get').mockReturnValue(fakeRequest({
    tag_name: '9999.0.0' // this needs to be greater than the actual version in resources/version.txt
  }))

  render(<Nevergreen/>)

  await waitFor(() => {
    expect(Gateway.get).toHaveBeenCalledWith('https://api.github.com/repos/build-canaries/nevergreen/releases/latest')
  })
})

