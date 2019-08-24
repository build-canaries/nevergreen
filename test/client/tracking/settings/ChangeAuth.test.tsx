import React from 'react'
import {ChangeAuth} from '../../../../src/client/tracking/settings/ChangeAuth'
import {noop} from 'lodash'
import {AuthTypes} from '../../../../src/client/domain/Tray'
import {render} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {setupReactModal} from '../../testHelpers'

describe('<ChangeAuth/>', () => {

  const DEFAULT_PROPS = {
    show: false,
    cancel: noop,
    save: noop,
    authType: AuthTypes.none,
    username: ''
  }

  beforeEach(setupReactModal)

  test('should be able to change the auth to none', async () => {
    const save = jest.fn()
    const props = {...DEFAULT_PROPS, show: true, authType: AuthTypes.basic, save}

    const {getByText, getByLabelText} = render(<ChangeAuth {...props} />)
    userEvent.click(getByLabelText('no auth'))
    userEvent.click(getByText('save changes'))

    expect(save).toBeCalledWith({
      type: AuthTypes.none,
      username: '',
      password: '',
      accessToken: ''
    })
  })

  test('should be able to change the auth to basic', async () => {
    const save = jest.fn()
    const props = {...DEFAULT_PROPS, show: true, save}

    const {getByTestId, getByText, getByLabelText} = render(<ChangeAuth {...props} />)
    userEvent.click(getByLabelText('basic auth'))
    await userEvent.type(getByLabelText('username'), 'some-username')
    await userEvent.type(getByTestId('auth-password'), 'some-password')
    userEvent.click(getByText('save changes'))

    expect(save).toBeCalledWith({
      type: AuthTypes.basic,
      username: 'some-username',
      password: 'some-password',
      accessToken: ''
    })
  })

  test('should be able to change the auth to access token', async () => {
    const save = jest.fn()
    const props = {...DEFAULT_PROPS, show: true, save}

    const {getByTestId, getByText, getByLabelText} = render(<ChangeAuth {...props} />)
    userEvent.click(getByLabelText('access token'))
    await userEvent.type(getByTestId('auth-access-token'), 'some-token')
    userEvent.click(getByText('save changes'))

    expect(save).toBeCalledWith({
      type: AuthTypes.token,
      username: '',
      password: '',
      accessToken: 'some-token'
    })
  })

  test('should be able to discard making changes', async () => {
    const save = jest.fn()
    const cancel = jest.fn()
    const props = {...DEFAULT_PROPS, show: true, save, cancel}

    const {getByText} = render(<ChangeAuth {...props} />)
    userEvent.click(getByText('discard changes'))

    expect(cancel).toBeCalled()
    expect(save).not.toBeCalled()
  })
})
