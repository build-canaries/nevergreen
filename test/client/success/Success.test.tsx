import React from 'react'
import {NO_MESSAGES_WARNING, Success} from '../../../src/client/success/Success'
import {render} from '../testHelpers'
import userEvent from '@testing-library/user-event'
import {SUCCESS_ROOT} from '../../../src/client/reducers/SuccessReducer'

describe('Success <Success/>', () => {

  test('should show success messages', () => {
    const state = {[SUCCESS_ROOT]: ['some-message', 'http://some-url']}
    const {queryByText} = render(<Success/>, state)
    expect(queryByText('some-message')).toBeInTheDocument()
  })

  test('should show success images', () => {
    const state = {[SUCCESS_ROOT]: ['some-message', 'http://some-url']}
    const {getByTestId} = render(<Success/>, state)
    expect(getByTestId('success-image')).toHaveAttribute('src', 'http://some-url')
  })

  test('should allow success messages to be added', async () => {
    const state = {[SUCCESS_ROOT]: []}
    const {getByText, getByLabelText, queryByText} = render(<Success/>, state)
    await userEvent.type(getByLabelText('message'), 'some-message')
    userEvent.click(getByText('add'))
    expect(queryByText('some-message')).toBeInTheDocument()
  })

  test('should allow success messages to be removed', () => {
    const state = {[SUCCESS_ROOT]: ['some-message']}
    const {getByText, queryByText} = render(<Success/>, state)
    userEvent.click(getByText('remove success message'))
    expect(queryByText('some-message')).not.toBeInTheDocument()
  })

  test('should show a warning if all success messages are removed', () => {
    const state = {[SUCCESS_ROOT]: []}
    const {queryByText, queryByTestId} = render(<Success/>, state)
    expect(queryByText(NO_MESSAGES_WARNING)).toBeInTheDocument()
    expect(queryByTestId('success-message')).not.toBeInTheDocument()
    expect(queryByTestId('success-image')).not.toBeInTheDocument()
  })

  test('should not show a warning if at least one success messages exists', () => {
    const state = {[SUCCESS_ROOT]: ['some-message']}
    const {queryByText} = render(<Success/>, state)
    expect(queryByText(NO_MESSAGES_WARNING)).not.toBeInTheDocument()
  })
})
