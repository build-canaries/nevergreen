import React from 'react'
import userEvent from '@testing-library/user-event'
import {Notification} from '../../src/client/Notification'
import {render} from './testHelpers'
import {noop} from 'lodash'

describe('<Notification/>', () => {

  test('should not render anything if notification is empty', () => {
    const {container} = render(<Notification notification='' dismiss={noop}/>)
    expect(container.firstChild).toBeNull()
  })

  test('should not render anything if notification is blank', () => {
    const {container} = render(<Notification notification='      ' dismiss={noop}/>)
    expect(container.firstChild).toBeNull()
  })

  test('should render the notification', () => {
    const {queryByText} = render(<Notification notification='some notification' dismiss={noop}/>)
    expect(queryByText('some notification')).toBeInTheDocument()
  })

  test('should be able to dismiss notifications', () => {
    const dismiss = jest.fn()
    const {getByText} = render(<Notification notification='some notification' dismiss={dismiss}/>)
    userEvent.click(getByText('dismiss'))
    expect(dismiss).toHaveBeenCalled()
  })
})
