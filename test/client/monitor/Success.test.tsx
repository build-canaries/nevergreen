import React from 'react'
import {Success} from '../../../src/client/monitor/Success'
import {render} from '../testHelpers'
import {SUCCESS_ROOT} from '../../../src/client/settings/success/SuccessReducer'

it('should pick a message when first rendered to stop it changing after every successful refresh', () => {
  const state = {[SUCCESS_ROOT]: ['foo', 'bar', 'baz']}
  const {rerender, getByTestId, queryByText} = render(<Success/>, state)
  const message = getByTestId('success-message').textContent as string
  rerender(<Success/>)
  expect(queryByText(message)).toBeInTheDocument()
  rerender(<Success/>)
  expect(queryByText(message)).toBeInTheDocument()
})

it('should render text messages', () => {
  const state = {[SUCCESS_ROOT]: ['some-message']}
  const {getByText} = render(<Success/>, state)
  expect(getByText('some-message')).toBeInTheDocument()
})

it('should render images', () => {
  const state = {[SUCCESS_ROOT]: ['http://some-url']}
  const {getByRole} = render(<Success/>, state)
  expect(getByRole('img')).toHaveAttribute('src', 'http://some-url')
})

it('should render nothing if there are no success messages', () => {
  const state = {[SUCCESS_ROOT]: []}
  const {container} = render(<Success/>, state)
  expect(container.firstChild).toBeNull()
})
