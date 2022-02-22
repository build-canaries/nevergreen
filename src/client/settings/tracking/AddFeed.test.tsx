import React from 'react'
import {AddFeed} from './AddFeed'
import userEvent from '@testing-library/user-event'
import {screen, waitFor} from '@testing-library/react'
import * as SecurityGateway from '../../gateways/SecurityGateway'
import * as ProjectsGateway from '../../gateways/ProjectsGateway'
import {FEEDS_ROOT, getFeeds} from './FeedsReducer'
import {buildFeed, render} from '../../testHelpers'
import {fakeRequest} from '../../gateways/Gateway'
import * as Feed from '../../domain/Feed'
import {AuthTypes} from '../../domain/Feed'

beforeEach(() => {
  jest.spyOn(SecurityGateway, 'encrypt').mockResolvedValue(fakeRequest(''))
})

it('should display an error if no URL is entered', () => {
  render(<AddFeed/>)
  userEvent.click(screen.getByText('Add feed'))
  expect(screen.getByText('Enter a URL to the CCTray XML feed')).toBeInTheDocument()
})

it('should display an error if the URL entered is not http(s)', () => {
  render(<AddFeed/>)
  userEvent.type(screen.getByLabelText('URL'), 'ftp://some-new-url')
  userEvent.click(screen.getByText('Add feed'))
  expect(screen.getByText('Only http(s) URLs are supported')).toBeInTheDocument()
})

it('should display an error if a feed with the same URL has already been added', () => {
  const state = {
    [FEEDS_ROOT]: {
      trayId: buildFeed({
        trayId: 'trayId',
        url: 'https://some-url'
      })
    }
  }

  render(<AddFeed/>, {state})
  userEvent.type(screen.getByLabelText('URL'), 'http://some-url')
  userEvent.click(screen.getByText('Add feed'))

  expect(screen.getByText('An existing CCTray XML feed already has this URL')).toBeInTheDocument()
})

it('should allow adding feeds without auth', async () => {
  jest.spyOn(Feed, 'createId').mockReturnValue('some-feed-id')
  jest.spyOn(ProjectsGateway, 'testFeedConnection').mockResolvedValue(fakeRequest(undefined))

  const state = {
    [FEEDS_ROOT]: {}
  }

  const {store} = render(<AddFeed/>, {state})
  userEvent.type(screen.getByLabelText('URL'), 'http://some-new-url')

  userEvent.click(screen.getByRole('button', {name: 'Check connection'}))

  await waitFor(() => {
    expect(screen.getByText('Connected successfully')).toBeInTheDocument()
  })
  expect(ProjectsGateway.testFeedConnection).toHaveBeenCalledWith({
    authType: AuthTypes.none,
    url: 'http://some-new-url',
    accessToken: '',
    password: '',
    username: ''
  })

  userEvent.click(screen.getByText('Add feed'))

  await waitFor(() => {
    expect(window.location).toEqual(expect.objectContaining({
      pathname: '/settings/tracking/some-feed-id/projects',
      hash: '#refresh'
    }))
  })
  expect(getFeeds(store.getState())).toEqual(expect.arrayContaining([
    expect.objectContaining({
      url: 'http://some-new-url'
    })
  ]))
})

it('should allow adding feeds with basic auth', async () => {
  jest.spyOn(Feed, 'createId').mockReturnValue('some-feed-id')
  jest.spyOn(SecurityGateway, 'encrypt').mockResolvedValue(fakeRequest('encrypted-password'))
  jest.spyOn(ProjectsGateway, 'testFeedConnection').mockResolvedValue(fakeRequest(undefined))

  const state = {
    [FEEDS_ROOT]: {}
  }

  const {store} = render(<AddFeed/>, {state})
  userEvent.type(screen.getByLabelText('URL'), 'http://some-new-url')
  userEvent.selectOptions(screen.getByLabelText('Authentication'), AuthTypes.basic)
  userEvent.type(screen.getByLabelText('Username'), 'some-username')
  userEvent.type(screen.getByLabelText('Password'), 'some-password')

  userEvent.click(screen.getByRole('button', {name: 'Check connection'}))

  await waitFor(() => {
    expect(screen.getByText('Connected successfully')).toBeInTheDocument()
  })
  expect(ProjectsGateway.testFeedConnection).toHaveBeenCalledWith({
    authType: AuthTypes.basic,
    url: 'http://some-new-url',
    accessToken: '',
    password: 'some-password',
    username: 'some-username'
  })

  userEvent.click(screen.getByText('Add feed'))

  await waitFor(() => {
    expect(SecurityGateway.encrypt).toHaveBeenCalledWith('some-password')
  })
  expect(getFeeds(store.getState())).toEqual(expect.arrayContaining([
    expect.objectContaining({
      encryptedPassword: 'encrypted-password'
    })
  ]))
  expect(window.location).toEqual(expect.objectContaining({
    pathname: '/settings/tracking/some-feed-id/projects',
    hash: '#refresh'
  }))
})

it('should allow adding feeds with an access token', async () => {
  jest.spyOn(Feed, 'createId').mockReturnValue('some-feed-id')
  jest.spyOn(SecurityGateway, 'encrypt').mockResolvedValue(fakeRequest('encrypted-token'))
  jest.spyOn(ProjectsGateway, 'testFeedConnection').mockResolvedValue(fakeRequest(undefined))

  const state = {
    [FEEDS_ROOT]: {}
  }

  const {store} = render(<AddFeed/>, {state})
  userEvent.type(screen.getByLabelText('URL'), 'http://some-new-url')
  userEvent.selectOptions(screen.getByLabelText('Authentication'), AuthTypes.token)
  userEvent.type(screen.getByLabelText('Token'), 'some-token')

  userEvent.click(screen.getByRole('button', {name: 'Check connection'}))

  await waitFor(() => {
    expect(screen.getByText('Connected successfully')).toBeInTheDocument()
  })
  expect(ProjectsGateway.testFeedConnection).toHaveBeenCalledWith({
    authType: AuthTypes.token,
    url: 'http://some-new-url',
    accessToken: 'some-token',
    password: '',
    username: ''
  })

  userEvent.click(screen.getByText('Add feed'))

  await waitFor(() => {
    expect(SecurityGateway.encrypt).toHaveBeenCalledWith('some-token')
  })
  expect(getFeeds(store.getState())).toEqual(expect.arrayContaining([
    expect.objectContaining({
      encryptedAccessToken: 'encrypted-token'
    })
  ]))
  expect(window.location).toEqual(expect.objectContaining({
    pathname: '/settings/tracking/some-feed-id/projects',
    hash: '#refresh'
  }))
})
