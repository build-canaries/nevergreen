import React from 'react'
import {GeneralSettings} from '../../../src/client/settings/GeneralSettings'
import {render} from '../testHelpers'
import userEvent from '@testing-library/user-event'
import {getClickToShowMenu, SETTINGS_ROOT} from '../../../src/client/settings/SettingsReducer'

it('should set the click to show menu setting', () => {
  const state = {
    [SETTINGS_ROOT]: {
      clickToShowMenu: false
    }
  }

  const {store, getByLabelText} = render(<GeneralSettings/>, state)
  userEvent.click(getByLabelText('click to show menu'))

  expect(getClickToShowMenu(store.getState())).toBeTruthy()
})
