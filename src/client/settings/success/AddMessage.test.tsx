import React from 'react'
import {render} from '../../testHelpers'
import userEvent from '@testing-library/user-event'
import {getSuccessMessages, SUCCESS_ROOT} from './SuccessReducer'
import {AddMessage} from './AddMessage'

it('should allow success messages to be added', () => {
  const state = {[SUCCESS_ROOT]: []}

  const {getByText, getByLabelText, store} = render(<AddMessage/>, state)
  userEvent.type(getByLabelText('Message'), 'some-message')
  userEvent.click(getByText('Add message'))

  expect(getSuccessMessages(store.getState())).toEqual(['some-message'])
})

it('should not allow a blank success messages to be added', () => {
  const state = {[SUCCESS_ROOT]: []}
  const {getByText, getByLabelText, queryByText} = render(<AddMessage/>, state)

  userEvent.type(getByLabelText('Message'), '')
  userEvent.click(getByText('Add message'))

  expect(queryByText('Please enter a success message or image URL')).toBeInTheDocument()
})

it('should not allow the same success message to be added', () => {
  const state = {[SUCCESS_ROOT]: ['some-message']}
  const {getByText, getByLabelText, queryByText} = render(<AddMessage/>, state)

  userEvent.type(getByLabelText('Message'), 'some-message')
  userEvent.click(getByText('Add message'))

  expect(queryByText('Success message has already been added, please try another')).toBeInTheDocument()
})
