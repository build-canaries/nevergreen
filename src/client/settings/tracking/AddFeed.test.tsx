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
import {UserEvent} from '@testing-library/user-event/dist/types/setup'

beforeEach(() => {
  jest.spyOn(SecurityGateway, 'encrypt').mockResolvedValue(fakeRequest(''))
})

describe('validation errors', () => {
  it('should display an error if no URL is entered', async () => {
    const {user} = render(<AddFeed/>)
    await user.click(screen.getByText('Add feed'))
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
})

it.each([
  AuthTypes.token,
  AuthTypes.basic,
  AuthTypes.none
])('should allow adding feeds with auth %s', async (authType) => {
  jest.spyOn(Feed, 'createId').mockReturnValue('some-feed-id')
  jest.spyOn(SecurityGateway, 'encrypt').mockResolvedValue(fakeRequest('encrypted'))
  jest.spyOn(ProjectsGateway, 'testFeedConnection').mockResolvedValue(fakeRequest(undefined))

  const state = {
    [FEEDS_ROOT]: {}
  }

  const {store, user} = render(<AddFeed/>, {state})

  await user.type(screen.getByLabelText('URL'), 'http://some-new-url')
  await enterAuth[authType](user)

  await user.click(screen.getByRole('button', {name: 'Check connection'}))

  await waitFor(() => {
    expect(screen.getByText('Connected successfully')).toBeInTheDocument()
  })
  expect(ProjectsGateway.testFeedConnection).toHaveBeenCalledWith({
    url: 'http://some-new-url',
    ...testConnectionExpected[authType]
  })

  await user.click(screen.getByText('Add feed'))

  await waitFor(() => {
    expect(getFeeds(store.getState())).toEqual(expect.arrayContaining([
      expect.objectContaining({
        ...feedExpected[authType]
      })
    ]))
  })
  expect(window.location).toEqual(expect.objectContaining({
    pathname: '/settings/tracking/some-feed-id/projects'
  }))
})

const enterAuth = {
  [AuthTypes.token]: async (user: UserEvent) => {
    await user.selectOptions(screen.getByLabelText('Authentication'), AuthTypes.token)
    await user.type(screen.getByLabelText('Token'), 'new-token')
  },
  [AuthTypes.basic]: async (user: UserEvent) => {
    await user.selectOptions(screen.getByLabelText('Authentication'), AuthTypes.basic)
    await user.clear(screen.getByLabelText('Username'))
    await user.type(screen.getByLabelText('Username'), 'new-username')
    await user.type(screen.getByLabelText('Password'), 'new-password')
  },
  [AuthTypes.none]: async (user: UserEvent) => {
    await user.selectOptions(screen.getByLabelText('Authentication'), AuthTypes.none)
  }
}

const testConnectionExpected = {
  [AuthTypes.token]: {
    authType: AuthTypes.token,
    accessToken: 'new-token'
  },
  [AuthTypes.basic]: {
    authType: AuthTypes.basic,
    username: 'new-username',
    password: 'new-password'
  },
  [AuthTypes.none]: {
    authType: AuthTypes.none
  }
}

const feedExpected = {
  [AuthTypes.token]: {
    authType: AuthTypes.token,
    encryptedAccessToken: 'encrypted'
  },
  [AuthTypes.basic]: {
    authType: AuthTypes.basic,
    username: 'new-username',
    encryptedPassword: 'encrypted'
  },
  [AuthTypes.none]: {
    authType: AuthTypes.none
  }
}
