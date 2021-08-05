import React from 'react'
import {Success} from './Success'
import {render} from '../testHelpers'
import {SUCCESS_ROOT} from '../settings/success/SuccessReducer'
import {screen} from '@testing-library/react'

it('should pick a message when first rendered to stop it changing after every successful refresh', () => {
  const state = {[SUCCESS_ROOT]: ['foo', 'bar', 'baz']}
  const {rerender} = render(<Success/>, {state})
  const message = screen.getByTestId('success-message').textContent as string
  rerender(<Success/>)
  expect(screen.queryByText(message)).toBeInTheDocument()
  rerender(<Success/>)
  expect(screen.queryByText(message)).toBeInTheDocument()
})

it('should render text messages', () => {
  const state = {[SUCCESS_ROOT]: ['some-message']}
  render(<Success/>, {state})
  expect(screen.getByText('some-message')).toBeInTheDocument()
})

it('should render images', () => {
  const state = {[SUCCESS_ROOT]: ['http://some-url']}
  render(<Success/>, {state})
  expect(screen.getByRole('img')).toHaveAttribute('src', 'http://some-url')
})

it('should render nothing if there are no success messages', () => {
  const state = {[SUCCESS_ROOT]: []}
  const {container} = render(<Success/>, {state})
  // eslint-disable-next-line testing-library/no-node-access
  expect(container.firstChild).toBeNull()
})
