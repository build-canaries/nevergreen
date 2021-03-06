import React from 'react'
import userEvent from '@testing-library/user-event'
import {Notification} from './Notification'
import {render} from './testHelpers'
import noop from 'lodash/noop'
import {screen} from '@testing-library/react'

const DEFAULT_PROPS = {
  notification: '',
  dismiss: noop,
  fullScreen: false
}

it('should not render anything if notification is empty', () => {
  const props = {...DEFAULT_PROPS, notification: ''}
  const {container} = render(<Notification {...props}/>)
  // eslint-disable-next-line testing-library/no-node-access
  expect(container.firstChild).toBeNull()
})

it('should not render anything if notification is blank', () => {
  const props = {...DEFAULT_PROPS, notification: '          '}
  const {container} = render(<Notification {...props}/>)
  // eslint-disable-next-line testing-library/no-node-access
  expect(container.firstChild).toBeNull()
})

it('should be able to dismiss shown notifications', () => {
  const dismiss = jest.fn()
  const props = {...DEFAULT_PROPS, notification: 'some notification', dismiss}

  render(<Notification {...props}/>)
  expect(screen.queryByText('some notification')).toBeInTheDocument()

  userEvent.click(screen.getByText('Dismiss'))
  expect(dismiss).toHaveBeenCalled()
})
