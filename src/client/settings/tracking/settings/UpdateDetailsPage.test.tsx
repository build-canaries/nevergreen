import React from 'react'
import {screen, waitFor} from '@testing-library/react'
import {buildFeed, render} from '../../../testHelpers'
import {FEEDS_ROOT, getFeed} from '../FeedsReducer'
import {UpdateDetailsPage} from './UpdateDetailsPage'
import {SELECTED_ROOT} from '../SelectedReducer'
import {PROJECTS_ROOT} from '../ProjectsReducer'

it('should be able to update details', async () => {
  const feed = buildFeed({
    trayId: 'trayId',
    name: 'some-name',
    serverType: 'go',
    includeNew: false
  })
  const state = {
    [FEEDS_ROOT]: {trayId: feed},
    [SELECTED_ROOT]: {trayId: []},
    [PROJECTS_ROOT]: {trayId: []}
  }

  const {store, user} = render(<UpdateDetailsPage/>, {state, outletContext: feed})

  await user.clear(screen.getByLabelText('Name'))
  await user.type(screen.getByLabelText('Name'), 'some-new-name')
  await user.selectOptions(screen.getByLabelText('Server type'), 'circle')
  await user.click(screen.getByLabelText('Automatically include new projects'))

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
    [FEEDS_ROOT]: {trayId: feed},
    [SELECTED_ROOT]: {trayId: []},
    [PROJECTS_ROOT]: {trayId: []}
  }

  const {store, user} = render(<UpdateDetailsPage/>, {state, outletContext: feed})

  await user.click(screen.getByText('randomise name'))
  await user.click(document.body) // trigger blur

  await waitFor(() => {
    expect(getFeed('trayId')(store.getState())).toEqual(expect.not.objectContaining({
      name: 'some-name'
    }))
  })
})
