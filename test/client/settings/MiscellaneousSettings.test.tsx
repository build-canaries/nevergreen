import React from 'react'
import {render} from '../testHelpers'
import userEvent from '@testing-library/user-event'
import {getToggleVersionCheck, SETTINGS_ROOT} from '../../../src/client/settings/SettingsReducer'
import {MiscellaneousSettings} from '../../../src/client/settings/MiscellaneousSettings'

it('should set the state to check for new version', () => {
  const state = {
    [SETTINGS_ROOT]: {
      enableNewVersionCheck: false
    }
  }

  const {store, getByLabelText} = render(<MiscellaneousSettings/>, state)
  userEvent.click(getByLabelText('Check for updates'))

  expect(getToggleVersionCheck(store.getState())).toBeTruthy()
})
