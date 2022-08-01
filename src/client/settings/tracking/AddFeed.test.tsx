import React from 'react'
import {AddFeed} from './AddFeed'
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

it('should display an error if no URL is entered', async () => {
  const {user} = render(<AddFeed/>)
  await user .click(screen.getByText('Add feed'))
  expect(screen.getByText('Enter a URL to the CCTray XML feed')).toBeInTheDocument()
})

it('should display an error if the URL entered is not http(s)', async () => {
  const {user} = render(<AddFeed/>)
  await user.type(screen.getByLabelText('URL'), 'ftp://some-new-url')
  await user.click(screen.getByText('Add feed'))
  expect(screen.getByText('Only http(s) URLs are supported')).toBeInTheDocument()
})

it('should display an error if a feed with the same URL has already been added', async () => {
  const state = {
    [FEEDS_ROOT]: {
      trayId: buildFeed({
        trayId: 'trayId',
        url: 'https://some-url'
      })
    }
  }

  const {user} = render(<AddFeed/>, {state})
  await user.type(screen.getByLabelText('URL'), 'http://some-url')
  await user.click(screen.getByText('Add feed'))

  expect(screen.getByText('An existing CCTray XML feed already has this URL')).toBeInTheDocument()
})

it('should allow adding feeds without auth', async () => {
  jest.spyOn(Feed, 'createId').mockReturnValue('some-feed-id')
  jest.spyOn(ProjectsGateway, 'testFeedConnection').mockResolvedValue(fakeRequest(undefined))

  const state = {
    [FEEDS_ROOT]: {}
  }

  const {store, user} = render(<AddFeed/>, {state})
  await user.type(screen.getByLabelText('URL'), 'http://some-new-url')

  await user.click(screen.getByRole('button', {name: 'Check connection'}))

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

  await user.click(screen.getByText('Add feed'))

  await waitFor(() => {
    expect(window.location).toEqual(expect.objectContaining({
      pathname: '/settings/tracking/some-feed-id/projects'
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

  const {store, user} = render(<AddFeed/>, {state})
  await user.type(screen.getByLabelText('URL'), 'http://some-new-url')
  await user.selectOptions(screen.getByLabelText('Authentication'), AuthTypes.basic)
  await user.type(screen.getByLabelText('Username'), 'some-username')
  await user.type(screen.getByLabelText('Password'), 'some-password')

  await user.click(screen.getByRole('button', {name: 'Check connection'}))

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

  await user.click(screen.getByText('Add feed'))

  await waitFor(() => {
    expect(SecurityGateway.encrypt).toHaveBeenCalledWith('some-password')
  })
  expect(getFeeds(store.getState())).toEqual(expect.arrayContaining([
    expect.objectContaining({
      encryptedPassword: 'encrypted-password'
    })
  ]))
  expect(window.location).toEqual(expect.objectContaining({
    pathname: '/settings/tracking/some-feed-id/projects'
  }))
})

it('should allow adding feeds with an access token', async () => {
  jest.spyOn(Feed, 'createId').mockReturnValue('some-feed-id')
  jest.spyOn(SecurityGateway, 'encrypt').mockResolvedValue(fakeRequest('encrypted-token'))
  jest.spyOn(ProjectsGateway, 'testFeedConnection').mockResolvedValue(fakeRequest(undefined))

  const state = {
    [FEEDS_ROOT]: {}
  }

  const {store, user} = render(<AddFeed/>, {state})
  await user.type(screen.getByLabelText('URL'), 'http://some-new-url')
  await user.selectOptions(screen.getByLabelText('Authentication'), AuthTypes.token)
  await user.type(screen.getByLabelText('Token'), 'some-token')

  await user.click(screen.getByRole('button', {name: 'Check connection'}))

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

  await user.click(screen.getByText('Add feed'))

  await waitFor(() => {
    expect(SecurityGateway.encrypt).toHaveBeenCalledWith('some-token')
  })
  expect(getFeeds(store.getState())).toEqual(expect.arrayContaining([
    expect.objectContaining({
      encryptedAccessToken: 'encrypted-token'
    })
  ]))
  expect(window.location).toEqual(expect.objectContaining({
    pathname: '/settings/tracking/some-feed-id/projects'
  }))
})
