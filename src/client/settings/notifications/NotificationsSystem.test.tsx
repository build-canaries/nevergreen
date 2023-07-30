import { screen, waitFor } from '@testing-library/react'
import {
  NOT_SUPPORTED_MESSAGE,
  NOTIFICATIONS_ENABLED_NOTIFICATION,
  NotificationsSystem,
  PERMISSION_DENIED_MESSAGE,
} from './NotificationsSystem'
import { render } from '../../testUtils/testHelpers'
import * as SystemNotifications from '../../common/SystemNotifications'
import {
  getAllowSystemNotifications,
  personalSettingsRoot,
} from '../PersonalSettingsReducer'

beforeEach(() => {
  jest.spyOn(SystemNotifications, 'requestPermission').mockResolvedValue('')
  jest.spyOn(SystemNotifications, 'sendSystemNotification').mockResolvedValue()
})

it('should allow system notifications to be enabled', async () => {
  jest.spyOn(SystemNotifications, 'supported').mockReturnValue(true)
  jest.spyOn(SystemNotifications, 'permissionGranted').mockReturnValue(true)
  const state = {
    [personalSettingsRoot]: {
      allowSystemNotifications: false,
    },
  }
  const { store, user } = render(<NotificationsSystem />, { state })
  await user.click(screen.getByLabelText('Allow system notifications'))

  await waitFor(() => {
    expect(getAllowSystemNotifications(store.getState())).toBeTruthy()
  })
  expect(SystemNotifications.sendSystemNotification).toHaveBeenCalledWith(
    NOTIFICATIONS_ENABLED_NOTIFICATION,
  )
})

it('should not show the not supported message if browser notifications are supported', () => {
  jest.spyOn(SystemNotifications, 'supported').mockReturnValue(true)
  render(<NotificationsSystem />)
  expect(
    screen.queryByText(
      "Unfortunately your browser doesn't support notifications.",
    ),
  ).not.toBeInTheDocument()
})

it('should show the not supported message if browser notifications are not supported', () => {
  jest.spyOn(SystemNotifications, 'supported').mockReturnValue(false)
  render(<NotificationsSystem />)
  expect(screen.getByText(NOT_SUPPORTED_MESSAGE)).toBeInTheDocument()
})

it('should not give the option to show browser notifications if they are not supported', () => {
  jest.spyOn(SystemNotifications, 'supported').mockReturnValue(false)
  render(<NotificationsSystem />)
  expect(
    screen.queryByLabelText('show system notifications'),
  ).not.toBeInTheDocument()
})

it('should show a message if notifications are supported but permission is denied', async () => {
  jest.spyOn(SystemNotifications, 'supported').mockReturnValue(true)
  jest.spyOn(SystemNotifications, 'permissionGranted').mockReturnValue(false)

  const { user } = render(<NotificationsSystem />)
  await user.click(screen.getByLabelText('Allow system notifications'))

  await waitFor(() => {
    expect(screen.getByText(PERMISSION_DENIED_MESSAGE)).toBeInTheDocument()
  })
})

it('should unselect if previously selected by permission has been revoked via the browser settings', async () => {
  jest.spyOn(SystemNotifications, 'permissionGranted').mockReturnValue(false)
  const state = {
    [personalSettingsRoot]: {
      allowSystemNotifications: true,
    },
  }
  const { store } = render(<NotificationsSystem />, { state })

  await waitFor(() => {
    expect(getAllowSystemNotifications(store.getState())).toBeFalsy()
  })
})
