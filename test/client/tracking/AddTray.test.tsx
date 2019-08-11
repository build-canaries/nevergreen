import React from 'react'
import {AddTray} from '../../../src/client/tracking/AddTray'
import {noop} from 'lodash'
import {AuthTypes} from '../../../src/client/domain/Tray'
import {render} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('<AddTray/>', () => {

  const DEFAULT_PROPS = {
    addTray: noop
  }

  test('should allow adding trays without auth', async () => {
    const addTray = jest.fn()
    const props = {...DEFAULT_PROPS, addTray}

    const {getByText, getByLabelText} = render(<AddTray {...props} />)
    await userEvent.type(getByLabelText('URL'), 'some-new-url')
    userEvent.click(getByText('add'))

    expect(addTray).toBeCalledWith('some-new-url', {
      type: AuthTypes.none,
      username: '',
      password: '',
      accessToken: ''
    })
  })

  test('should allow adding trays with basic auth', async () => {
    const addTray = jest.fn()
    const props = {...DEFAULT_PROPS, addTray}

    const {getByTestId, getByText, getByLabelText} = render(<AddTray {...props} />)
    userEvent.click(getByLabelText('basic auth'))
    await userEvent.type(getByLabelText('username'), 'some-username')
    await userEvent.type(getByTestId('auth-password'), 'some-password')
    userEvent.click(getByText('add'))

    expect(addTray).toBeCalledWith(expect.anything(), {
      type: AuthTypes.basic,
      username: 'some-username',
      password: 'some-password',
      accessToken: ''
    })
  })

  test('should allow adding trays with an access token', async () => {
    const addTray = jest.fn()
    const props = {...DEFAULT_PROPS, addTray}

    const {getByTestId, getByText, getByLabelText} = render(<AddTray {...props} />)
    userEvent.click(getByLabelText('access token'))
    await userEvent.type(getByTestId('auth-access-token'), 'some-token')
    userEvent.click(getByText('add'))

    expect(addTray).toBeCalledWith(expect.anything(), {
      type: AuthTypes.token,
      username: '',
      password: '',
      accessToken: 'some-token'
    })
  })

  test('should reset the form after adding a tray', async () => {
    const props = {...DEFAULT_PROPS}

    const {getByTestId, queryByTestId, getByText, getByLabelText, queryByLabelText} = render(<AddTray {...props} />)
    await userEvent.type(getByLabelText('URL'), 'some-new-url')
    userEvent.click(getByLabelText('access token'))
    await userEvent.type(getByTestId('auth-access-token'), 'some-token')
    userEvent.click(getByText('add'))

    expect(getByLabelText('URL')).toHaveValue('')
    expect(queryByTestId('auth-access-token')).not.toBeInTheDocument()
    expect(queryByLabelText('username')).not.toBeInTheDocument()
    expect(queryByTestId('auth-password')).not.toBeInTheDocument()
  })
})
