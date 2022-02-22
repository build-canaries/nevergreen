import React from 'react'
import {screen, waitFor} from '@testing-library/react'
import {buildFeed, render} from '../../../testHelpers'
import {FEEDS_ROOT, getFeed} from '../FeedsReducer'
import userEvent from '@testing-library/user-event'
import {UpdateDetailsPage} from './UpdateDetailsPage'

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

  const {store} = render(<UpdateDetailsPage/>, {state, outletContext: feed})

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
  const feed = buildFeed({
    trayId: 'trayId',
    name: 'some-name'
  })
  const state = {
    [FEEDS_ROOT]: {trayId: feed}
  }

  const {store} = render(<UpdateDetailsPage/>, {state, outletContext: feed})

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

  render(<UpdateDetailsPage/>, {state, mountPath: 'details', currentLocation: 'details', outletContext: feed})

  userEvent.click(screen.getByRole('button', {name: 'Back to tracking'}))

  await waitFor(() => {
    expect(window.location.pathname).toEqual('/')
  })
})
