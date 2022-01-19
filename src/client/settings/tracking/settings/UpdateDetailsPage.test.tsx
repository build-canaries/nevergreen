import React from 'react'
import {screen, waitFor} from '@testing-library/react'
import {buildFeed, render} from '../../../testHelpers'
import {getFeed, FEEDS_ROOT} from '../FeedsReducer'
import userEvent from '@testing-library/user-event'
import {UpdateDetailsPage} from './UpdateDetailsPage'
import {ROUTE_SETTINGS_TRACKING} from '../../../Routes'

it('should be able to update details', async () => {
  const feed = buildFeed({
    trayId: 'trayId',
    name: 'some-name',
    serverType: 'go',
    includeNew: false
  })
  const state = {
    [FEEDS_ROOT]: {trayId: feed}
  }
  const {store} = render(<UpdateDetailsPage feed={feed}/>, {state})

  userEvent.clear(screen.getByLabelText('Name'))
  userEvent.type(screen.getByLabelText('Name'), 'some-new-name')
  userEvent.selectOptions(screen.getByLabelText('Server type'), 'circle')
  userEvent.click(screen.getByLabelText('Automatically include new projects'))

  await waitFor(() => {
    expect(getFeed('trayId')(store.getState())).toEqual(expect.objectContaining({
      name: 'some-new-name',
      serverType: 'circle',
      includeNew: true
    }))
  })
})

it('should be able to generate a new random name', async () => {
  const tray = buildFeed({
    trayId: 'trayId',
    name: 'some-name'
  })
  const state = {
    [FEEDS_ROOT]: {trayId: tray}
  }
  const {store} = render(<UpdateDetailsPage feed={tray}/>, {state})
  userEvent.click(screen.getByText('randomise name'))
  userEvent.click(document.body) // trigger blur

  await waitFor(() => {
    expect(getFeed('trayId')(store.getState())).toEqual(expect.not.objectContaining({
      name: 'some-name'
    }))
  })
})

it('should be able to go back to the tracking page', async () => {
  const feed = buildFeed({
    trayId: 'trayId',
    name: 'some-name',
    serverType: 'go',
    includeNew: false
  })
  const state = {
    [FEEDS_ROOT]: {trayId: feed}
  }
  const {history} = render(<UpdateDetailsPage feed={feed}/>, {state})

  userEvent.click(screen.getByRole('button', {name: 'Back to tracking'}))

  await waitFor(() => {
    expect(history.location.pathname).toEqual(ROUTE_SETTINGS_TRACKING)
  })
})
