import React from 'react'
import {noop} from 'lodash'
import {AddTray} from './AddTray'
import userEvent from '@testing-library/user-event'
import {waitFor} from '@testing-library/react'
import * as SecurityGateway from '../gateways/SecurityGateway'
import {getTrays, TRAYS_ROOT} from './TraysReducer'
import {buildTray, render} from '../testHelpers'
import {fakeRequest} from '../gateways/Gateway'

const DEFAULT_PROPS = {
  setHighlightTray: noop,
  setRefreshTray: noop
}

beforeEach(() => {
  jest.spyOn(SecurityGateway, 'encrypt').mockResolvedValue(fakeRequest(''))
})

it('should display an error if no URL is entered', () => {
  const {queryByText, getByText} = render(<AddTray {...DEFAULT_PROPS}/>)
  userEvent.click(getByText('Add feed'))
  expect(queryByText('Please enter the URL to the CCTray XML feed')).toBeInTheDocument()
})

it('should allow adding trays without auth', () => {
  const state = {
    [TRAYS_ROOT]: {}
  }

  const {getByText, getByLabelText, store} = render(<AddTray {...DEFAULT_PROPS}/>, state)
  userEvent.type(getByLabelText('URL'), 'some-new-url')
  userEvent.click(getByText('Add feed'))

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

  const {getByText, getByLabelText, store} = render(<AddTray {...DEFAULT_PROPS}/>, state)
  userEvent.type(getByLabelText('URL'), 'some-new-url')
  userEvent.click(getByLabelText('Basic auth'))
  userEvent.type(getByLabelText('Username'), 'some-username')
  userEvent.type(getByLabelText('Password'), 'some-password')
  userEvent.click(getByText('Add feed'))

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

  const {getByText, getByLabelText, store} = render(<AddTray {...DEFAULT_PROPS}/>, state)
  userEvent.type(getByLabelText('URL'), 'some-new-url')
  userEvent.click(getByLabelText('Access token'))
  userEvent.type(getByLabelText('Token'), 'some-token')
  userEvent.click(getByText('Add feed'))

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
  const {queryByTestId, getByText, getByLabelText, queryByLabelText, queryByText} = render(
    <AddTray {...DEFAULT_PROPS}/>
  )
  userEvent.type(getByLabelText('URL'), 'some-new-url')
  userEvent.click(getByLabelText('Access token'))
  userEvent.type(getByLabelText('Token'), 'some-token')
  userEvent.click(getByText('Add feed'))

  await waitFor(() => {
    expect(getByLabelText('URL')).toHaveValue('')
    expect(queryByTestId('auth-access-token')).not.toBeInTheDocument()
    expect(queryByLabelText('Username')).not.toBeInTheDocument()
    expect(queryByTestId('auth-password')).not.toBeInTheDocument()
    expect(queryByText('Please enter the URL to the CCTray XML feed')).not.toBeInTheDocument()
  })
})

it('should not add an existing tray again', () => {
  const setHighlightTray = jest.fn()
  const state = {
    [TRAYS_ROOT]: {
      trayId: buildTray({
        trayId: 'trayId',
        url: 'https://some-url'
      })
    }
  }

  const {getByText, getByLabelText} = render(
    <AddTray {...DEFAULT_PROPS} setHighlightTray={setHighlightTray}/>,
    state
  )
  userEvent.type(getByLabelText('URL'), 'http://some-url')
  userEvent.click(getByText('Add feed'))

  expect(setHighlightTray).toHaveBeenCalledWith('trayId')
})
