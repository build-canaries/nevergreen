import React from 'react'
import {shallow, ShallowWrapper} from 'enzyme'
import {noop} from 'lodash'
import {TraySettings} from '../../../../src/client/tracking/settings/TraySettings'
import {changeAndBlur, locator} from '../../testHelpers'

function clickChangePassword(wrapper: ShallowWrapper) {
  wrapper.find(locator('change-password')).simulate('click')
}

function clickUpdatePassword(wrapper: ShallowWrapper) {
  wrapper.find(locator('change-password-update')).simulate('click')
}

describe('<TraySettings/>', () => {

  const DEFAULT_PROPS = {
    trayId: '',
    url: '',
    name: '',
    username: '',
    password: '',
    accessToken: '',
    serverType: '',
    removeTray: noop,
    setTrayName: noop,
    setServerType: noop,
    setTrayUsername: noop,
    encryptPassword: noop,
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

  it.skip('should set the tray username on blur', () => {
    const setTrayUsername = jest.fn()
    const props = {...DEFAULT_PROPS, setTrayUsername, trayId: 'some-tray-id'}

    const wrapper = shallow(<TraySettings {...props} />)
    const input = wrapper.find(locator('tray-username'))
    changeAndBlur(input, 'some-username')

    expect(setTrayUsername).toBeCalledWith('some-tray-id', 'some-username')
  })

  describe('password', () => {

    it('should be redacted (we can not show the actual password even if we wanted to, as we only have the encrypted value stored)', () => {
      const props = {...DEFAULT_PROPS, password: 'some-encrypted-password'}
      const wrapper = shallow(<TraySettings {...props} />)
      expect(wrapper.find(locator('tray-password')).prop('value')).toEqual('*******')
    })

    it('should be read only', () => {
      const props = {...DEFAULT_PROPS}
      const wrapper = shallow(<TraySettings {...props} />)
      expect(wrapper.find(locator('tray-password')).prop('readOnly')).toEqual(true)
    })

    it('should show the change password button', () => {
      const props = {...DEFAULT_PROPS}
      const wrapper = shallow(<TraySettings {...props} />)
      expect(wrapper.find(locator('change-password')).exists()).toBeTruthy()
    })

    describe('when editing (change password clicked)', () => {

      it('should blank out the value so the user can easily enter a new password', () => {
        const props = {...DEFAULT_PROPS, password: 'some-encrypted-password'}
        const wrapper = shallow(<TraySettings {...props} />)
        clickChangePassword(wrapper)
        expect(wrapper.find(locator('tray-password')).prop('value')).toEqual('')
      })

      it('should be read write', () => {
        const props = {...DEFAULT_PROPS}
        const wrapper = shallow(<TraySettings {...props} />)
        clickChangePassword(wrapper)
        expect(wrapper.find(locator('tray-password')).prop('readOnly')).toEqual(false)
      })

      it('should show the update password button', () => {
        const props = {...DEFAULT_PROPS}
        const wrapper = shallow(<TraySettings {...props} />)
        clickChangePassword(wrapper)
        expect(wrapper.find(locator('change-password-update')).exists()).toBeTruthy()
      })

      it('should show the cancel button', () => {
        const props = {...DEFAULT_PROPS}
        const wrapper = shallow(<TraySettings {...props} />)
        clickChangePassword(wrapper)
        expect(wrapper.find(locator('change-password-cancel')).exists()).toBeTruthy()
      })

      it('should not show the change password button', () => {
        const props = {...DEFAULT_PROPS}
        const wrapper = shallow(<TraySettings {...props} />)
        clickChangePassword(wrapper)
        expect(wrapper.find(locator('change-password')).exists()).toBeFalsy()
      })

      it('should encrypt the password when updated', () => {
        const encryptPassword = jest.fn()
        const props = {...DEFAULT_PROPS, encryptPassword, trayId: 'some-tray-id'}

        const wrapper = shallow(<TraySettings {...props} />)
        clickChangePassword(wrapper)
        changeAndBlur(wrapper.find(locator('tray-password')), 'some-new-password')
        clickUpdatePassword(wrapper)

        expect(encryptPassword).toBeCalledWith('some-tray-id', 'some-new-password')
      })

      it('should not encrypt the password when cancelled', () => {
        const encryptPassword = jest.fn()
        const props = {...DEFAULT_PROPS, encryptPassword}

        const wrapper = shallow(<TraySettings {...props} />)
        clickChangePassword(wrapper)
        wrapper.find(locator('change-password-cancel')).simulate('click')

        expect(encryptPassword).not.toBeCalled()
      })
    })
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
