import React from 'react'
import {noop} from 'lodash'
import {AddTray} from '../../../src/client/tracking/AddTray'
import userEvent from '@testing-library/user-event'
import {waitForDomChange} from '@testing-library/react'
import * as RefreshThunkActionCreators from '../../../src/client/tracking/RefreshThunkActionCreators'
import * as SecurityGateway from '../../../src/client/gateways/SecurityGateway'
import {getTrays, TRAYS_ROOT} from '../../../src/client/tracking/TraysReducer'
import {render} from '../testHelpers'
import {fakeRequest} from '../../../src/client/gateways/Gateway'

describe('<AddTray/>', () => {

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jest.spyOn(RefreshThunkActionCreators, 'refreshTray').mockReturnValue(noop as any)
    jest.spyOn(SecurityGateway, 'encrypt').mockResolvedValue(fakeRequest(''))
  })

  test('should display an error if no URL is entered', async () => {
    const {getByText} = render(<AddTray/>)
    userEvent.click(getByText('add'))
    expect(getByText('Please enter the URL to the CCTray XML feed')).toBeInTheDocument()
  })

  test('should allow adding trays without auth', async () => {
    const state = {
      [TRAYS_ROOT]: {}
    }

    const {getByText, getByLabelText, store} = render(<AddTray/>, state)
    await userEvent.type(getByLabelText('URL'), 'some-new-url')
    userEvent.click(getByText('add'))

    expect(getTrays(store.getState())).toEqual(expect.arrayContaining([
      expect.objectContaining({
        url: 'http://some-new-url'
      })
    ]))
  })

  test('should allow adding trays with basic auth', async () => {
    jest.spyOn(SecurityGateway, 'encrypt').mockResolvedValue(fakeRequest('encrypted-password'))
    const state = {
      [TRAYS_ROOT]: {}
    }

    const {getByTestId, getByText, getByLabelText, store} = render(<AddTray/>, state)
    await userEvent.type(getByLabelText('URL'), 'some-new-url')
    userEvent.click(getByLabelText('basic auth'))
    await userEvent.type(getByLabelText('username'), 'some-username')
    await userEvent.type(getByTestId('auth-password'), 'some-password')
    userEvent.click(getByText('add'))

    await waitForDomChange()

    expect(SecurityGateway.encrypt).toHaveBeenCalledWith('some-password')
    expect(getTrays(store.getState())).toEqual(expect.arrayContaining([
      expect.objectContaining({
        password: 'encrypted-password'
      })
    ]))
  })

  test('should allow adding trays with an access token', async () => {
    jest.spyOn(SecurityGateway, 'encrypt').mockResolvedValue(fakeRequest('encrypted-token'))
    const state = {
      [TRAYS_ROOT]: {}
    }

    const {getByTestId, getByText, getByLabelText, store} = render(<AddTray/>, state)
    await userEvent.type(getByLabelText('URL'), 'some-new-url')
    userEvent.click(getByLabelText('access token'))
    await userEvent.type(getByTestId('auth-access-token'), 'some-token')
    userEvent.click(getByText('add'))

    await waitForDomChange()

    expect(SecurityGateway.encrypt).toHaveBeenCalledWith('some-token')
    expect(getTrays(store.getState())).toEqual(expect.arrayContaining([
      expect.objectContaining({
        accessToken: 'encrypted-token'
      })
    ]))
  })

  test('should reset the form after adding a tray', async () => {
    const {getByTestId, queryByTestId, getByText, getByLabelText, queryByLabelText} = render(<AddTray/>)
    await userEvent.type(getByLabelText('URL'), 'some-new-url')
    userEvent.click(getByLabelText('access token'))
    await userEvent.type(getByTestId('auth-access-token'), 'some-token')
    userEvent.click(getByText('add'))

    await waitForDomChange()

    expect(getByLabelText('URL')).toHaveValue('')
    expect(queryByTestId('auth-access-token')).not.toBeInTheDocument()
    expect(queryByLabelText('username')).not.toBeInTheDocument()
    expect(queryByTestId('auth-password')).not.toBeInTheDocument()
  })
})
