import React from 'react'
import {screen, waitFor} from '@testing-library/react'
import {buildTray, render} from '../../testHelpers'
import {getTray, TRAYS_ROOT} from '../TraysReducer'
import userEvent from '@testing-library/user-event'
import {REFRESH_HASH, routeFeedDetails, routeFeedProjects} from '../../Routes'
import {AuthTypes} from '../../domain/Tray'
import * as SecurityGateway from '../../gateways/SecurityGateway'
import {fakeRequest} from '../../gateways/Gateway'
import {UpdateConnectionPage} from './UpdateConnectionPage'

beforeEach(() => {
  jest.spyOn(SecurityGateway, 'encrypt').mockResolvedValue(fakeRequest(''))
})

it('should be able to update the URL', async () => {
  const tray = buildTray({
    url: 'http://old',
    trayId: 'trayId'
  })
  const state = {
    [TRAYS_ROOT]: {trayId: tray}
  }
  const {store} = render(<UpdateConnectionPage feed={tray}/>, {state})

  userEvent.clear(screen.getByLabelText('URL'))
  userEvent.type(screen.getByLabelText('URL'), 'http://new')
  userEvent.click(screen.getByRole('button', {name: 'Save'}))

  await waitFor(() => {
    expect(getTray('trayId')(store.getState())).toEqual(expect.objectContaining({
      url: 'http://new'
    }))
  })
})

it('should be able to update authentication', async () => {
  jest.spyOn(SecurityGateway, 'encrypt').mockResolvedValue(fakeRequest('encrypted-token'))
  const feed = buildTray({
    trayId: 'trayId',
    authType: AuthTypes.none
  })
  const state = {
    [TRAYS_ROOT]: {trayId: feed}
  }
  const {store} = render(<UpdateConnectionPage feed={feed}/>, {state})

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

describe('validation errors', () => {
  it('should display an error if no URL is entered', () => {
    const tray = buildTray({
      trayId: 'trayId',
      name: 'some-name'
    })
    const state = {
      [TRAYS_ROOT]: {trayId: tray}
    }
    render(<UpdateConnectionPage feed={tray}/>, {state})

    userEvent.clear(screen.getByLabelText('URL'))
    userEvent.click(screen.getByRole('button', {name: 'Save'}))

    expect(screen.getByText('Enter a URL')).toBeInTheDocument()
  })

  it('should display an error if non http(s) URL is entered', () => {
    const tray = buildTray({
      trayId: 'trayId',
      name: 'some-name'
    })
    const state = {
      [TRAYS_ROOT]: {trayId: tray}
    }
    render(<UpdateConnectionPage feed={tray}/>, {state})

    userEvent.clear(screen.getByLabelText('URL'))
    userEvent.type(screen.getByLabelText('URL'), 'file://some-file')
    userEvent.click(screen.getByRole('button', {name: 'Save'}))

    expect(screen.getByText('Only http(s) URLs are supported')).toBeInTheDocument()
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
    render(<UpdateConnectionPage feed={tray}/>, {state})

    userEvent.clear(screen.getByLabelText('URL'))
    userEvent.type(screen.getByLabelText('URL'), 'http://other')
    userEvent.click(screen.getByRole('button', {name: 'Save'}))

    expect(screen.getByText('An existing CCTray XML feed already has this URL')).toBeInTheDocument()
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
    const {history} = render(<UpdateConnectionPage feed={tray}/>, {state})

    userEvent.clear(screen.getByLabelText('URL'))
    userEvent.type(screen.getByLabelText('URL'), 'http://new')
    userEvent.click(screen.getByRole('button', {name: 'Save'}))

    await waitFor(() => {
      expect(history.location.pathname).toEqual(routeFeedProjects('trayId'))
    })
    expect(history.location.hash).toEqual(REFRESH_HASH)
  })

  it('should redirect to projects if the auth has changed', async () => {
    const feed = buildTray({
      trayId: 'trayId',
      authType: AuthTypes.none
    })
    const state = {
      [TRAYS_ROOT]: {trayId: feed}
    }
    const {history} = render(<UpdateConnectionPage feed={feed}/>, {state})

    userEvent.selectOptions(screen.getByLabelText('Authentication'), AuthTypes.token)
    userEvent.type(screen.getByLabelText('Token'), 'some-token')
    userEvent.click(screen.getByRole('button', {name: 'Save'}))

    await waitFor(() => {
      expect(history.location.pathname).toEqual(routeFeedProjects('trayId'))
    })
    expect(history.location.hash).toEqual(REFRESH_HASH)
  })

  it('should redirect to details page if nothing has changed', async () => {
    const tray = buildTray({
      trayId: 'trayId'
    })
    const state = {
      [TRAYS_ROOT]: {trayId: tray}
    }
    const {history} = render(<UpdateConnectionPage feed={tray}/>, {state})

    userEvent.click(screen.getByRole('button', {name: 'Save'}))

    await waitFor(() => {
      expect(history.location.pathname).toEqual(routeFeedDetails('trayId'))
    })
  })
})
