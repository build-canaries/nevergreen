import React from 'react'
import userEvent from '@testing-library/user-event'
import {Notification} from './Notification'
import {render} from './testHelpers'
import noop from 'lodash/noop'
import {screen} from '@testing-library/react'

const DEFAULT_PROPS = {
  notification: '',
  onDismiss: noop,
  hide: false
}

it('should not render anything if notification is empty', () => {
  const props = {...DEFAULT_PROPS, notification: ''}
  const {container} = render(<Notification {...props}/>)
  // eslint-disable-next-line testing-library/no-node-access
  expect(container.firstChild).toBeNull()
})

it('should be able to dismiss shown notifications', () => {
  const onDismiss = jest.fn()
  const props = {...DEFAULT_PROPS, notification: 'some notification', onDismiss}

  render(<Notification {...props}/>)
  expect(screen.getByText('some notification')).toBeInTheDocument()

  userEvent.click(screen.getByRole('button', {name: 'Dismiss info messages'}))
  expect(onDismiss).toHaveBeenCalled()
})
