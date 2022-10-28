import React from 'react'
import {render} from '../../testUtils/testHelpers'
import {screen} from '@testing-library/react'
import {NotificationSettings} from './NotificationSettings'
import {getAllowAudioNotifications, getToggleVersionCheck, NOTIFICATIONS_ROOT} from './NotificationsReducer'
import {Prognosis} from '../../domain/Project'

it('should allow for turning on and off checking for new versions', async () => {
  const state = {
    [NOTIFICATIONS_ROOT]: {
      enableNewVersionCheck: false
    }
  }

  const {store, user} = render(<NotificationSettings/>, {state})
  await user.click(screen.getByLabelText('Check for new Nevergreen versions'))

  expect(getToggleVersionCheck(store.getState())).toBeTruthy()
})

it('should allow turning on and off play audio notifications', async () => {
  const state = {
    [NOTIFICATIONS_ROOT]: {
      allowAudioNotifications: false
    }
  }

  const {store, user} = render(<NotificationSettings/>, {state})
  await user.click(screen.getByLabelText('Allow audio notifications'))

  expect(getAllowAudioNotifications(store.getState())).toBeTruthy()
})

it('should display a message if no notifications have been added', () => {
  const state = {
    [NOTIFICATIONS_ROOT]: {
      notifications: {}
    }
  }
  render(<NotificationSettings/>, {state})
  expect(screen.getByText('No notifications added')).toBeInTheDocument()
})

it('should display added notifications', () => {
  const state = {
    [NOTIFICATIONS_ROOT]: {
      notifications: {
        [Prognosis.sick]: {systemNotification: true, sfx: '/some-sfx.mp3'}
      }
    }
  }

  render(<NotificationSettings/>, {state})

  expect(screen.getByRole('heading', {level: 2, name: 'Sick notification'})).toBeInTheDocument()
  expect(screen.queryByText('No notifications added')).not.toBeInTheDocument()
})
