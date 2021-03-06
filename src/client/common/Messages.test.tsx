import {render} from '../testHelpers'
import React from 'react'
import {Messages, MessagesType} from './Messages'
import {screen} from '@testing-library/react'

it('should not render anything if messages is an empty array', () => {
  const props = {type: MessagesType.ERROR, messages: []}
  const {container} = render(<Messages {...props} />)
  // eslint-disable-next-line testing-library/no-node-access
  expect(container.firstChild).toBeNull()
})

it('should not render anything if messages is a blank string', () => {
  const props = {type: MessagesType.ERROR, messages: ''}
  const {container} = render(<Messages {...props} />)
  // eslint-disable-next-line testing-library/no-node-access
  expect(container.firstChild).toBeNull()
})

it('should render the messages', () => {
  const props = {type: MessagesType.ERROR, messages: ['some-message', 'another-message']}
  render(<Messages {...props} />)
  expect(screen.queryByText('some-message')).toBeInTheDocument()
  expect(screen.queryByText('another-message')).toBeInTheDocument()
})
