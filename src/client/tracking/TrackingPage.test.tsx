import React from 'react'
import {buildTray, render} from '../testHelpers'
import {TRAYS_ROOT} from './TraysReducer'
import {PROJECTS_ROOT} from './ProjectsReducer'
import {screen, waitFor} from '@testing-library/react'
import {TrackingPage} from './TrackingPage'
import userEvent from '@testing-library/user-event'
import {ROUTE_TRACKING_ADD} from '../Routes'
import {SELECTED_ROOT} from './SelectedReducer'
import {getRefreshTime, SETTINGS_ROOT} from '../settings/SettingsReducer'

it('should allow changing the poll time', () => {
  const state = {
    [SETTINGS_ROOT]: {
      refreshTime: 10
    }
  }
  const {store} = render(<TrackingPage/>, {state})
  userEvent.selectOptions(screen.getByLabelText('Poll for feed changes every'), '600')
  expect(getRefreshTime(store.getState())).toEqual(600)
})

it('should render added trays', () => {
  const tray = buildTray({
    trayId: 'trayId',
    name: 'some-name'
  })
  const state = {
    [TRAYS_ROOT]: {trayId: tray},
    [PROJECTS_ROOT]: {trayId: []},
    [SELECTED_ROOT]: {trayId: []}
  }
  render(<TrackingPage/>, {state})
  expect(screen.getByRole('heading', {name: 'some-name'})).toBeInTheDocument()
})

it('should allow trays to be added', async () => {
  const {history} = render(<TrackingPage/>)
  userEvent.click(screen.getByRole('button', {name: 'Add feed'}))
  await waitFor(() => {
    expect(history.location.pathname).toEqual(ROUTE_TRACKING_ADD)
  })
})

it('should show a helpful message if no trays are added', () => {
  const state = {
    [TRAYS_ROOT]: {},
    [PROJECTS_ROOT]: {}
  }
  render(<TrackingPage/>, {state})
  expect(screen.getByText('No feeds added, add a feed to start monitoring')).toBeInTheDocument()
})
