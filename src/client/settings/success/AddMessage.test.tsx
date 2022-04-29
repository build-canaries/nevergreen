import React from 'react'
import {render} from '../../testHelpers'
import {getSuccessMessages, SUCCESS_ROOT} from './SuccessReducer'
import {AddMessage} from './AddMessage'
import {screen, waitFor} from '@testing-library/react'

it('should allow success messages to be added', async () => {
  const state = {[SUCCESS_ROOT]: []}

  const {store, user} = render(<AddMessage/>, {state, mountPath: 'add', currentLocation: 'add'})
  await user.type(screen.getByLabelText('Message'), 'some-message')
  await user.click(screen.getByText('Add message'))

  expect(getSuccessMessages(store.getState())).toEqual(['some-message'])
  await waitFor(() => {
    expect(window.location.pathname).toEqual('/settings/success')
  })
})

it('should not allow a blank success messages to be added', async () => {
  const state = {[SUCCESS_ROOT]: []}
  const {user} = render(<AddMessage/>, {state})

  await user.clear(screen.getByLabelText('Message'))
  await user.click(screen.getByText('Add message'))

  expect(screen.getByText('Enter a message or image URL')).toBeInTheDocument()
})

it('should not allow the same success message to be added', async () => {
  const state = {[SUCCESS_ROOT]: ['some-message']}
  const {user} = render(<AddMessage/>, {state})

  await user.type(screen.getByLabelText('Message'), 'some-message')
  await user.click(screen.getByText('Add message'))

  expect(screen.getByText('Message has already been added')).toBeInTheDocument()
})

it('should be able to cancel back to settings', async () => {
  const state = {[SUCCESS_ROOT]: ['some-message']}
  const {user} = render(<AddMessage/>, {state, mountPath: 'add', currentLocation: 'add'})

  await user.click(screen.getByRole('button', {name: 'Cancel'}))

  await waitFor(() => {
    expect(window.location.pathname).toEqual('/settings/success')
  })
})
