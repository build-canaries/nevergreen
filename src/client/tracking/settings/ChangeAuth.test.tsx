import React from 'react'
import {ChangeAuth} from './ChangeAuth'
import * as SecurityGateway from '../../gateways/SecurityGateway'
import noop from 'lodash/noop'
import {AuthTypes} from '../../domain/Tray'
import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {setupReactModal} from '../../testHelpers'
import {fakeRequest} from '../../gateways/Gateway'

const DEFAULT_PROPS = {
  show: false,
  cancel: noop,
  save: noop,
  authType: AuthTypes.none,
  username: ''
}

beforeEach(setupReactModal)

beforeEach(() => {
  jest.spyOn(SecurityGateway, 'encrypt').mockResolvedValue(fakeRequest(''))
})

it('should be able to change the auth to none', () => {
  const save = jest.fn()
  const props = {...DEFAULT_PROPS, show: true, authType: AuthTypes.basic, save}

  render(<ChangeAuth {...props} />)
  userEvent.click(screen.getByLabelText('No auth'))
  userEvent.click(screen.getByText('Save'))

  expect(save).toBeCalledWith(AuthTypes.none, '', '', '')
})

it('should be able to change the auth to basic', async () => {
  jest.spyOn(SecurityGateway, 'encrypt').mockResolvedValue(fakeRequest('some-encrypted-password'))
  const save = jest.fn()
  const props = {...DEFAULT_PROPS, show: true, save}

  render(<ChangeAuth {...props} />)
  userEvent.click(screen.getByLabelText('Basic auth'))
  userEvent.type(screen.getByLabelText('Username'), 'some-username')
  userEvent.type(screen.getByLabelText('Password'), 'some-password')
  userEvent.click(screen.getByText('Save'))

  await waitFor(() => {
    expect(save).toBeCalledWith(AuthTypes.basic, 'some-username', 'some-encrypted-password', '')
  })
})

it('should be able to change the auth to access token', async () => {
  jest.spyOn(SecurityGateway, 'encrypt').mockResolvedValue(fakeRequest('some-encrypted-token'))
  const save = jest.fn()
  const props = {...DEFAULT_PROPS, show: true, save}

  render(<ChangeAuth {...props} />)
  userEvent.click(screen.getByLabelText('Access token'))
  userEvent.type(screen.getByLabelText('Token'), 'some-token')
  userEvent.click(screen.getByText('Save'))

  await waitFor(() => {
    expect(save).toBeCalledWith(AuthTypes.token, '', '', 'some-encrypted-token')
  })
})

it('should be able to discard making changes', () => {
  const save = jest.fn()
  const cancel = jest.fn()
  const props = {...DEFAULT_PROPS, show: true, save, cancel}

  render(<ChangeAuth {...props} />)
  userEvent.click(screen.getByText('Cancel'))

  expect(cancel).toBeCalled()
  expect(save).not.toBeCalled()
})
