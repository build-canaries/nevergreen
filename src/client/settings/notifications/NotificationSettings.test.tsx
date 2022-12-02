import React from 'react'
import {render} from '../../testUtils/testHelpers'
import {screen} from '@testing-library/react'
import {NotificationSettings} from './NotificationSettings'
import {getAllowAudioNotifications, getToggleVersionCheck, notificationsRoot} from './NotificationsReducer'
import {Prognosis} from '../../domain/Project'

it('should allow for turning on and off checking for new versions', async () => {
  const state = {
    [notificationsRoot]: {
      enableNewVersionCheck: false
    }
  }

  const {store, user} = render(<NotificationSettings/>, {state})
  await user.click(screen.getByLabelText('Check for new Nevergreen versions'))

  expect(getToggleVersionCheck(store.getState())).toBeTruthy()
})

it('should allow turning on and off play audio notifications', async () => {
  const state = {
    [notificationsRoot]: {
      allowAudioNotifications: false
    }
  }

  const {store, user} = render(<NotificationSettings/>, {state})
  await user.click(screen.getByLabelText('Allow audio notifications'))

  expect(getAllowAudioNotifications(store.getState())).toBeTruthy()
})

it('should display a message if no notifications have been added', () => {
  const state = {
    [notificationsRoot]: {
      notifications: {}
    }
  }
  render(<NotificationSettings/>, {state})
  expect(screen.getByText('No notifications added')).toBeInTheDocument()
})

it('should display added notifications', () => {
  const state = {
    [notificationsRoot]: {
      notifications: {
        [Prognosis.sick]: {systemNotification: true, sfx: '/some-sfx.mp3'}
      }
    }
  }

  render(<NotificationSettings/>, {state})

  expect(screen.getByRole('heading', {level: 2, name: 'Sick notification'})).toBeInTheDocument()
  expect(screen.queryByText('No notifications added')).not.toBeInTheDocument()
})
