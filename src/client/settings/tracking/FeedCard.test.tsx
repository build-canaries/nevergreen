import { render } from '../../testUtils/testHelpers'
import { buildFeed } from '../../testUtils/builders'
import { screen } from '@testing-library/react'
import { FeedCard } from './FeedCard'
import { feedsRoot, TrackingMode } from './FeedsReducer'
import { selectedRoot as selectedName } from './SelectedReducer'

it('should display some feed details', () => {
  const feed = buildFeed({
    trayId: 'trayId',
    url: 'http://some-url',
    trackingMode: TrackingMode.selected,
  })
  const state = {
    [feedsRoot]: { trayId: feed },
    [selectedName]: { trayId: ['1'] },
  }
  render(<FeedCard feed={feed} />, { state })
  expect(screen.getByText(/http:\/\/some-url/)).toBeInTheDocument()
  expect(screen.getByText('Selected')).toBeInTheDocument()
})
