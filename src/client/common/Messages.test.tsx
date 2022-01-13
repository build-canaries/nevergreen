import {render} from '../testHelpers'
import React from 'react'
import {Messages, MessagesType} from './Messages'
import {screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

it('should not render anything if messages is an empty array', () => {
  const props = {type: MessagesType.ERROR, messages: [], icon: <div/>}
  const {container} = render(<Messages {...props} />)
  // eslint-disable-next-line testing-library/no-node-access
  expect(container.firstChild).toBeNull()
})

it('should not render anything if messages is a blank string', () => {
  const props = {type: MessagesType.ERROR, messages: '', icon: <div/>}
  const {container} = render(<Messages {...props} />)
  // eslint-disable-next-line testing-library/no-node-access
  expect(container.firstChild).toBeNull()
})

it('should render the messages', () => {
  const props = {type: MessagesType.ERROR, messages: ['some-message', 'another-message'], icon: <div/>}
  render(<Messages {...props} />)
  expect(screen.getByText('some-message')).toBeInTheDocument()
  expect(screen.getByText('another-message')).toBeInTheDocument()
})

it('should allow messages to be dismissed', () => {
  const onDismiss = jest.fn()
  const props = {type: MessagesType.INFO, messages: 'irrelevant', icon: <div/>, onDismiss}
  render(<Messages {...props} />)
  userEvent.click(screen.getByRole('button', {name: 'Dismiss info messages'}))
  expect(onDismiss).toHaveBeenCalled()
})
