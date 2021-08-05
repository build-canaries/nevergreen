import React from 'react'
import {Help} from './Help'
import {render, setupReactModal} from '../testHelpers'
import userEvent from '@testing-library/user-event'
import {screen} from '@testing-library/react'
import {ROUTE_SETTINGS_TRACKING} from '../Routes'

beforeEach(setupReactModal)

it('should show help articles based on location or search query', () => {
  // I added the initiallyShow prop as I couldn't figure out how to get the model to show by firing key events :'(
  render(<Help initiallyShow/>, {mountPath: ROUTE_SETTINGS_TRACKING, currentLocation: ROUTE_SETTINGS_TRACKING})

  expect(screen.queryByText('Adding a CCTray XML feed')).toBeInTheDocument()

  userEvent.type(screen.getByLabelText('search'), 'not-a-valid-keyword')
  expect(screen.queryByText('Adding a CCTray XML feed')).not.toBeInTheDocument()

  userEvent.clear(screen.getByLabelText('search'))

  userEvent.type(screen.getByLabelText('search'), 'adding')
  expect(screen.queryByText('Adding a CCTray XML feed')).toBeInTheDocument()

  userEvent.clear(screen.getByLabelText('search'))
  expect(screen.queryByText('Adding a CCTray XML feed')).toBeInTheDocument()
})
