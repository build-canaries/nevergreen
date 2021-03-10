import React from 'react'
import {NO_MESSAGES_WARNING, SuccessMessages} from './SuccessMessages'
import {render} from '../../testHelpers'
import userEvent from '@testing-library/user-event'
import {SUCCESS_ROOT} from './SuccessReducer'

it('should show success messages', () => {
  const state = {[SUCCESS_ROOT]: ['some-message', 'http://some-url']}
  const {queryByText, getByTestId} = render(<SuccessMessages/>, state)
  expect(queryByText('some-message')).toBeInTheDocument()
  expect(getByTestId('success-image')).toHaveAttribute('src', 'http://some-url')
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
