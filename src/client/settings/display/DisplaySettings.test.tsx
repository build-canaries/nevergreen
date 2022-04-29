import React from 'react'
import {render} from '../../testHelpers'
import {
  getClickToShowMenu,
  getShowBuildLabel,
  getShowBuildTime,
  getShowFeedIdentifier,
  SETTINGS_ROOT
} from '../SettingsReducer'
import {screen} from '@testing-library/react'
import {DisplaySettings} from './DisplaySettings'

it('should set the click to show menu setting', async () => {
  const state = {
    [SETTINGS_ROOT]: {
      clickToShowMenu: false
    }
  }

  const {store, user} = render(<DisplaySettings/>, {state})
  await user.click(screen.getByLabelText('Click to show menu'))

  expect(getClickToShowMenu(store.getState())).toBeTruthy()
})

it('should set the show feed identifier setting', async () => {
  const state = {
    [SETTINGS_ROOT]: {
      showTrayName: false
    }
  }

  const {store, user} = render(<DisplaySettings/>, {state})
  await user.click(screen.getByLabelText('Show feed identifier'))

  expect(getShowFeedIdentifier(store.getState())).toBeTruthy()
})

it('should set the show build time setting', async () => {
  const state = {
    [SETTINGS_ROOT]: {
      showBuildTime: false
    }
  }

  const {store, user} = render(<DisplaySettings/>, {state})
  await user.click(screen.getByLabelText('Show build time'))

  expect(getShowBuildTime(store.getState())).toBeTruthy()
})

it('should set the show build label setting', async () => {
  const state = {
    [SETTINGS_ROOT]: {
      showBuildLabel: false
    }
  }

  const {store, user} = render(<DisplaySettings/>, {state})
  await user.click(screen.getByLabelText('Show build label'))

  expect(getShowBuildLabel(store.getState())).toBeTruthy()
})
