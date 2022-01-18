import {render, setSystemTime} from '../../../testHelpers'
import React from 'react'
import {Refresh} from './Refresh'
import noop from 'lodash/noop'
import {screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const DEFAULT_PROPS = {
  refreshTray: noop,
  loaded: false
}

it('should disable the refresh button if projects are loading', () => {
  const props = {...DEFAULT_PROPS, loaded: false}
  render(<Refresh {...props} />)
  expect(screen.getByRole('button', {name: 'Refresh'})).toHaveAttribute('disabled', '')
})

it('should allow projects to be refreshed if they are loaded', () => {
  const refreshTray = jest.fn()
  const props = {...DEFAULT_PROPS, loaded: true, refreshTray}
  render(<Refresh {...props} />)
  userEvent.click(screen.getByRole('button', {name: 'Refresh'}))
  expect(refreshTray).toHaveBeenCalled()
})

it('should show projects were fetched "never" if there is no timestamp', () => {
  const props = {...DEFAULT_PROPS, timestamp: undefined}
  render(<Refresh {...props} />)
  expect(screen.getByText('projects last refreshed never')).toBeInTheDocument()
})

it('should show how long ago projects were refreshed if a timestamp is given', () => {
  setSystemTime('2017-06-07T22:40:00+01:00')
  const props = {...DEFAULT_PROPS, timestamp: '2017-06-07T21:40:00+01:00'}

  render(<Refresh {...props} />)

  expect(screen.queryByText('projects last refreshed never')).not.toBeInTheDocument()
  expect(screen.getByText('projects last refreshed about 1 hour ago')).toBeInTheDocument()
})
