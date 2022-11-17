import React from 'react'
import {Help, SHOW_HELP_SHORTCUT} from './Help'
import {render} from '../testUtils/testHelpers'
import {act, screen} from '@testing-library/react'
import {ROUTE_TRACKING} from '../AppRoutes'
import {triggerShortcut} from '../common/Keyboard'

it('should show help articles based on location or search query', async () => {
  const {user} = render(<Help/>, {mountPath: ROUTE_TRACKING, currentLocation: ROUTE_TRACKING})

  // Trigger shortcut manually as I couldn't figure out how to get the model to show by firing key events :'(
  await act(() => {
    triggerShortcut(SHOW_HELP_SHORTCUT)
  })

  expect(screen.getByRole('heading', {level: 2, name: 'Tracking'})).toBeInTheDocument()

  await user.type(screen.getByLabelText('Search'), 'not-a-valid-keyword')
  expect(screen.queryByRole('heading', {level: 2, name: 'Tracking'})).not.toBeInTheDocument()

  await user.clear(screen.getByLabelText('Search'))

  await user.type(screen.getByLabelText('Search'), 'backup')
  expect(screen.getByRole('heading', {level: 2, name: 'Backup'})).toBeInTheDocument()

  await user.clear(screen.getByLabelText('Search'))
  expect(screen.getByRole('heading', {level: 2, name: 'Tracking'})).toBeInTheDocument()
})
