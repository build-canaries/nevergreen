import React from 'react'
import {render} from '../../testUtils/testHelpers'
import {buildFeed} from '../../testUtils/builders'
import {feedsRoot as feedsName} from './FeedsReducer'
import {screen, waitFor} from '@testing-library/react'
import {TrackingPage} from './TrackingPage'
import {selectedRoot as selectedName} from './SelectedReducer'
import {getRefreshTime, settingsRoot as settingsName} from '../SettingsReducer'

it('should allow changing the poll time', async () => {
  const state = {
    [settingsName]: {
      refreshTime: 10
    }
  }
  const {store, user} = render(<TrackingPage/>, {state})
  await user.selectOptions(screen.getByLabelText('Poll for feed changes every'), '600')
  expect(getRefreshTime(store.getState())).toEqual(600)
})

it('should show added feeds', () => {
  const tray = buildFeed({
    trayId: 'trayId',
    name: 'some-name'
  })
  const state = {
    [feedsName]: {trayId: tray},
    [selectedName]: {trayId: []}
  }
  render(<TrackingPage/>, {state})
  expect(screen.getByRole('heading', {name: 'some-name'})).toBeInTheDocument()
})

it('should allow feeds to be added', async () => {
  const {user} = render(<TrackingPage/>)
  await user.click(screen.getByRole('button', {name: 'Add feed'}))
  await waitFor(() => {
    expect(window.location.pathname).toEqual('/add')
  })
})

it('should show a helpful message if no feeds are added', () => {
  const state = {
    [feedsName]: {},
  }
  render(<TrackingPage/>, {state})
  expect(screen.getByText('No feeds added, add a feed to start monitoring')).toBeInTheDocument()
})
