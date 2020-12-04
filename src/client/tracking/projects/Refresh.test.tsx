import {render, setSystemTime} from '../../testHelpers'
import React from 'react'
import {Refresh} from './Refresh'
import {noop} from 'lodash'

const DEFAULT_PROPS = {
  index: 1,
  refreshTray: noop
}

it('should render projects were fetched "never" if there is no timestamp', () => {
  const props = {...DEFAULT_PROPS, timestamp: undefined}
  const {queryByText} = render(<Refresh {...props} />)
  expect(queryByText('projects last refreshed never')).toBeInTheDocument()
})

it('should render how long ago projects were refreshed if a timestamp is given', () => {
  setSystemTime('2017-06-07T22:40:00+01:00')
  const props = {...DEFAULT_PROPS, timestamp: '2017-06-07T21:40:00+01:00'}

  const {queryByText} = render(<Refresh {...props} />)

  expect(queryByText('projects last refreshed never')).not.toBeInTheDocument()
  expect(queryByText('projects last refreshed about 1 hour ago')).toBeInTheDocument()
})
