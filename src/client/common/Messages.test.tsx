import {render} from '../testHelpers'
import React from 'react'
import {Messages, MessagesType} from './Messages'

it('should not render anything if messages is an empty array', () => {
  const props = {type: MessagesType.ERROR, messages: []}
  const {container} = render(<Messages {...props} />)
  expect(container.firstChild).toBeNull()
})

it('should not render anything if messages is a blank string', () => {
  const props = {type: MessagesType.ERROR, messages: ''}
  const {container} = render(<Messages {...props} />)
  expect(container.firstChild).toBeNull()
})

it('should render the messages', () => {
  const props = {type: MessagesType.ERROR, messages: ['some-message', 'another-message']}
  const {queryByText} = render(<Messages {...props} />)
  expect(queryByText('some-message')).toBeInTheDocument()
  expect(queryByText('another-message')).toBeInTheDocument()
})
