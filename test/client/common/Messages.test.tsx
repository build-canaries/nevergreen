import {render} from '../testHelpers'
import React from 'react'
import {Messages, MessagesType} from '../../../src/client/common/Messages'

it('should not render anything if messages is empty', () => {
  const props = {type: MessagesType.ERROR, messages: []}
  const {container} = render(<Messages {...props} />)
  expect(container.firstChild).toBeNull()
})

it('should render the messages', () => {
  const props = {type: MessagesType.ERROR, messages: ['some-message', 'another-message']}
  const {getByTestId} = render(<Messages {...props} />)
  expect(getByTestId('error-messages')).toHaveTextContent('some-messageanother-message')
})
