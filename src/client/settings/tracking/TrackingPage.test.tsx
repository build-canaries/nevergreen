import React from 'react'
import {buildFeed, render} from '../../testHelpers'
import {FEEDS_ROOT} from './FeedsReducer'
import {PROJECTS_ROOT} from './ProjectsReducer'
import {screen, waitFor} from '@testing-library/react'
import {TrackingPage} from './TrackingPage'
import {SELECTED_ROOT} from './SelectedReducer'
import {getRefreshTime, SETTINGS_ROOT} from '../SettingsReducer'

it('should allow changing the poll time', async () => {
  const state = {
    [SETTINGS_ROOT]: {
      refreshTime: 10
    }
  }
  const {store, user} = render(<TrackingPage/>, {state})
  await user.selectOptions(screen.getByLabelText('Poll for feed changes every'), '600')
  expect(getRefreshTime(store.getState())).toEqual(600)
})

it('should render added trays', () => {
  const tray = buildFeed({
    trayId: 'trayId',
    name: 'some-name'
  })
  const state = {
    [FEEDS_ROOT]: {trayId: tray},
    [PROJECTS_ROOT]: {trayId: []},
    [SELECTED_ROOT]: {trayId: []}
  }
  render(<TrackingPage/>, {state})
  expect(screen.getByRole('heading', {name: 'some-name'})).toBeInTheDocument()
})

it('should allow trays to be added', async () => {
  const {user} = render(<TrackingPage/>)
  await user.click(screen.getByRole('button', {name: 'Add feed'}))
  await waitFor(() => {
    expect(window.location.pathname).toEqual('/add')
  })
})

it('should show a helpful message if no trays are added', () => {
  const state = {
    [FEEDS_ROOT]: {},
    [PROJECTS_ROOT]: {}
  }
  render(<TrackingPage/>, {state})
  expect(screen.getByText('No feeds added, add a feed to start monitoring')).toBeInTheDocument()
})
