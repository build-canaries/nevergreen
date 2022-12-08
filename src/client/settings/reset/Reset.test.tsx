import React from 'react'
import { screen, waitFor } from '@testing-library/react'
import * as LocalConfiguration from '../../configuration/LocalRepository'
import { Reset } from './Reset'
import { render } from '../../testUtils/testHelpers'

const { location } = window

beforeEach(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  delete window.location
  window.location = { ...location, reload: jest.fn() }
})

afterEach(() => {
  window.location = location
})

it('should reset configuration and reload', async () => {
  jest.spyOn(LocalConfiguration, 'clear').mockResolvedValueOnce()
  const { user } = render(<Reset />)
  await user.click(screen.getByRole('button', { name: 'Reset configuration' }))
  await waitFor(() => {
    expect(LocalConfiguration.clear).toHaveBeenCalled()
  })
  // eslint-disable-next-line @typescript-eslint/unbound-method
  expect(window.location.reload).toHaveBeenCalled()
})
