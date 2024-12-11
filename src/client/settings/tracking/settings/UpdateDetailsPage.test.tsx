import { screen } from '@testing-library/react'
import { render, waitForLocationToChange } from '../../../testUtils/testHelpers'
import { buildFeed } from '../../../testUtils/builders'
import { feedsRoot as feedsName, getFeed, ServerTypes } from '../FeedsReducer'
import { UpdateDetailsPage } from './UpdateDetailsPage'
import { selectedRoot as selectedName } from '../SelectedReducer'

it('should be able to update details', async () => {
  const feed = buildFeed({
    trayId: 'trayId',
    name: 'some-name',
    serverType: ServerTypes.go,
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
  await user.click(screen.getByRole('button', { name: 'Save changes' }))

  await waitForLocationToChange()

  expect(getFeed('trayId')(store.getState())).toEqual(
    expect.objectContaining({
      name: 'some-new-name',
      serverType: 'circle',
    }),
  )
  expect(window.location.pathname).toEqual('/settings/tracking')
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
  await user.click(screen.getByRole('button', { name: 'Save changes' }))

  await waitForLocationToChange()

  expect(getFeed('trayId')(store.getState())).toEqual(
    expect.not.objectContaining({
      name: 'some-name',
    }),
  )
})
