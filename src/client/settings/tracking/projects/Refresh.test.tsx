import {render} from '../../../testHelpers'
import React from 'react'
import {Refresh} from './Refresh'
import noop from 'lodash/noop'
import {screen} from '@testing-library/react'

const defaultProps = {
  refreshTray: noop,
  loaded: false
}

it('should disable the refresh button if projects are loading', () => {
  const props = {...defaultProps, loaded: false}
  render(<Refresh {...props} />)
  expect(screen.getByRole('button', {name: 'Refresh'})).toHaveAttribute('disabled', '')
})

it('should allow projects to be refreshed if they are loaded', async () => {
  const refreshTray = jest.fn()
  const props = {...defaultProps, loaded: true, refreshTray}
  const {user} = render(<Refresh {...props} />)
  await user.click(screen.getByRole('button', {name: 'Refresh'}))
  expect(refreshTray).toHaveBeenCalled()
})
