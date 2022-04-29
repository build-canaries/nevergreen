import React from 'react'
import {render} from '../../testHelpers'
import {getToggleVersionCheck, SETTINGS_ROOT} from '../SettingsReducer'
import {screen} from '@testing-library/react'
import {NotificationSettings} from './NotificationSettings'

it('should set the state to check for new version', async () => {
  const state = {
    [SETTINGS_ROOT]: {
      enableNewVersionCheck: false
    }
  }

  const {store, user} = render(<NotificationSettings/>, {state})
  await user.click(screen.getByLabelText('Check for new Nevergreen versions'))

  expect(getToggleVersionCheck(store.getState())).toBeTruthy()
})
