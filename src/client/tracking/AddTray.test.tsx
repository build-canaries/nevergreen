import React from 'react'
import noop from 'lodash/noop'
import {AddTray} from './AddTray'
import userEvent from '@testing-library/user-event'
import {screen, waitFor} from '@testing-library/react'
import * as SecurityGateway from '../gateways/SecurityGateway'
import {getTrays, TRAYS_ROOT} from './TraysReducer'
import {buildTray, render} from '../testHelpers'
import {fakeRequest} from '../gateways/Gateway'

const DEFAULT_PROPS = {
  setRefreshTray: noop
}

beforeEach(() => {
  jest.spyOn(SecurityGateway, 'encrypt').mockResolvedValue(fakeRequest(''))
})

it('should display an error if no URL is entered', () => {
  render(<AddTray {...DEFAULT_PROPS}/>)
  userEvent.click(screen.getByText('Add feed'))
  expect(screen.queryByText('Enter a URL to the CCTray XML feed')).toBeInTheDocument()
})

it('should display an error if the URL entered is not http(s)', () => {
  render(<AddTray {...DEFAULT_PROPS}/>)
  userEvent.type(screen.getByLabelText('URL'), 'ftp://some-new-url')
  userEvent.click(screen.getByText('Add feed'))
  expect(screen.queryByText('Only http(s) URLs are supported')).toBeInTheDocument()
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

  render(
    <AddTray {...DEFAULT_PROPS}/>,
    state
  )
  userEvent.type(screen.getByLabelText('URL'), 'http://some-url')
  userEvent.click(screen.getByText('Add feed'))

  expect(screen.queryByText('CCTray XML feed has already been added')).toBeInTheDocument()
})

it('should allow adding trays without auth', () => {
  const state = {
    [TRAYS_ROOT]: {}
  }

  const {store} = render(<AddTray {...DEFAULT_PROPS}/>, state)
  userEvent.type(screen.getByLabelText('URL'), 'http://some-new-url')
  userEvent.click(screen.getByText('Add feed'))

  expect(getTrays(store.getState())).toEqual(expect.arrayContaining([
    expect.objectContaining({
      url: 'http://some-new-url'
    })
  ]))
})

it('should allow adding trays with basic auth', async () => {
  jest.spyOn(SecurityGateway, 'encrypt').mockResolvedValue(fakeRequest('encrypted-password'))
  const state = {
    [TRAYS_ROOT]: {}
  }

  const {store} = render(<AddTray {...DEFAULT_PROPS}/>, state)
  userEvent.type(screen.getByLabelText('URL'), 'http://some-new-url')
  userEvent.click(screen.getByLabelText('Basic auth'))
  userEvent.type(screen.getByLabelText('Username'), 'some-username')
  userEvent.type(screen.getByLabelText('Password'), 'some-password')
  userEvent.click(screen.getByText('Add feed'))

  await waitFor(() => {
    expect(SecurityGateway.encrypt).toHaveBeenCalledWith('some-password')
    expect(getTrays(store.getState())).toEqual(expect.arrayContaining([
      expect.objectContaining({
        encryptedPassword: 'encrypted-password'
      })
    ]))
  })
})

it('should allow adding trays with an access token', async () => {
  jest.spyOn(SecurityGateway, 'encrypt').mockResolvedValue(fakeRequest('encrypted-token'))
  const state = {
    [TRAYS_ROOT]: {}
  }

  const {store} = render(<AddTray {...DEFAULT_PROPS}/>, state)
  userEvent.type(screen.getByLabelText('URL'), 'http://some-new-url')
  userEvent.click(screen.getByLabelText('Access token'))
  userEvent.type(screen.getByLabelText('Token'), 'some-token')
  userEvent.click(screen.getByText('Add feed'))

  await waitFor(() => {
    expect(SecurityGateway.encrypt).toHaveBeenCalledWith('some-token')
    expect(getTrays(store.getState())).toEqual(expect.arrayContaining([
      expect.objectContaining({
        encryptedAccessToken: 'encrypted-token'
      })
    ]))
  })
})

it('should reset the form after adding a tray', async () => {
  render(<AddTray {...DEFAULT_PROPS}/>)

  userEvent.type(screen.getByLabelText('URL'), 'http://some-new-url')
  userEvent.click(screen.getByLabelText('Access token'))
  userEvent.type(screen.getByLabelText('Token'), 'some-token')
  userEvent.click(screen.getByRole('button', {name: 'Add feed'}))

  await waitFor(() => {
    expect(screen.getByLabelText('URL')).toHaveValue('')
    expect(screen.queryByTestId('auth-access-token')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Username')).not.toBeInTheDocument()
    expect(screen.queryByTestId('auth-password')).not.toBeInTheDocument()
    expect(screen.queryByText('Enter a URL to the CCTray XML feed')).not.toBeInTheDocument()
  })
})
