import React from 'react'
import {screen, waitFor} from '@testing-library/react'
import {buildFeed, render} from '../../../testHelpers'
import {FEEDS_ROOT, getFeed} from '../FeedsReducer'
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

  const {store, user} = render(<UpdateConnectionPage/>, {state, outletContext: feed})

  await user.clear(screen.getByLabelText('URL'))
  await user.type(screen.getByLabelText('URL'), 'http://new')

  await user.click(screen.getByRole('button', {name: 'Check connection'}))

  await waitFor(() => {
    expect(screen.getByText('Connected successfully')).toBeInTheDocument()
  })
  expect(ProjectsGateway.testFeedConnection).toHaveBeenCalledWith({
    authType: AuthTypes.basic,
    url: 'http://new',
    encryptedPassword: 'some-encrypted-password',
    username: 'some-username'
  })

  await user.click(screen.getByRole('button', {name: 'Save'}))

  await waitFor(() => {
    expect(getFeed('trayId')(store.getState())).toEqual(expect.objectContaining({
      url: 'http://new'
    }))
  })
  expect(window.location.pathname).toEqual('/settings/tracking/trayId/details')
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

  const {store, user} = render(<UpdateConnectionPage/>, {state, outletContext: feed})

  await user.selectOptions(screen.getByLabelText('Authentication'), AuthTypes.token)
  await user.type(screen.getByLabelText('Token'), 'some-token')

  await user.click(screen.getByRole('button', {name: 'Check connection'}))

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

  await user.click(screen.getByRole('button', {name: 'Save'}))

  await waitFor(() => {
    expect(getFeed('trayId')(store.getState())).toEqual(expect.objectContaining({
      authType: AuthTypes.token,
      encryptedAccessToken: 'encrypted-token'
    }))
  })
  expect(window.location.pathname).toEqual('/settings/tracking/trayId/details')
})

describe('validation errors', () => {
  it('should display an error if no URL is entered', async () => {
    const feed = buildFeed({
      trayId: 'trayId',
      name: 'some-name'
    })
    const state = {
      [FEEDS_ROOT]: {trayId: feed}
    }

    const {user} = render(<UpdateConnectionPage/>, {state, outletContext: feed})

    await user.clear(screen.getByLabelText('URL'))
    await user.click(screen.getByRole('button', {name: 'Save'}))

    expect(screen.getByText('Enter a URL to the CCTray XML feed')).toBeInTheDocument()
  })

  it('should display an error if non http(s) URL is entered', async () => {
    const feed = buildFeed({
      trayId: 'trayId',
      name: 'some-name'
    })
    const state = {
      [FEEDS_ROOT]: {trayId: feed}
    }

    const {user} = render(<UpdateConnectionPage/>, {state, outletContext: feed})

    await user.clear(screen.getByLabelText('URL'))
    await user.type(screen.getByLabelText('URL'), 'file://some-file')
    await user.click(screen.getByRole('button', {name: 'Save'}))

    expect(screen.getByText('Only http(s) URLs are supported')).toBeInTheDocument()
  })

  it('should display an error if a URL already in use by another feed is entered', async () => {
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

    const {user} = render(<UpdateConnectionPage/>, {state, outletContext: feed})

    await user.clear(screen.getByLabelText('URL'))
    await user.type(screen.getByLabelText('URL'), 'http://other')
    await user.click(screen.getByRole('button', {name: 'Save'}))

    expect(screen.getByText('An existing CCTray XML feed already has this URL')).toBeInTheDocument()
  })
})
