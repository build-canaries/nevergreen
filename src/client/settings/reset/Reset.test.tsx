import React from 'react'
import userEvent from '@testing-library/user-event'
import {screen, waitFor} from '@testing-library/react'
import * as LocalConfiguration from '../../configuration/LocalRepository'
import {Reset} from './Reset'
import {render} from '../../testHelpers'

const {location} = window

beforeEach(() => {
  jest.spyOn(LocalConfiguration, 'clear').mockResolvedValue()
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  delete window.location
  // eslint-disable-next-line @typescript-eslint/unbound-method,@typescript-eslint/no-explicit-any
  window.location = {reload: jest.fn()} as any as Location
})

afterEach(() => {
  window.location = location
})

it('should reset configuration and reload', async () => {
  render(<Reset/>)
  userEvent.click(screen.getByText('Reset configuration', {selector: 'button'}))
  await waitFor(() => {
    expect(LocalConfiguration.clear).toHaveBeenCalled()
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(window.location.reload).toHaveBeenCalled()
  })
})
