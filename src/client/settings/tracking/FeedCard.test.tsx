import React from 'react'
import { render } from '../../testUtils/testHelpers'
import { buildFeed } from '../../testUtils/builders'
import { screen } from '@testing-library/react'
import { FeedCard } from './FeedCard'
import { feedsRoot as feedsName } from './FeedsReducer'
import { selectedRoot as selectedName } from './SelectedReducer'
import { TrackingMode } from '../../domain/Feed'

it('should display some feed details', () => {
  const feed = buildFeed({
    trayId: 'trayId',
    url: 'http://some-url',
    trackingMode: TrackingMode.selected,
  })
  const state = {
    [feedsName]: { trayId: feed },
    [selectedName]: { trayId: ['1'] },
  }
  render(<FeedCard feed={feed} />, { state })
  expect(screen.getByText(/http:\/\/some-url/)).toBeInTheDocument()
  expect(screen.getByText('Selected')).toBeInTheDocument()
})
