import React from 'react'
import {render} from '../../testHelpers'
import userEvent from '@testing-library/user-event'
import {getSuccessMessages, SUCCESS_ROOT} from './SuccessReducer'
import {AddMessage} from './AddMessage'
import {ROUTE_SETTINGS} from '../../Routes'
import {screen, waitFor} from '@testing-library/react'

it('should allow success messages to be added', async () => {
  const state = {[SUCCESS_ROOT]: []}

  const {store, history} = render(<AddMessage/>, state)
  userEvent.type(screen.getByLabelText('Message'), 'some-message')
  userEvent.click(screen.getByText('Add message'))

  expect(getSuccessMessages(store.getState())).toEqual(['some-message'])
  await waitFor(() => {
    expect(history.location.pathname).toEqual(ROUTE_SETTINGS)
  })
})

it('should not allow a blank success messages to be added', () => {
  const state = {[SUCCESS_ROOT]: []}
  render(<AddMessage/>, state)

  userEvent.clear(screen.getByLabelText('Message'))
  userEvent.click(screen.getByText('Add message'))

  expect(screen.queryByText('Enter a message or image URL')).toBeInTheDocument()
})

it('should not allow the same success message to be added', () => {
  const state = {[SUCCESS_ROOT]: ['some-message']}
  render(<AddMessage/>, state)

  userEvent.type(screen.getByLabelText('Message'), 'some-message')
  userEvent.click(screen.getByText('Add message'))

  expect(screen.queryByText('Message has already been added')).toBeInTheDocument()
})
