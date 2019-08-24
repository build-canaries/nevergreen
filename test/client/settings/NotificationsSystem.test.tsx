import React from 'react'
import userEvent from '@testing-library/user-event'
import {
  NOT_SUPPORTED_MESSAGE,
  NotificationsSystem,
  PERMISSION_DENIED_MESSAGE
} from '../../../src/client/settings/NotificationsSystem'
import {render} from '../testHelpers'
import {getShowSystemNotifications, SETTINGS_ROOT} from '../../../src/client/settings/SettingsReducer'
import * as SystemNotifications from '../../../src/client/common/SystemNotifications'

describe('<NotificationsSystem/>', () => {

  test('should give the option to show browser notifications if they are supported', () => {
    jest.spyOn(SystemNotifications, 'supported').mockReturnValue(true)
    const state = {
      [SETTINGS_ROOT]: {
        systemNotificationPermissionDenied: false,
        showSystemNotifications: false
      }
    }
    const {store, getByLabelText} = render(<NotificationsSystem/>, state)
    userEvent.click(getByLabelText('show system notifications'))
    expect(getShowSystemNotifications(store.getState())).toBeTruthy()
  })

  test('should not show the not supported message if browser notifications are supported', () => {
    jest.spyOn(SystemNotifications, 'supported').mockReturnValue(true)
    const {queryByText} = render(<NotificationsSystem/>)
    expect(queryByText('Unfortunately your browser doesn\'t support notifications.')).not.toBeInTheDocument()
  })

  test('should show the not supported message if browser notifications are not supported', () => {
    jest.spyOn(SystemNotifications, 'supported').mockReturnValue(false)
    const {queryByText} = render(<NotificationsSystem/>)
    expect(queryByText(NOT_SUPPORTED_MESSAGE)).toBeInTheDocument()
  })

  test('should not give the option to show browser notifications if they are not supported', () => {
    jest.spyOn(SystemNotifications, 'supported').mockReturnValue(false)
    const {queryByLabelText} = render(<NotificationsSystem/>)
    expect(queryByLabelText('show system notifications')).not.toBeInTheDocument()
  })

  test('should show a message if notifications are supported but permission is denied', () => {
    jest.spyOn(SystemNotifications, 'supported').mockReturnValue(true)
    const state = {
      [SETTINGS_ROOT]: {
        systemNotificationPermissionDenied: true
      }
    }
    const {queryByText} = render(<NotificationsSystem/>, state)
    expect(queryByText(PERMISSION_DENIED_MESSAGE)).toBeInTheDocument()
  })

  test('should disable the checkbox if permission is being requested', () => {
    jest.spyOn(SystemNotifications, 'supported').mockReturnValue(true)
    const state = {
      [SETTINGS_ROOT]: {
        systemNotificationPermissionDenied: false,
        systemNotificationRequestingPermission: true
      }
    }
    const {getByLabelText} = render(<NotificationsSystem/>, state)
    userEvent.click(getByLabelText('show system notifications'))
    expect(getByLabelText('show system notifications')).toHaveAttribute('disabled')
  })
})
