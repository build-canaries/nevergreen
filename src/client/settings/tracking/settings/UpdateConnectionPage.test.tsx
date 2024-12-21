import type { UserEvent } from '@testing-library/user-event'
import { screen, waitFor } from '@testing-library/react'
import { render, waitForLocationToChange } from '../../../testUtils/testHelpers'
import { buildFeed } from '../../../testUtils/builders'
import { AuthTypes, feedsRoot, getFeed } from '../FeedsReducer'
import * as SecurityGateway from '../../../gateways/SecurityGateway'
import * as ProjectsGateway from '../../../gateways/ProjectsGateway'
import { UpdateConnectionPage } from './UpdateConnectionPage'
import { KeepExistingAuth, UpdateExistingAuthTypes } from '../ConnectionForm'

beforeEach(() => {
  jest.spyOn(SecurityGateway, 'encrypt').mockResolvedValue('')
})

it.each([
  AuthTypes.token,
  AuthTypes.basic,
  AuthTypes.none,
  AuthTypes.queryParam,
  KeepExistingAuth.keep,
])(
  'should be able to update connection details auth to %s',
  async (authType: UpdateExistingAuthTypes) => {
    jest.spyOn(SecurityGateway, 'encrypt').mockResolvedValueOnce('encrypted')
    jest.spyOn(ProjectsGateway, 'testFeedConnection').mockResolvedValueOnce()

    const feed = buildFeed({
      trayId: 'trayId',
      authType: AuthTypes.basic,
      url: 'http://old',
      username: 'old-username',
      encryptedAuth: 'old-password',
    })
    const state = {
      [feedsRoot]: { trayId: feed },
    }

    const { store, user } = render(<UpdateConnectionPage />, {
      state,
      outletContext: feed,
    })

    await user.clear(screen.getByLabelText('URL'))
    await user.type(screen.getByLabelText('URL'), 'http://new')

    await enterAuth[authType](user)

    await user.click(screen.getByRole('button', { name: 'Check connection' }))

    await waitFor(() => {
      expect(screen.getByText('Connected successfully')).toBeInTheDocument()
    })
    expect(ProjectsGateway.testFeedConnection).toHaveBeenCalledWith(
      {
        url: 'http://new',
        ...testConnectionExpected[authType],
      },
      expect.any(AbortSignal),
    )

    await user.click(screen.getByRole('button', { name: 'Save changes' }))

    await waitForLocationToChange()
    expect(getFeed('trayId')(store.getState())).toEqual(
      expect.objectContaining({
        url: 'http://new',
        ...feedExpected[authType],
      }),
    )
    expect(window.location.pathname).toEqual('/settings/tracking')
  },
)

describe('validation errors', () => {
  it('should display an error if no URL is entered', async () => {
    const feed = buildFeed({
      trayId: 'trayId',
      name: 'some-name',
    })
    const state = {
      [feedsRoot]: { trayId: feed },
    }

    const { user } = render(<UpdateConnectionPage />, {
      state,
      outletContext: feed,
    })

    await user.clear(screen.getByLabelText('URL'))
    await user.click(screen.getByRole('button', { name: 'Save changes' }))

    expect(
      screen.getByText('Enter a URL to the CCTray XML feed'),
    ).toBeInTheDocument()
  })

  it('should display an error if non http(s) URL is entered', async () => {
    const feed = buildFeed({
      trayId: 'trayId',
      name: 'some-name',
    })
    const state = {
      [feedsRoot]: { trayId: feed },
    }

    const { user } = render(<UpdateConnectionPage />, {
      state,
      outletContext: feed,
    })

    await user.clear(screen.getByLabelText('URL'))
    await user.type(screen.getByLabelText('URL'), 'file://some-file')
    await user.click(screen.getByRole('button', { name: 'Save changes' }))

    expect(
      screen.getByText('Only http(s) URLs are supported'),
    ).toBeInTheDocument()
  })

  it('should display an error if a URL already in use by another feed is entered', async () => {
    const feed = buildFeed({
      trayId: 'trayId',
    })
    const other = buildFeed({
      trayId: 'otherId',
      url: 'http://other',
    })
    const state = {
      [feedsRoot]: {
        trayId: feed,
        otherId: other,
      },
    }

    const { user } = render(<UpdateConnectionPage />, {
      state,
      outletContext: feed,
    })

    await user.clear(screen.getByLabelText('URL'))
    await user.type(screen.getByLabelText('URL'), 'http://other')
    await user.click(screen.getByRole('button', { name: 'Save changes' }))

    expect(
      screen.getByText('An existing CCTray XML feed already has this URL'),
    ).toBeInTheDocument()
  })
})

const enterAuth = {
  [AuthTypes.token]: async (user: UserEvent) => {
    await user.selectOptions(
      screen.getByLabelText('Authentication'),
      AuthTypes.token,
    )
    await user.type(screen.getByLabelText('Token'), 'new-token')
  },
  [AuthTypes.basic]: async (user: UserEvent) => {
    await user.selectOptions(
      screen.getByLabelText('Authentication'),
      AuthTypes.basic,
    )
    await user.clear(screen.getByLabelText('Username'))
    await user.type(screen.getByLabelText('Username'), 'new-username')
    await user.type(screen.getByLabelText('Password'), 'new-password')
  },
  [AuthTypes.none]: async (user: UserEvent) => {
    await user.selectOptions(
      screen.getByLabelText('Authentication'),
      AuthTypes.none,
    )
  },
  [AuthTypes.queryParam]: async (user: UserEvent) => {
    await user.selectOptions(
      screen.getByLabelText('Authentication'),
      AuthTypes.queryParam,
    )
    await user.clear(screen.getByLabelText('Query key'))
    await user.type(screen.getByLabelText('Query key'), 'query-key')
    await user.type(screen.getByLabelText('Query value'), 'new-query')
  },
  [KeepExistingAuth.keep]: async (user: UserEvent) => {
    await user.selectOptions(
      screen.getByLabelText('Authentication'),
      KeepExistingAuth.keep,
    )
  },
}

const testConnectionExpected = {
  [AuthTypes.token]: {
    authType: AuthTypes.token,
    accessToken: 'new-token',
  },
  [AuthTypes.basic]: {
    authType: AuthTypes.basic,
    username: 'new-username',
    password: 'new-password',
  },
  [AuthTypes.none]: {
    authType: AuthTypes.none,
  },
  [AuthTypes.queryParam]: {
    authType: AuthTypes.queryParam,
    username: 'query-key',
    password: 'new-query',
  },
  [KeepExistingAuth.keep]: {
    authType: AuthTypes.basic,
    username: 'old-username',
    encryptedAuth: 'old-password',
  },
}

const feedExpected = {
  [AuthTypes.token]: {
    authType: AuthTypes.token,
    encryptedAuth: 'encrypted',
  },
  [AuthTypes.basic]: {
    authType: AuthTypes.basic,
    username: 'new-username',
    encryptedAuth: 'encrypted',
  },
  [AuthTypes.none]: {
    authType: AuthTypes.none,
  },
  [AuthTypes.queryParam]: {
    authType: AuthTypes.queryParam,
    username: 'query-key',
    encryptedAuth: 'encrypted',
  },
  [KeepExistingAuth.keep]: {
    authType: AuthTypes.basic,
    username: 'old-username',
    encryptedAuth: 'old-password',
  },
}
