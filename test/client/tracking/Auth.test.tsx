import React from 'react'
import {shallow} from 'enzyme'
import {Auth} from '../../../src/client/tracking/Auth'
import {noop} from 'lodash'
import {change, locator} from '../testHelpers'
import {AuthTypes} from '../../../src/client/domain/Tray'

describe('<Auth/>', () => {

  const DEFAULT_PROPS = {
    authType: AuthTypes.none,
    setAuthType: noop,
    username: '',
    setUsername: noop,
    password: '',
    setPassword: noop,
    accessToken: '',
    setAccessToken: noop,
    onEnter: noop
  }

  test('should update the username', () => {
    const setUsername = jest.fn()
    const props = {...DEFAULT_PROPS, setUsername, authType: AuthTypes.basic}

    const wrapper = shallow(<Auth {...props} />)
    change(wrapper.find(locator('auth-username')), 'some-new-username')

    expect(setUsername).toHaveBeenCalledWith('some-new-username')
  })

  test('should update the password', () => {
    const setPassword = jest.fn()
    const props = {...DEFAULT_PROPS, setPassword, authType: AuthTypes.basic}

    const wrapper = shallow(<Auth {...props} />)
    change(wrapper.find(locator('auth-password')), 'some-new-password')

    expect(setPassword).toHaveBeenCalledWith('some-new-password')
  })

  test('should update the access token', () => {
    const setAccessToken = jest.fn()
    const props = {...DEFAULT_PROPS, setAccessToken, authType: AuthTypes.token}

    const wrapper = shallow(<Auth {...props} />)
    change(wrapper.find(locator('auth-access-token')), 'some-dummy-token')

    expect(setAccessToken).toHaveBeenCalledWith('some-dummy-token')
  })
})
