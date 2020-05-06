import React from 'react'
import userEvent from '@testing-library/user-event'
import {Notification} from '../../src/client/Notification'
import {render} from './testHelpers'
import {noop} from 'lodash'

const DEFAULT_PROPS = {
  notification: '',
  dismiss: noop,
  fullScreen: false
}

it('should not render anything if notification is empty', () => {
  const props = {...DEFAULT_PROPS, notification: ''}
  const {container} = render(<Notification {...props}/>)
  expect(container.firstChild).toBeNull()
})

it('should not render anything if notification is blank', () => {
  const props = {...DEFAULT_PROPS, notification: '          '}
  const {container} = render(<Notification {...props}/>)
  expect(container.firstChild).toBeNull()
})

it('should be able to dismiss shown notifications', () => {
  const dismiss = jest.fn()
  const props = {...DEFAULT_PROPS, notification: 'some notification', dismiss}

  const {queryByText, getByText} = render(<Notification {...props}/>)
  expect(queryByText('some notification')).toBeInTheDocument()

  userEvent.click(getByText('Dismiss'))
  expect(dismiss).toHaveBeenCalled()
})
