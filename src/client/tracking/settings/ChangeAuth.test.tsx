import React from 'react'
import {ChangeAuth} from './ChangeAuth'
import * as SecurityGateway from '../../gateways/SecurityGateway'
import noop from 'lodash/noop'
import {AuthTypes} from '../../domain/Tray'
import {render, waitFor} from '@testing-library/react'
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

  const {getByText, getByLabelText} = render(<ChangeAuth {...props} />)
  userEvent.click(getByLabelText('No auth'))
  userEvent.click(getByText('Save'))

  expect(save).toBeCalledWith(AuthTypes.none, '', '', '')
})

it('should be able to change the auth to basic', async () => {
  jest.spyOn(SecurityGateway, 'encrypt').mockResolvedValue(fakeRequest('some-encrypted-password'))
  const save = jest.fn()
  const props = {...DEFAULT_PROPS, show: true, save}

  const {getByText, getByLabelText} = render(<ChangeAuth {...props} />)
  userEvent.click(getByLabelText('Basic auth'))
  userEvent.type(getByLabelText('Username'), 'some-username')
  userEvent.type(getByLabelText('Password'), 'some-password')
  userEvent.click(getByText('Save'))

  await waitFor(() => {
    expect(save).toBeCalledWith(AuthTypes.basic, 'some-username', 'some-encrypted-password', '')
  })
})

it('should be able to change the auth to access token', async () => {
  jest.spyOn(SecurityGateway, 'encrypt').mockResolvedValue(fakeRequest('some-encrypted-token'))
  const save = jest.fn()
  const props = {...DEFAULT_PROPS, show: true, save}

  const {getByText, getByLabelText} = render(<ChangeAuth {...props} />)
  userEvent.click(getByLabelText('Access token'))
  userEvent.type(getByLabelText('Token'), 'some-token')
  userEvent.click(getByText('Save'))

  await waitFor(() => {
    expect(save).toBeCalledWith(AuthTypes.token, '', '', 'some-encrypted-token')
  })
})

it('should be able to discard making changes', () => {
  const save = jest.fn()
  const cancel = jest.fn()
  const props = {...DEFAULT_PROPS, show: true, save, cancel}

  const {getByText} = render(<ChangeAuth {...props} />)
  userEvent.click(getByText('Cancel'))

  expect(cancel).toBeCalled()
  expect(save).not.toBeCalled()
})
