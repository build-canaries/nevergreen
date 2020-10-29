import React from 'react'
import {SuccessMessages} from '../../../../src/client/settings/success/SuccessMessages'
import {render} from '../../testHelpers'
import userEvent from '@testing-library/user-event'
import {SUCCESS_ROOT} from '../../../../src/client/settings/success/SuccessReducer'
import {NO_MESSAGES_WARNING} from '../../../../src/client/settings/success/AddMessage'

it('should show success messages', () => {
  const state = {[SUCCESS_ROOT]: ['some-message', 'http://some-url']}
  const {queryByText, getByTestId} = render(<SuccessMessages/>, state)
  expect(queryByText('some-message')).toBeInTheDocument()
  expect(getByTestId('success-image')).toHaveAttribute('src', 'http://some-url')
})

it('should allow success messages to be added', async () => {
  const state = {[SUCCESS_ROOT]: []}

  const {getByText, getByLabelText, queryByText} = render(<SuccessMessages/>, state)
  await userEvent.type(getByLabelText('Message'), 'some-message')
  userEvent.click(getByText('Add message'))

  expect(queryByText('some-message')).toBeInTheDocument()
})

it('should not allow a blank success messages to be added', async () => {
  const state = {[SUCCESS_ROOT]: []}
  const {getByText, getByLabelText, queryByText, queryAllByTestId} = render(<SuccessMessages/>, state)

  await userEvent.type(getByLabelText('Message'), '')
  userEvent.click(getByText('Add message'))

  expect(queryByText('Please enter a success message or image URL')).toBeInTheDocument()
  expect(queryAllByTestId('success-message')).toHaveLength(0)
})

it('should not allow the same success message to be added', async () => {
  const state = {[SUCCESS_ROOT]: ['some-message']}
  const {getByText, getByLabelText, queryByText, queryAllByTestId} = render(<SuccessMessages/>, state)

  await userEvent.type(getByLabelText('Message'), 'some-message')
  userEvent.click(getByText('Add message'))

  expect(queryByText('Success message has already been added, please try another')).toBeInTheDocument()
  expect(queryAllByTestId('success-message')).toHaveLength(1)
})

it('should allow success messages to be removed', () => {
  const state = {[SUCCESS_ROOT]: ['some-message']}
  const {getByText, queryByText} = render(<SuccessMessages/>, state)
  userEvent.click(getByText('remove success message'))
  expect(queryByText('some-message')).not.toBeInTheDocument()
})

it('should show a warning if all success messages are removed', () => {
  const state = {[SUCCESS_ROOT]: []}

  const {queryByText, queryByTestId} = render(<SuccessMessages/>, state)

  expect(queryByText(NO_MESSAGES_WARNING)).toBeInTheDocument()
  expect(queryByTestId('success-message')).not.toBeInTheDocument()
  expect(queryByTestId('success-image')).not.toBeInTheDocument()
})

it('should not show a warning if at least one success messages exists', () => {
  const state = {[SUCCESS_ROOT]: ['some-message']}
  const {queryByText} = render(<SuccessMessages/>, state)
  expect(queryByText(NO_MESSAGES_WARNING)).not.toBeInTheDocument()
})
