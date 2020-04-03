import React from 'react'
import userEvent from '@testing-library/user-event'
import {waitFor} from '@testing-library/react'
import * as LocalConfiguration from '../../../../src/client/configuration/LocalRepository'
import {Reset} from '../../../../src/client/backup/reset/Reset'
import {render} from '../../testHelpers'

const {location} = window

beforeEach(() => {
  jest.spyOn(LocalConfiguration, 'clear').mockResolvedValue()
  delete window.location
  // eslint-disable-next-line @typescript-eslint/unbound-method,@typescript-eslint/no-explicit-any
  window.location = {reload: jest.fn()} as any as Location
})

afterEach(() => {
  window.location = location
})

it('should reset configuration and reload', async () => {
  const {getByText} = render(<Reset/>)
  userEvent.click(getByText('reset configuration'))
  await waitFor(() => {
    expect(LocalConfiguration.clear).toHaveBeenCalled()
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(window.location.reload).toHaveBeenCalled()
  })
})
