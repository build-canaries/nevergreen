import React from 'react'
import {screen, waitFor} from '@testing-library/react'
import {buildTray, render} from '../../testHelpers'
import {getTray, TRAYS_ROOT} from '../TraysReducer'
import userEvent from '@testing-library/user-event'
import {UpdateDetailsPage} from './UpdateDetailsPage'

it('should be able to update details', async () => {
  const tray = buildTray({
    trayId: 'trayId',
    name: 'some-name',
    serverType: 'go',
    includeNew: false
  })
  const state = {
    [TRAYS_ROOT]: {trayId: tray}
  }
  const {store} = render(<UpdateDetailsPage feed={tray}/>, {state})

  userEvent.clear(screen.getByLabelText('Name'))
  userEvent.type(screen.getByLabelText('Name'), 'some-new-name')
  userEvent.selectOptions(screen.getByLabelText('Server type'), 'circle')
  userEvent.click(screen.getByLabelText('Automatically include new projects'))

  await waitFor(() => {
    expect(getTray('trayId')(store.getState())).toEqual(expect.objectContaining({
      name: 'some-new-name',
      serverType: 'circle',
      includeNew: true
    }))
  })
})

it('should be able to generate a new random name', async () => {
  const tray = buildTray({
    trayId: 'trayId',
    name: 'some-name'
  })
  const state = {
    [TRAYS_ROOT]: {trayId: tray}
  }
  const {store} = render(<UpdateDetailsPage feed={tray}/>, {state})
  userEvent.click(screen.getByText('randomise name'))
  userEvent.click(document.body) // trigger blur

  await waitFor(() => {
    expect(getTray('trayId')(store.getState())).toEqual(expect.not.objectContaining({
      name: 'some-name'
    }))
  })
})
