import React from 'react'
import {screen, waitFor} from '@testing-library/react'
import {buildTray, render} from '../../testHelpers'
import {getTray, TRAYS_ROOT} from '../TraysReducer'
import userEvent from '@testing-library/user-event'
import {ChangeDetailsPage} from './ChangeDetailsPage'
import {REFRESH_HASH, ROUTE_SETTINGS_TRACKING, routeFeedProjects} from '../../Routes'
import {AuthTypes} from '../../domain/Tray'
import * as SecurityGateway from '../../gateways/SecurityGateway'
import {fakeRequest} from '../../gateways/Gateway'

beforeEach(() => {
  jest.spyOn(SecurityGateway, 'encrypt').mockResolvedValue(fakeRequest(''))
})

it('should be able to update details', async () => {
  const tray = buildTray({
    url: 'http://old',
    trayId: 'trayId',
    name: 'some-name',
    serverType: 'go',
    includeNew: false
  })
  const state = {
    [TRAYS_ROOT]: {trayId: tray}
  }
  const {store} = render(<ChangeDetailsPage feed={tray}/>, {state})

  userEvent.clear(screen.getByLabelText('Name'))
  userEvent.type(screen.getByLabelText('Name'), 'some-new-name')
  userEvent.clear(screen.getByLabelText('URL'))
  userEvent.type(screen.getByLabelText('URL'), 'http://new')
  userEvent.selectOptions(screen.getByLabelText('Server type'), 'circle')
  userEvent.click(screen.getByLabelText('Automatically include new projects'))
  userEvent.click(screen.getByRole('button', {name: 'Save'}))

  await waitFor(() => {
    expect(getTray('trayId')(store.getState())).toEqual(expect.objectContaining({
      url: 'http://new',
      name: 'some-new-name',
      serverType: 'circle',
      includeNew: true
    }))
  })
})

it('should be able to change auth', async () => {
  jest.spyOn(SecurityGateway, 'encrypt').mockResolvedValue(fakeRequest('encrypted-token'))
  const feed = buildTray({
    trayId: 'trayId',
    authType: AuthTypes.none
  })
  const state = {
    [TRAYS_ROOT]: {trayId: feed}
  }
  const {store} = render(<ChangeDetailsPage feed={feed}/>, {state})

  userEvent.click(screen.getByRole('button', {name: 'Change auth'}))
  userEvent.selectOptions(screen.getByLabelText('Authentication'), AuthTypes.token)
  userEvent.type(screen.getByLabelText('Token'), 'some-token')
  userEvent.click(screen.getByRole('button', {name: 'Save'}))

  await waitFor(() => {
    expect(getTray('trayId')(store.getState())).toEqual(expect.objectContaining({
      authType: AuthTypes.token,
      encryptedAccessToken: 'encrypted-token'
    }))
  })
})

it('should be able to generate a new random name', () => {
  const tray = buildTray({
    trayId: 'trayId',
    name: 'some-name'
  })
  const state = {
    [TRAYS_ROOT]: {trayId: tray}
  }
  render(<ChangeDetailsPage feed={tray}/>, {state})
  userEvent.click(screen.getByText('randomise name'))

  expect(screen.getByLabelText('Name')).not.toHaveValue('some-name')
})

describe('validation errors', () => {
  it('should display an error if no URL is entered', () => {
    const tray = buildTray({
      trayId: 'trayId',
      name: 'some-name'
    })
    const state = {
      [TRAYS_ROOT]: {trayId: tray}
    }
    render(<ChangeDetailsPage feed={tray}/>, {state})

    userEvent.clear(screen.getByLabelText('URL'))
    userEvent.click(screen.getByRole('button', {name: 'Save'}))

    expect(screen.queryByText('Enter a URL')).toBeInTheDocument()
  })

  it('should display an error if non http(s) URL is entered', () => {
    const tray = buildTray({
      trayId: 'trayId',
      name: 'some-name'
    })
    const state = {
      [TRAYS_ROOT]: {trayId: tray}
    }
    render(<ChangeDetailsPage feed={tray}/>, {state})

    userEvent.clear(screen.getByLabelText('URL'))
    userEvent.type(screen.getByLabelText('URL'), 'file://some-file')
    userEvent.click(screen.getByRole('button', {name: 'Save'}))

    expect(screen.queryByText('Only http(s) URLs are supported')).toBeInTheDocument()
  })

  it('should display an error if a URL already in use by another feed is entered', () => {
    const tray = buildTray({
      trayId: 'trayId'
    })
    const other = buildTray({
      trayId: 'otherId',
      url: 'http://other'
    })
    const state = {
      [TRAYS_ROOT]: {
        trayId: tray,
        otherId: other
      }
    }
    render(<ChangeDetailsPage feed={tray}/>, {state})

    userEvent.clear(screen.getByLabelText('URL'))
    userEvent.type(screen.getByLabelText('URL'), 'http://other')
    userEvent.click(screen.getByRole('button', {name: 'Save'}))

    expect(screen.queryByText('An existing CCTray XML feed already has this URL')).toBeInTheDocument()
  })
})

describe('redirections', () => {
  it('should redirect to projects if the URL has changed', async () => {
    const tray = buildTray({
      trayId: 'trayId'
    })
    const state = {
      [TRAYS_ROOT]: {trayId: tray}
    }
    const {history} = render(<ChangeDetailsPage feed={tray}/>, {state})

    userEvent.clear(screen.getByLabelText('URL'))
    userEvent.type(screen.getByLabelText('URL'), 'http://new')
    userEvent.click(screen.getByRole('button', {name: 'Save'}))

    await waitFor(() => {
      expect(history.location.pathname).toEqual(routeFeedProjects('trayId'))
      expect(history.location.hash).toEqual(REFRESH_HASH)
    })
  })

  it('should redirect to projects if the auth has changed', async () => {
    const feed = buildTray({
      trayId: 'trayId',
      authType: AuthTypes.none
    })
    const state = {
      [TRAYS_ROOT]: {trayId: feed}
    }
    const {history} = render(<ChangeDetailsPage feed={feed}/>, {state})

    userEvent.click(screen.getByRole('button', {name: 'Change auth'}))
    userEvent.selectOptions(screen.getByLabelText('Authentication'), AuthTypes.token)
    userEvent.type(screen.getByLabelText('Token'), 'some-token')
    userEvent.click(screen.getByRole('button', {name: 'Save'}))

    await waitFor(() => {
      expect(history.location.pathname).toEqual(routeFeedProjects('trayId'))
      expect(history.location.hash).toEqual(REFRESH_HASH)
    })
  })

  it('should redirect to tracking page if only details not affecting the connection have changed', async () => {
    const tray = buildTray({
      trayId: 'trayId'
    })
    const state = {
      [TRAYS_ROOT]: {trayId: tray}
    }
    const {history} = render(<ChangeDetailsPage feed={tray}/>, {state})

    userEvent.click(screen.getByRole('button', {name: 'Save'}))

    await waitFor(() => {
      expect(history.location.pathname).toEqual(ROUTE_SETTINGS_TRACKING)
    })
  })
})
