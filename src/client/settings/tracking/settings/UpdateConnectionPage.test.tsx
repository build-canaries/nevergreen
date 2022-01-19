import React from 'react'
import {screen, waitFor} from '@testing-library/react'
import {buildFeed, render} from '../../../testHelpers'
import {getFeed, FEEDS_ROOT} from '../FeedsReducer'
import userEvent from '@testing-library/user-event'
import {routeFeedDetails} from '../../../Routes'
import {AuthTypes} from '../../../domain/Feed'
import * as SecurityGateway from '../../../gateways/SecurityGateway'
import * as ProjectsGateway from '../../../gateways/ProjectsGateway'
import {fakeRequest} from '../../../gateways/Gateway'
import {UpdateConnectionPage} from './UpdateConnectionPage'

beforeEach(() => {
  jest.spyOn(SecurityGateway, 'encrypt').mockResolvedValue(fakeRequest(''))
})

it('should be able to update the URL', async () => {
  jest.spyOn(ProjectsGateway, 'testFeedConnection').mockResolvedValue(fakeRequest(undefined))

  const feed = buildFeed({
    url: 'http://old',
    trayId: 'trayId',
    authType: AuthTypes.basic,
    username: 'some-username',
    encryptedPassword: 'some-encrypted-password'
  })
  const state = {
    [FEEDS_ROOT]: {trayId: feed}
  }
  const {store, history} = render(<UpdateConnectionPage feed={feed}/>, {state})

  userEvent.clear(screen.getByLabelText('URL'))
  userEvent.type(screen.getByLabelText('URL'), 'http://new')

  userEvent.click(screen.getByRole('button', {name: 'Check connection'}))

  await waitFor(() => {
    expect(screen.getByText('Connected successfully')).toBeInTheDocument()
  })
  expect(ProjectsGateway.testFeedConnection).toHaveBeenCalledWith({
    authType: AuthTypes.basic,
    url: 'http://new',
    encryptedPassword: 'some-encrypted-password',
    username: 'some-username'
  })

  userEvent.click(screen.getByRole('button', {name: 'Save'}))

  await waitFor(() => {
    expect(getFeed('trayId')(store.getState())).toEqual(expect.objectContaining({
      url: 'http://new'
    }))
  })
  expect(history.location.pathname).toEqual(routeFeedDetails('trayId'))
})

it('should be able to update authentication', async () => {
  jest.spyOn(SecurityGateway, 'encrypt').mockResolvedValue(fakeRequest('encrypted-token'))
  jest.spyOn(ProjectsGateway, 'testFeedConnection').mockResolvedValue(fakeRequest(undefined))

  const feed = buildFeed({
    trayId: 'trayId',
    authType: AuthTypes.none,
    url: 'http://some-url'
  })
  const state = {
    [FEEDS_ROOT]: {trayId: feed}
  }
  const {store, history} = render(<UpdateConnectionPage feed={feed}/>, {state})

  userEvent.selectOptions(screen.getByLabelText('Authentication'), AuthTypes.token)
  userEvent.type(screen.getByLabelText('Token'), 'some-token')

  userEvent.click(screen.getByRole('button', {name: 'Check connection'}))

  await waitFor(() => {
    expect(screen.getByText('Connected successfully')).toBeInTheDocument()
  })
  expect(ProjectsGateway.testFeedConnection).toHaveBeenCalledWith({
    authType: AuthTypes.token,
    url: 'http://some-url',
    accessToken: 'some-token',
    password: '',
    username: ''
  })

  userEvent.click(screen.getByRole('button', {name: 'Save'}))

  await waitFor(() => {
    expect(getFeed('trayId')(store.getState())).toEqual(expect.objectContaining({
      authType: AuthTypes.token,
      encryptedAccessToken: 'encrypted-token'
    }))
  })
  expect(history.location.pathname).toEqual(routeFeedDetails('trayId'))
})

describe('validation errors', () => {
  it('should display an error if no URL is entered', () => {
    const feed = buildFeed({
      trayId: 'trayId',
      name: 'some-name'
    })
    const state = {
      [FEEDS_ROOT]: {trayId: feed}
    }
    render(<UpdateConnectionPage feed={feed}/>, {state})

    userEvent.clear(screen.getByLabelText('URL'))
    userEvent.click(screen.getByRole('button', {name: 'Save'}))

    expect(screen.getByText('Enter a URL to the CCTray XML feed')).toBeInTheDocument()
  })

  it('should display an error if non http(s) URL is entered', () => {
    const tray = buildFeed({
      trayId: 'trayId',
      name: 'some-name'
    })
    const state = {
      [FEEDS_ROOT]: {trayId: tray}
    }
    render(<UpdateConnectionPage feed={tray}/>, {state})

    userEvent.clear(screen.getByLabelText('URL'))
    userEvent.type(screen.getByLabelText('URL'), 'file://some-file')
    userEvent.click(screen.getByRole('button', {name: 'Save'}))

    expect(screen.getByText('Only http(s) URLs are supported')).toBeInTheDocument()
  })

  it('should display an error if a URL already in use by another feed is entered', () => {
    const feed = buildFeed({
      trayId: 'trayId'
    })
    const other = buildFeed({
      trayId: 'otherId',
      url: 'http://other'
    })
    const state = {
      [FEEDS_ROOT]: {
        trayId: feed,
        otherId: other
      }
    }
    render(<UpdateConnectionPage feed={feed}/>, {state})

    userEvent.clear(screen.getByLabelText('URL'))
    userEvent.type(screen.getByLabelText('URL'), 'http://other')
    userEvent.click(screen.getByRole('button', {name: 'Save'}))

    expect(screen.getByText('An existing CCTray XML feed already has this URL')).toBeInTheDocument()
  })
})
