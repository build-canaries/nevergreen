import { render } from '../../testUtils/testHelpers'
import { buildFeed } from '../../testUtils/builders'
import { screen } from '@testing-library/react'
import { FeedCard } from './FeedCard'
import { AuthTypes, feedsRoot, TrackingMode } from './FeedsReducer'
import { selectedRoot as selectedName } from './SelectedReducer'

it('should display some feed details', () => {
  const feed = buildFeed({
    trayId: 'trayId',
    url: 'http://some-url',
    authType: AuthTypes.token,
    trackingMode: TrackingMode.selected,
  })
  const state = {
    [feedsRoot]: { trayId: feed },
    [selectedName]: { trayId: ['1'] },
  }

  render(<FeedCard feed={feed} />, { state })

  expect(screen.getByText(/http:\/\/some-url/)).toBeInTheDocument()
  expect(screen.getByText('Access token')).toBeInTheDocument()
  expect(screen.getByText('Selected |1|')).toBeInTheDocument()
})

it('should display links to edit', () => {
  const feed = buildFeed({
    name: 'some-name',
  })
  const state = {
    [feedsRoot]: { trayId: feed },
    [selectedName]: { trayId: ['1'] },
  }

  render(<FeedCard feed={feed} />, { state })

  expect(
    screen.getByRole('link', { name: 'Update connection for some-name' }),
  ).toBeInTheDocument()
  expect(
    screen.getByRole('link', { name: 'Manage projects for some-name' }),
  ).toBeInTheDocument()
  expect(
    screen.getByRole('link', { name: 'Update details for some-name' }),
  ).toBeInTheDocument()
})
