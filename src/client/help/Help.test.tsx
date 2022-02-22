import React from 'react'
import {Help} from './Help'
import {render, setupReactModal} from '../testHelpers'
import userEvent from '@testing-library/user-event'
import {screen} from '@testing-library/react'
import {routeTracking} from '../AppRoutes'

beforeEach(setupReactModal)

it('should show help articles based on location or search query', () => {
  // I added the initiallyShow prop as I couldn't figure out how to get the model to show by firing key events :'(
  render(<Help initiallyShow/>, {mountPath: routeTracking, currentLocation: routeTracking})

  expect(screen.getByRole('heading', {level: 2, name: 'Tracking'})).toBeInTheDocument()

  userEvent.type(screen.getByLabelText('Search'), 'not-a-valid-keyword')
  expect(screen.queryByRole('heading', {level: 2, name: 'Tracking'})).not.toBeInTheDocument()

  userEvent.clear(screen.getByLabelText('Search'))

  userEvent.type(screen.getByLabelText('Search'), 'backup')
  expect(screen.getByRole('heading', {level: 2, name: 'Backup'})).toBeInTheDocument()

  userEvent.clear(screen.getByLabelText('Search'))
  expect(screen.getByRole('heading', {level: 2, name: 'Tracking'})).toBeInTheDocument()
})
