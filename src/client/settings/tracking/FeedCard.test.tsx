import React from 'react'
import {buildFeed, render} from '../../testHelpers'
import {screen} from '@testing-library/react'
import {FeedCard} from './FeedCard'
import {FEEDS_ROOT} from './FeedsReducer'
import {SELECTED_ROOT} from './SelectedReducer'
import {TrackingMode} from '../../domain/Feed'

it('should display some feed details', () => {
  const feed = buildFeed({
    trayId: 'trayId',
    url: 'http://some-url',
    trackingMode: TrackingMode.selected
  })
  const state = {
    [FEEDS_ROOT]: {trayId: feed},
    [SELECTED_ROOT]: {trayId: ['1']}
  }
  render(<FeedCard feed={feed}/>, {state})
  expect(screen.getByText(/http:\/\/some-url/)).toBeInTheDocument()
  expect(screen.getByText('Selected')).toBeInTheDocument()
})
