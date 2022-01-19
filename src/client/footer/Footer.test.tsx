import React from 'react'
import {buildState, buildFeed, render, setupReactModal} from '../testHelpers'
import {Footer} from './Footer'
import userEvent from '@testing-library/user-event'
import {FEEDS_ROOT} from '../settings/tracking/FeedsReducer'
import {screen} from '@testing-library/react'

beforeEach(setupReactModal)

it('should have "about" information', () => {
  const state = buildState({
    [FEEDS_ROOT]: {
      trayId: buildFeed({serverType: 'circle'})
    }
  })
  render(<Footer hide={false}/>, {state})
  userEvent.click(screen.getByText(/Nevergreen v[\d.]+\+[\d]+\.[a-zA-Z0-9]+ [a-zA-Z ]+ by Build Canaries/))

  expect(screen.getByText('Eclipse Public Licence 1.0 (EPL-1.0)')).toBeInTheDocument()
  userEvent.click(screen.getByText('Close'))

  expect(screen.queryByText('Eclipse Public Licence 1.0 (EPL-1.0)')).not.toBeInTheDocument()
})
