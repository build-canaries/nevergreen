import React from 'react'
import {NO_MESSAGES_WARNING, SuccessMessages} from './SuccessMessages'
import {render} from '../../testUtils/testHelpers'
import {SUCCESS_ROOT} from './SuccessReducer'
import {screen} from '@testing-library/react'

it('should show success messages', () => {
  const state = {[SUCCESS_ROOT]: ['some-message', 'http://some-url']}
  render(<SuccessMessages/>, {state})
  expect(screen.getByText('some-message')).toBeInTheDocument()
  expect(screen.getByTestId('success-image')).toHaveAttribute('src', 'http://some-url')
})

it('should allow success messages to be removed', async () => {
  const state = {[SUCCESS_ROOT]: ['some-message']}
  const {user} = render(<SuccessMessages/>, {state})
  await user.click(screen.getByText('remove success message'))
  expect(screen.queryByText('some-message')).not.toBeInTheDocument()
})

it('should show a warning if all success messages are removed', () => {
  const state = {[SUCCESS_ROOT]: []}
  render(<SuccessMessages/>, {state})
  expect(screen.getByText(NO_MESSAGES_WARNING)).toBeInTheDocument()
  expect(screen.queryByTestId('success-message')).not.toBeInTheDocument()
  expect(screen.queryByTestId('success-image')).not.toBeInTheDocument()
})

it('should not show a warning if at least one success messages exists', () => {
  const state = {[SUCCESS_ROOT]: ['some-message']}
  render(<SuccessMessages/>, {state})
  expect(screen.queryByText(NO_MESSAGES_WARNING)).not.toBeInTheDocument()
})
