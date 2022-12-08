import React from 'react'
import { screen, waitFor } from '@testing-library/react'
import { render } from '../../../testUtils/testHelpers'
import { buildFeed } from '../../../testUtils/builders'
import { getFeed, feedsRoot as feedsName } from '../FeedsReducer'
import { UpdateDetailsPage } from './UpdateDetailsPage'
import { selectedRoot as selectedName } from '../SelectedReducer'

it('should be able to update details', async () => {
  const feed = buildFeed({
    trayId: 'trayId',
    name: 'some-name',
    serverType: 'go',
  })
  const state = {
    [feedsName]: { trayId: feed },
    [selectedName]: { trayId: [] },
  }

  const { store, user } = render(<UpdateDetailsPage />, {
    state,
    outletContext: feed,
  })

  await user.clear(screen.getByLabelText('Name'))
  await user.type(screen.getByLabelText('Name'), 'some-new-name')
  await user.selectOptions(screen.getByLabelText('Server type'), 'circle')

  await waitFor(() => {
    expect(getFeed('trayId')(store.getState())).toEqual(
      expect.objectContaining({
        name: 'some-new-name',
        serverType: 'circle',
      })
    )
  })
})

it('should be able to generate a new random name', async () => {
  const feed = buildFeed({
    trayId: 'trayId',
    name: 'some-name',
  })
  const state = {
    [feedsName]: { trayId: feed },
    [selectedName]: { trayId: [] },
  }

  const { store, user } = render(<UpdateDetailsPage />, {
    state,
    outletContext: feed,
  })

  await user.click(screen.getByText('randomise name'))
  await user.click(document.body) // trigger blur

  await waitFor(() => {
    expect(getFeed('trayId')(store.getState())).toEqual(
      expect.not.objectContaining({
        name: 'some-name',
      })
    )
  })
})
