import React from 'react'
import {AddTray} from './AddTray'
import userEvent from '@testing-library/user-event'
import {screen, waitFor} from '@testing-library/react'
import * as SecurityGateway from '../gateways/SecurityGateway'
import {getTrays, TRAYS_ROOT} from './TraysReducer'
import {buildTray, render} from '../testHelpers'
import {fakeRequest} from '../gateways/Gateway'
import {routeFeedProjects} from '../Routes'
import * as Tray from '../domain/Tray'
import {AuthTypes} from '../domain/Tray'

beforeEach(() => {
  jest.spyOn(SecurityGateway, 'encrypt').mockResolvedValue(fakeRequest(''))
})

it('should display an error if no URL is entered', () => {
  render(<AddTray/>)
  userEvent.click(screen.getByText('Add feed'))
  expect(screen.getByText('Enter a URL to the CCTray XML feed')).toBeInTheDocument()
})

it('should display an error if the URL entered is not http(s)', () => {
  render(<AddTray/>)
  userEvent.type(screen.getByLabelText('URL'), 'ftp://some-new-url')
  userEvent.click(screen.getByText('Add feed'))
  expect(screen.getByText('Only http(s) URLs are supported')).toBeInTheDocument()
})

it('should display an error if a feed with the same URL has already been added', () => {
  const state = {
    [TRAYS_ROOT]: {
      trayId: buildTray({
        trayId: 'trayId',
        url: 'https://some-url'
      })
    }
  }

  render(<AddTray/>, {state})
  userEvent.type(screen.getByLabelText('URL'), 'http://some-url')
  userEvent.click(screen.getByText('Add feed'))

  expect(screen.getByText('CCTray XML feed has already been added')).toBeInTheDocument()
})

it('should allow adding feeds without auth', async () => {
  jest.spyOn(Tray, 'createId').mockReturnValue('some-feed-id')

  const state = {
    [TRAYS_ROOT]: {}
  }

  const {store, history} = render(<AddTray/>, {state})
  userEvent.type(screen.getByLabelText('URL'), 'http://some-new-url')
  userEvent.click(screen.getByText('Add feed'))

  expect(getTrays(store.getState())).toEqual(expect.arrayContaining([
    expect.objectContaining({
      url: 'http://some-new-url'
    })
  ]))
  await waitFor(() => {
    expect(history.location).toEqual(expect.objectContaining({
      pathname: routeFeedProjects('some-feed-id'),
      hash: '#refresh'
    }))
  })
})

it('should allow adding feeds with basic auth', async () => {
  jest.spyOn(Tray, 'createId').mockReturnValue('some-feed-id')
  jest.spyOn(SecurityGateway, 'encrypt').mockResolvedValue(fakeRequest('encrypted-password'))

  const state = {
    [TRAYS_ROOT]: {}
  }

  const {store, history} = render(<AddTray/>, {state})
  userEvent.type(screen.getByLabelText('URL'), 'http://some-new-url')
  userEvent.selectOptions(screen.getByLabelText('Authentication'), AuthTypes.basic)
  userEvent.type(screen.getByLabelText('Username'), 'some-username')
  userEvent.type(screen.getByLabelText('Password'), 'some-password')
  userEvent.click(screen.getByText('Add feed'))

  await waitFor(() => {
    expect(SecurityGateway.encrypt).toHaveBeenCalledWith('some-password')
  })
  expect(getTrays(store.getState())).toEqual(expect.arrayContaining([
    expect.objectContaining({
      encryptedPassword: 'encrypted-password'
    })
  ]))
  expect(history.location).toEqual(expect.objectContaining({
    pathname: routeFeedProjects('some-feed-id'),
    hash: '#refresh'
  }))
})

it('should allow adding trays with an access token', async () => {
  jest.spyOn(Tray, 'createId').mockReturnValue('some-feed-id')
  jest.spyOn(SecurityGateway, 'encrypt').mockResolvedValue(fakeRequest('encrypted-token'))

  const state = {
    [TRAYS_ROOT]: {}
  }

  const {store, history} = render(<AddTray/>, {state})
  userEvent.type(screen.getByLabelText('URL'), 'http://some-new-url')
  userEvent.selectOptions(screen.getByLabelText('Authentication'), AuthTypes.token)
  userEvent.type(screen.getByLabelText('Token'), 'some-token')
  userEvent.click(screen.getByText('Add feed'))

  await waitFor(() => {
    expect(SecurityGateway.encrypt).toHaveBeenCalledWith('some-token')
  })
  expect(getTrays(store.getState())).toEqual(expect.arrayContaining([
    expect.objectContaining({
      encryptedAccessToken: 'encrypted-token'
    })
  ]))
  expect(history.location).toEqual(expect.objectContaining({
    pathname: routeFeedProjects('some-feed-id'),
    hash: '#refresh'
  }))
})
