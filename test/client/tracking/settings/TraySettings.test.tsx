import React from 'react'
import {shallow} from 'enzyme'
import {noop} from 'lodash'
import {TraySettings} from '../../../../src/client/tracking/settings/TraySettings'
import {changeAndBlur, locator} from '../../testHelpers'
import {AuthTypes} from '../../../../src/client/domain/Tray'

describe('<TraySettings/>', () => {

  const DEFAULT_PROPS = {
    trayId: '',
    url: '',
    name: '',
    authType: AuthTypes.none,
    username: '',
    serverType: '',
    removeTray: noop,
    setTrayName: noop,
    setServerType: noop,
    setAuth: noop,
    setTrayUrl: noop,
    setIncludeNew: noop
  }

  it.skip('should set the tray name on blur', () => {
    const setTrayName = jest.fn()
    const props = {...DEFAULT_PROPS, setTrayName, trayId: 'some-tray-id'}

    const wrapper = shallow(<TraySettings {...props} />)
    const input = wrapper.find(locator('tray-name'))
    changeAndBlur(input, 'some-name')

    expect(setTrayName).toBeCalledWith('some-tray-id', 'some-name')
  })

  it('should generate a new random name', () => {
    const setTrayName = jest.fn()
    const props = {...DEFAULT_PROPS, setTrayName, trayId: 'some-tray-id'}

    const wrapper = shallow(<TraySettings {...props} />)
    shallow(wrapper.find(locator('tray-name')).prop('button')).simulate('click')

    expect(setTrayName).toBeCalledWith('some-tray-id', expect.any(String))
  })

  it.skip('should set the tray URL on blur', () => {
    const setTrayUrl = jest.fn()
    const props = {...DEFAULT_PROPS, setTrayUrl, trayId: 'some-tray-id'}

    const wrapper = shallow(<TraySettings {...props} />)
    const input = wrapper.find(locator('tray-url'))
    changeAndBlur(input, 'some-url')

    expect(setTrayUrl).toBeCalledWith('some-tray-id', 'some-url')
  })

  it('should not render username/passwords when tray is configured with access token', () => {
    const props = {...DEFAULT_PROPS, accessToken: 'some-dummy-token'}

    const wrapper = shallow(<TraySettings {...props} />)

    expect(wrapper.find(locator('tray-username')).exists()).toBeFalsy()
    expect(wrapper.find(locator('tray-password')).exists()).toBeFalsy()
  })

  it('should set the tray server type on change', () => {
    const setServerType = jest.fn()
    const props = {...DEFAULT_PROPS, setServerType, trayId: 'some-tray-id'}

    const wrapper = shallow(<TraySettings {...props} />)
    const input = wrapper.find(locator('tray-server-type'))
    changeAndBlur(input, 'some-server-type')

    expect(setServerType).toBeCalledWith('some-tray-id', 'some-server-type')
  })

  it('should set the include new setting on click', () => {
    const setIncludeNew = jest.fn()
    const props = {...DEFAULT_PROPS, setIncludeNew, trayId: 'some-tray-id'}

    const wrapper = shallow(<TraySettings {...props} />)
    const onToggle: (show: boolean) => void = wrapper.find(locator('include-new')).prop('onToggle')
    onToggle && onToggle(true)

    expect(setIncludeNew).toBeCalledWith('some-tray-id', true)
  })

  it('should remove the tray when clicking the delete button', () => {
    const removeTray = jest.fn()
    const props = {...DEFAULT_PROPS, removeTray, trayId: 'some-tray-id'}

    const wrapper = shallow(<TraySettings {...props} />)
    wrapper.find(locator('delete-tray')).simulate('click')

    expect(removeTray).toBeCalledWith('some-tray-id')
  })
})
