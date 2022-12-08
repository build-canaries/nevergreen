import React from 'react'
import { render } from '../../testUtils/testHelpers'
import {
  getClickToShowMenu,
  getShowBuildLabel,
  getShowBuildTime,
  getShowFeedIdentifier,
  settingsRoot,
} from '../SettingsReducer'
import { screen } from '@testing-library/react'
import { DisplaySettings } from './DisplaySettings'

it('should set the click to show menu setting', async () => {
  const state = {
    [settingsRoot]: {
      clickToShowMenu: false,
    },
  }

  const { store, user } = render(<DisplaySettings />, { state })
  await user.click(screen.getByLabelText('Click to show menu'))

  expect(getClickToShowMenu(store.getState())).toBeTruthy()
})

it('should set the show feed identifier setting', async () => {
  const state = {
    [settingsRoot]: {
      showTrayName: false,
    },
  }

  const { store, user } = render(<DisplaySettings />, { state })
  await user.click(screen.getByLabelText('Show feed identifier'))

  expect(getShowFeedIdentifier(store.getState())).toBeTruthy()
})

it('should set the show build time setting', async () => {
  const state = {
    [settingsRoot]: {
      showBuildTime: false,
    },
  }

  const { store, user } = render(<DisplaySettings />, { state })
  await user.click(screen.getByLabelText('Show build time'))

  expect(getShowBuildTime(store.getState())).toBeTruthy()
})

it('should set the show build label setting', async () => {
  const state = {
    [settingsRoot]: {
      showBuildLabel: false,
    },
  }

  const { store, user } = render(<DisplaySettings />, { state })
  await user.click(screen.getByLabelText('Show build label'))

  expect(getShowBuildLabel(store.getState())).toBeTruthy()
})
