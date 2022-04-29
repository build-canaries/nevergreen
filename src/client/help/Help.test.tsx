import React from 'react'
import {Help} from './Help'
import {render, setupReactModal} from '../testHelpers'
import {screen} from '@testing-library/react'
import {ROUTE_TRACKING} from '../AppRoutes'

beforeEach(setupReactModal)

it('should show help articles based on location or search query', async () => {
  // I added the initiallyShow prop as I couldn't figure out how to get the model to show by firing key events :'(
  const {user} = render(<Help initiallyShow/>, {mountPath: ROUTE_TRACKING, currentLocation: ROUTE_TRACKING})

  expect(screen.getByRole('heading', {level: 2, name: 'Tracking'})).toBeInTheDocument()

  await user.type(screen.getByLabelText('Search'), 'not-a-valid-keyword')
  expect(screen.queryByRole('heading', {level: 2, name: 'Tracking'})).not.toBeInTheDocument()

  await user.clear(screen.getByLabelText('Search'))

  await user.type(screen.getByLabelText('Search'), 'backup')
  expect(screen.getByRole('heading', {level: 2, name: 'Backup'})).toBeInTheDocument()

  await user.clear(screen.getByLabelText('Search'))
  expect(screen.getByRole('heading', {level: 2, name: 'Tracking'})).toBeInTheDocument()
})
