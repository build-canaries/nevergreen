import React from 'react'
import {buildState, buildTray, render, setupReactModal} from '../testHelpers'
import {Footer} from './Footer'
import userEvent from '@testing-library/user-event'
import {TRAYS_ROOT} from '../tracking/TraysReducer'
import {screen} from '@testing-library/react'

beforeEach(setupReactModal)

it('should have "about" information', () => {
  const state = buildState({
    [TRAYS_ROOT]: {
      trayId: buildTray({serverType: 'circle'})
    }
  })
  render(<Footer fullScreen={false}/>, state)
  userEvent.click(screen.getByText(/Nevergreen v[\d.]+\+[\d]+\.[a-zA-Z0-9]+ [a-zA-Z ]+ by Build Canaries/))

  expect(screen.queryByText('Eclipse Public Licence 1.0 (EPL-1.0)')).toBeInTheDocument()
  userEvent.click(screen.getByText('Close'))

  expect(screen.queryByText('Eclipse Public Licence 1.0 (EPL-1.0)')).not.toBeInTheDocument()
})
