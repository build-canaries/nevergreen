import React from 'react'
import userEvent from '@testing-library/user-event'
import {Notification} from '../../../src/client/notification/Notification'
import {render} from '../testHelpers'
import {getNotification, NOTIFICATION_ROOT} from '../../../src/client/notification/NotificationReducer'

describe('<Notification/>', () => {

  test('should not render anything if notification is empty', () => {
    const state = {
      [NOTIFICATION_ROOT]: ''
    }
    const {container} = render(<Notification/>, state)
    expect(container.firstChild).toBeNull()
  })

  test('should not render anything if notification is blank', () => {
    const state = {
      [NOTIFICATION_ROOT]: '     '
    }
    const {container} = render(<Notification/>, state)
    expect(container.firstChild).toBeNull()
  })

  test('should render the notification', () => {
    const state = {
      [NOTIFICATION_ROOT]: 'some notification'
    }
    const {queryByText} = render(<Notification/>, state)
    expect(queryByText('some notification')).toBeInTheDocument()
  })

  test('should be able to dismiss notifications', () => {
    const state = {
      [NOTIFICATION_ROOT]: 'some notification'
    }
    const {store, getByText} = render(<Notification/>, state)
    userEvent.click(getByText('dismiss'))
    expect(getNotification(store.getState())).toEqual('')
  })
})
