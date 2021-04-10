import React from 'react'
import {render} from '../../testHelpers'
import userEvent from '@testing-library/user-event'
import {getSuccessMessages, SUCCESS_ROOT} from './SuccessReducer'
import {AddMessage} from './AddMessage'
import {ROUTE_SETTINGS} from '../../Routes'
import {waitFor} from '@testing-library/react'

it('should allow success messages to be added', async () => {
  const state = {[SUCCESS_ROOT]: []}

  const {getByText, getByLabelText, store, history} = render(<AddMessage/>, state)
  userEvent.type(getByLabelText('Message'), 'some-message')
  userEvent.click(getByText('Add message'))

  expect(getSuccessMessages(store.getState())).toEqual(['some-message'])
  await waitFor(() => {
    expect(history.location.pathname).toEqual(ROUTE_SETTINGS)
  })
})

it('should not allow a blank success messages to be added', () => {
  const state = {[SUCCESS_ROOT]: []}
  const {getByText, getByLabelText, queryByText} = render(<AddMessage/>, state)

  userEvent.clear(getByLabelText('Message'))
  userEvent.click(getByText('Add message'))

  expect(queryByText('Enter a message or image URL')).toBeInTheDocument()
})

it('should not allow the same success message to be added', () => {
  const state = {[SUCCESS_ROOT]: ['some-message']}
  const {getByText, getByLabelText, queryByText} = render(<AddMessage/>, state)

  userEvent.type(getByLabelText('Message'), 'some-message')
  userEvent.click(getByText('Add message'))

  expect(queryByText('Message has already been added')).toBeInTheDocument()
})
