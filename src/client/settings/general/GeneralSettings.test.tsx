import React from 'react'
import {GeneralSettings} from './GeneralSettings'
import {render} from '../../testHelpers'
import userEvent from '@testing-library/user-event'
import {getClickToShowMenu, SETTINGS_ROOT} from '../SettingsReducer'
import {screen} from '@testing-library/react'

it('should set the click to show menu setting', () => {
  const state = {
    [SETTINGS_ROOT]: {
      clickToShowMenu: false
    }
  }

  const {store} = render(<GeneralSettings/>, {state})
  userEvent.click(screen.getByLabelText('Click to show menu'))

  expect(getClickToShowMenu(store.getState())).toBeTruthy()
})
