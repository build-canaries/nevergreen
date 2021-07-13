import React from 'react'
import userEvent from '@testing-library/user-event'
import {screen, waitFor} from '@testing-library/react'
import {
  NOT_SUPPORTED_MESSAGE,
  NOTIFICATIONS_ENABLED_NOTIFICATION,
  NotificationsSystem,
  PERMISSION_DENIED_MESSAGE
} from './NotificationsSystem'
import {render} from '../../testHelpers'
import {getShowSystemNotifications, SETTINGS_ROOT} from '../SettingsReducer'
import * as SystemNotifications from '../../common/SystemNotifications'

beforeEach(() => {
  jest.spyOn(SystemNotifications, 'requestPermission').mockResolvedValue('')
  jest.spyOn(SystemNotifications, 'sendSystemNotification').mockResolvedValue()
})

it('should allow system notifications to be enabled', async () => {
  jest.spyOn(SystemNotifications, 'supported').mockReturnValue(true)
  jest.spyOn(SystemNotifications, 'permissionGranted').mockReturnValue(true)
  const state = {
    [SETTINGS_ROOT]: {
      showSystemNotifications: false
    }
  }
  const {store} = render(<NotificationsSystem/>, state)
  userEvent.click(screen.getByLabelText('Show system notifications'))

  await waitFor(() => {
    expect(getShowSystemNotifications(store.getState())).toBeTruthy()
    expect(SystemNotifications.sendSystemNotification).toHaveBeenCalledWith(NOTIFICATIONS_ENABLED_NOTIFICATION)
  })
})

it('should not show the not supported message if browser notifications are supported', () => {
  jest.spyOn(SystemNotifications, 'supported').mockReturnValue(true)
  render(<NotificationsSystem/>)
  expect(screen.queryByText('Unfortunately your browser doesn\'t support notifications.')).not.toBeInTheDocument()
})

it('should show the not supported message if browser notifications are not supported', () => {
  jest.spyOn(SystemNotifications, 'supported').mockReturnValue(false)
  render(<NotificationsSystem/>)
  expect(screen.queryByText(NOT_SUPPORTED_MESSAGE)).toBeInTheDocument()
})

it('should not give the option to show browser notifications if they are not supported', () => {
  jest.spyOn(SystemNotifications, 'supported').mockReturnValue(false)
  render(<NotificationsSystem/>)
  expect(screen.queryByLabelText('show system notifications')).not.toBeInTheDocument()
})

it('should show a message if notifications are supported but permission is denied', async () => {
  jest.spyOn(SystemNotifications, 'supported').mockReturnValue(true)
  jest.spyOn(SystemNotifications, 'permissionGranted').mockReturnValue(false)

  render(<NotificationsSystem/>)
  userEvent.click(screen.getByLabelText('Show system notifications'))

  await waitFor(() => {
    expect(screen.queryByText(PERMISSION_DENIED_MESSAGE)).toBeInTheDocument()
  })
})
