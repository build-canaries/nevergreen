import React from 'react'
import {screen, waitFor} from '@testing-library/react'
import {fakeRequest, render, waitForLocationToChange} from '../../../testUtils/testHelpers'
import {buildFeed} from '../../../testUtils/builders'
import {FEEDS_ROOT, getFeed} from '../FeedsReducer'
import {AuthTypes} from '../../../domain/Feed'
import * as SecurityGateway from '../../../gateways/SecurityGateway'
import * as ProjectsGateway from '../../../gateways/ProjectsGateway'
import {UpdateConnectionPage} from './UpdateConnectionPage'
import {KeepExistingAuth, UpdateExistingAuthTypes} from '../ConnectionForm'
import {UserEvent} from '@testing-library/user-event/setup/setup'

beforeEach(() => {
  jest.spyOn(SecurityGateway, 'encrypt').mockResolvedValue(fakeRequest(''))
})

it.each([
  AuthTypes.token,
  AuthTypes.basic,
  AuthTypes.none,
  KeepExistingAuth.keep
])('should be able to update connection details auth to %s', async (authType: UpdateExistingAuthTypes) => {
  jest.spyOn(SecurityGateway, 'encrypt').mockResolvedValue(fakeRequest('encrypted'))
  jest.spyOn(ProjectsGateway, 'testFeedConnection').mockResolvedValue(fakeRequest())

  const feed = buildFeed({
    trayId: 'trayId',
    authType: AuthTypes.basic,
    url: 'http://old',
    username: 'old-username',
    encryptedPassword: 'old-password'
  })
  const state = {
    [FEEDS_ROOT]: {trayId: feed}
  }

  const {store, user} = render(<UpdateConnectionPage/>, {state, outletContext: feed})

  await user.clear(screen.getByLabelText('URL'))
  await user.type(screen.getByLabelText('URL'), 'http://new')

  await enterAuth[authType](user)

  await user.click(screen.getByRole('button', {name: 'Check connection'}))

  await waitFor(() => {
    expect(screen.getByText('Connected successfully')).toBeInTheDocument()
  })
  expect(ProjectsGateway.testFeedConnection).toHaveBeenCalledWith({
    url: 'http://new',
    ...testConnectionExpected[authType]
  })

  await user.click(screen.getByRole('button', {name: 'Save'}))

  await waitForLocationToChange()
  expect(getFeed('trayId')(store.getState())).toEqual(expect.objectContaining({
    url: 'http://new',
    ...feedExpected[authType]
  }))
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
  },
  [KeepExistingAuth.keep]: async (user: UserEvent) => {
    await user.selectOptions(screen.getByLabelText('Authentication'), KeepExistingAuth.keep)
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
  },
  [KeepExistingAuth.keep]: {
    authType: AuthTypes.basic,
    username: 'old-username',
    encryptedPassword: 'old-password'
  },
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
  },
  [KeepExistingAuth.keep]: {
    authType: AuthTypes.basic,
    username: 'old-username',
    encryptedPassword: 'old-password'
  }
}
