import React from 'react'
import {Notification} from './Notification'
import {render} from './testUtils/testHelpers'
import noop from 'lodash/noop'
import {screen} from '@testing-library/react'

const defaultProps = {
  notification: '',
  onDismiss: noop,
  hide: false
}

it('should not render anything if notification is empty', () => {
  const props = {...defaultProps, notification: ''}
  const {container} = render(<Notification {...props}/>)
  // eslint-disable-next-line testing-library/no-node-access
  expect(container.firstChild).toBeNull()
})

it('should be able to dismiss shown notifications', async () => {
  const onDismiss = jest.fn()
  const props = {...defaultProps, notification: 'some notification', onDismiss}

  const {user} = render(<Notification {...props}/>)
  expect(screen.getByText('some notification')).toBeInTheDocument()

  await user.click(screen.getByRole('button', {name: 'Dismiss info messages'}))
  expect(onDismiss).toHaveBeenCalled()
})
