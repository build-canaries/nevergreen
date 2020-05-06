import React from 'react'
import userEvent from '@testing-library/user-event'
import {waitFor} from '@testing-library/react'
import {
  NOT_SUPPORTED_MESSAGE,
  NOTIFICATIONS_ENABLED_NOTIFICATION,
  NotificationsSystem,
  PERMISSION_DENIED_MESSAGE
} from '../../../src/client/settings/NotificationsSystem'
import {render} from '../testHelpers'
import {getShowSystemNotifications, SETTINGS_ROOT} from '../../../src/client/settings/SettingsReducer'
import * as SystemNotifications from '../../../src/client/common/SystemNotifications'

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
  const {store, getByLabelText} = render(<NotificationsSystem/>, state)
  userEvent.click(getByLabelText('Show system notifications'))

  expect(getByLabelText('Show system notifications')).toHaveAttribute('disabled')

  await waitFor(() => {
    expect(getShowSystemNotifications(store.getState())).toBeTruthy()
    expect(getByLabelText('Show system notifications')).not.toHaveAttribute('disabled')
    expect(SystemNotifications.sendSystemNotification).toHaveBeenCalledWith(NOTIFICATIONS_ENABLED_NOTIFICATION)
  })
})

it('should not show the not supported message if browser notifications are supported', () => {
  jest.spyOn(SystemNotifications, 'supported').mockReturnValue(true)
  const {queryByText} = render(<NotificationsSystem/>)
  expect(queryByText('Unfortunately your browser doesn\'t support notifications.')).not.toBeInTheDocument()
})

it('should show the not supported message if browser notifications are not supported', () => {
  jest.spyOn(SystemNotifications, 'supported').mockReturnValue(false)
  const {queryByText} = render(<NotificationsSystem/>)
  expect(queryByText(NOT_SUPPORTED_MESSAGE)).toBeInTheDocument()
})

it('should not give the option to show browser notifications if they are not supported', () => {
  jest.spyOn(SystemNotifications, 'supported').mockReturnValue(false)
  const {queryByLabelText} = render(<NotificationsSystem/>)
  expect(queryByLabelText('show system notifications')).not.toBeInTheDocument()
})

it('should show a message if notifications are supported but permission is denied', async () => {
  jest.spyOn(SystemNotifications, 'supported').mockReturnValue(true)
  jest.spyOn(SystemNotifications, 'permissionGranted').mockReturnValue(false)

  const {queryByText, getByLabelText} = render(<NotificationsSystem/>)
  userEvent.click(getByLabelText('Show system notifications'))

  await waitFor(() => {
    expect(queryByText(PERMISSION_DENIED_MESSAGE)).toBeInTheDocument()
  })
})
