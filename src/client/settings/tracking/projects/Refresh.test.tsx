import {render, setSystemTime} from '../../../testHelpers'
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

it('should show projects were fetched "never" if there is no timestamp', () => {
  const props = {...defaultProps, timestamp: undefined}
  render(<Refresh {...props} />)
  expect(screen.getByText('projects last refreshed never')).toBeInTheDocument()
})

it('should show how long ago projects were refreshed if a timestamp is given', () => {
  setSystemTime('2017-06-07T22:40:00+01:00')
  const props = {...defaultProps, timestamp: '2017-06-07T21:40:00+01:00'}

  render(<Refresh {...props} />)

  expect(screen.queryByText('projects last refreshed never')).not.toBeInTheDocument()
  expect(screen.getByText('projects last refreshed about 1 hour ago')).toBeInTheDocument()
})
