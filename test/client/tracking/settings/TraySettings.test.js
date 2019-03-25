import React from 'react'
import {shallow} from 'enzyme'
import _ from 'lodash'
import {TraySettings} from '../../../../src/client/tracking/settings/TraySettings'
import {changeAndBlur, locator} from '../../testHelpers'

describe('<TraySettings/>', function () {

  const DEFAULT_PROPS = {
    trayId: '',
    name: null,
    url: '',
    username: null,
    password: null,
    serverType: null,
    removeTray: _.noop,
    setTrayName: _.noop,
    setServerType: _.noop,
    setTrayUsername: _.noop,
    encryptPassword: _.noop,
    setTrayUrl: _.noop,
    includeNew: null,
    setIncludeNew: _.noop
  }

  it('should set the tray name on blur', function () {
    const setTrayName = jest.fn()
    const props = {...DEFAULT_PROPS, setTrayName, trayId: 'some-tray-id'}

    const wrapper = shallow(<TraySettings {...props} />)
    const input = wrapper.find(locator('tray-name'))
    changeAndBlur(input, 'some-name')

    expect(setTrayName).toBeCalledWith('some-tray-id', 'some-name')
  })

  it('should generate a new random name', function () {
    const setTrayName = jest.fn()
    const props = {...DEFAULT_PROPS, setTrayName, trayId: 'some-tray-id'}

    const wrapper = shallow(<TraySettings {...props} />)
    shallow(wrapper.find(locator('tray-name')).prop('button')).simulate('click')

    expect(setTrayName).toBeCalledWith('some-tray-id', expect.any(String))
  })

  it('should set the tray URL on blur', function () {
    const setTrayUrl = jest.fn()
    const props = {...DEFAULT_PROPS, setTrayUrl, trayId: 'some-tray-id'}

    const wrapper = shallow(<TraySettings {...props} />)
    const input = wrapper.find(locator('tray-url'))
    changeAndBlur(input, 'some-url')

    expect(setTrayUrl).toBeCalledWith('some-tray-id', 'some-url')
  })

  it('should set the tray server type on change', function () {
    const setServerType = jest.fn()
    const props = {...DEFAULT_PROPS, setServerType, trayId: 'some-tray-id'}

    const wrapper = shallow(<TraySettings {...props} />)
    const input = wrapper.find(locator('tray-server-type'))
    changeAndBlur(input, 'some-server-type')

    expect(setServerType).toBeCalledWith('some-tray-id', 'some-server-type')
  })

  it('should set the tray username on blur', function () {
    const setTrayUsername = jest.fn()
    const props = {...DEFAULT_PROPS, setTrayUsername, trayId: 'some-tray-id'}

    const wrapper = shallow(<TraySettings {...props} />)
    const input = wrapper.find(locator('tray-username'))
    changeAndBlur(input, 'some-username')

    expect(setTrayUsername).toBeCalledWith('some-tray-id', 'some-username')
  })

  describe('password', function () {

    it('should be redacted (we can not show the actual password even if we wanted to, as we only have the encrypted value stored)', function () {
      const props = {...DEFAULT_PROPS, password: 'some-encrypted-password'}
      const wrapper = shallow(<TraySettings {...props} />)
      expect(wrapper.find(locator('tray-password')).prop('value')).toEqual('*******')
    })

    it('should be read only', function () {
      const props = {...DEFAULT_PROPS}
      const wrapper = shallow(<TraySettings {...props} />)
      expect(wrapper.find(locator('tray-password')).prop('readOnly')).toEqual(true)
    })

    it('should show the change password button', function () {
      const props = {...DEFAULT_PROPS}
      const wrapper = shallow(<TraySettings {...props} />)
      expect(wrapper.find(locator('change-password')).exists()).toBeTruthy()
    })

    describe('when editing (change password clicked)', function () {

      it('should blank out the value so the user can easily enter a new password', function () {
        const props = {...DEFAULT_PROPS, password: 'some-encrypted-password'}
        const wrapper = shallow(<TraySettings {...props} />)
        clickChangePassword(wrapper)
        expect(wrapper.find(locator('tray-password')).prop('value')).toEqual('')
      })

      it('should be read write', function () {
        const props = {...DEFAULT_PROPS}
        const wrapper = shallow(<TraySettings {...props} />)
        clickChangePassword(wrapper)
        expect(wrapper.find(locator('tray-password')).prop('readOnly')).toEqual(false)
      })

      it('should show the update password button', function () {
        const props = {...DEFAULT_PROPS}
        const wrapper = shallow(<TraySettings {...props} />)
        clickChangePassword(wrapper)
        expect(wrapper.find(locator('change-password-update')).exists()).toBeTruthy()
      })

      it('should show the cancel button', function () {
        const props = {...DEFAULT_PROPS}
        const wrapper = shallow(<TraySettings {...props} />)
        clickChangePassword(wrapper)
        expect(wrapper.find(locator('change-password-cancel')).exists()).toBeTruthy()
      })

      it('should not show the change password button', function () {
        const props = {...DEFAULT_PROPS}
        const wrapper = shallow(<TraySettings {...props} />)
        clickChangePassword(wrapper)
        expect(wrapper.find(locator('change-password')).exists()).toBeFalsy()
      })

      it('should encrypt the password when updated', function () {
        const encryptPassword = jest.fn()
        const props = {...DEFAULT_PROPS, encryptPassword, trayId: 'some-tray-id'}

        const wrapper = shallow(<TraySettings {...props} />)
        clickChangePassword(wrapper)
        changeAndBlur(wrapper.find(locator('tray-password')), 'some-new-password')
        clickUpdatePassword(wrapper)

        expect(encryptPassword).toBeCalledWith('some-tray-id', 'some-new-password')
      })

      it('should not encrypt the password when cancelled', function () {
        const encryptPassword = jest.fn()
        const props = {...DEFAULT_PROPS, encryptPassword}

        const wrapper = shallow(<TraySettings {...props} />)
        clickChangePassword(wrapper)
        wrapper.find(locator('change-password-cancel')).simulate('click')

        expect(encryptPassword).not.toBeCalled()
      })
    })
  })

  it('should set the include new setting on click', function () {
    const setIncludeNew = jest.fn()
    const props = {...DEFAULT_PROPS, setIncludeNew, trayId: 'some-tray-id'}

    const wrapper = shallow(<TraySettings {...props} />)
    wrapper.find(locator('include-new')).prop('onToggle')(true)

    expect(setIncludeNew).toBeCalledWith('some-tray-id', true)
  })

  it('should remove the tray when clicking the delete button', function () {
    const removeTray = jest.fn()
    const props = {...DEFAULT_PROPS, removeTray, trayId: 'some-tray-id'}

    const wrapper = shallow(<TraySettings {...props} />)
    wrapper.find(locator('delete-tray')).simulate('click')

    expect(removeTray).toBeCalledWith('some-tray-id')
  })
})

function clickChangePassword(wrapper) {
  wrapper.find(locator('change-password')).simulate('click')
}

function clickUpdatePassword(wrapper) {
  wrapper.find(locator('change-password-update')).simulate('click')
}
