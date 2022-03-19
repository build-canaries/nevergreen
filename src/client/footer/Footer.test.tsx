import React from 'react'
import {buildFeed, buildState, render, setupReactModal} from '../testHelpers'
import {Footer} from './Footer'
import userEvent from '@testing-library/user-event'
import {FEEDS_ROOT} from '../settings/tracking/FeedsReducer'
import {screen} from '@testing-library/react'
import {ROUTE_ABOUT} from '../AppRoutes'

beforeEach(setupReactModal)

it('should have "about" information', () => {
  const state = buildState({
    [FEEDS_ROOT]: {
      trayId: buildFeed({serverType: 'circle'})
    }
  })
  render(<Footer hide={false}/>, {state})
  userEvent.click(screen.getByText(/Nevergreen v[\d.]+\+[\d]+\.[a-zA-Z0-9]+ [a-zA-Z ]+ by Build Canaries/))

  expect(window.location.pathname).toEqual(ROUTE_ABOUT)
})
