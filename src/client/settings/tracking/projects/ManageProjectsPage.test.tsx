import {buildFeed, render} from '../../../testUtils/testHelpers'
import React from 'react'
import {screen} from '@testing-library/react'
import {ManageProjectsPage} from './ManageProjectsPage'
import {TrackingMode} from '../../../domain/Feed'
import {FEEDS_ROOT, getFeed} from '../FeedsReducer'

it('should allow the tracking mode to be changed', async () => {
  const trayId = 'some-id'
  const feed = buildFeed({trayId, trackingMode: TrackingMode.selected})
  const state = {
    [FEEDS_ROOT]: {
      [trayId]: feed
    }
  }
  const outletContext = feed
  const {user, store} = render(<ManageProjectsPage/>, {state, outletContext})
  await user.selectOptions(screen.getByLabelText('Tracking mode'), TrackingMode.everything)
  expect(getFeed(trayId)(store.getState())).toEqual(expect.objectContaining({
    trackingMode: TrackingMode.everything
  }))
})
