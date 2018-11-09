import {describe, it} from 'mocha'
import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
import _ from 'lodash'
import {mocks} from '../../Mocking'
import {TraySettings} from '../../../../src/client/tracking/settings/TraySettings'
import {changeAndBlur, locator} from '../../TestUtils'

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
    setTrayUrl: _.noop
  }

  it('should set the tray name on blur', function () {
    const setTrayName = mocks.spy()
    const props = {...DEFAULT_PROPS, setTrayName, trayId: 'some-tray-id'}

    const wrapper = shallow(<TraySettings {...props} />)
    const input = wrapper.find(locator('tray-name'))
    changeAndBlur(input, 'some-name')

    expect(setTrayName).to.have.been.calledWith('some-tray-id', 'some-name')
  })

  it('should generate a new random name', function () {
    const setTrayName = mocks.spy()
    const props = {...DEFAULT_PROPS, setTrayName, trayId: 'some-tray-id'}

    const wrapper = shallow(<TraySettings {...props} />)
    wrapper.find(locator('generate-random')).simulate('click')

    expect(setTrayName).to.have.been.calledWith('some-tray-id', mocks.match.string)
  })

  it('should set the tray URL on blur', function () {
    const setTrayUrl = mocks.spy()
    const props = {...DEFAULT_PROPS, setTrayUrl, trayId: 'some-tray-id'}

    const wrapper = shallow(<TraySettings {...props} />)
    const input = wrapper.find(locator('tray-url'))
    changeAndBlur(input, 'some-url')

    expect(setTrayUrl).to.have.been.calledWith('some-tray-id', 'some-url')
  })

  it('should set the tray server type on change', function () {
    const setServerType = mocks.spy()
    const props = {...DEFAULT_PROPS, setServerType, trayId: 'some-tray-id'}

    const wrapper = shallow(<TraySettings {...props} />)
    const input = wrapper.find(locator('tray-server-type'))
    changeAndBlur(input, 'some-server-type')

    expect(setServerType).to.have.been.calledWith('some-tray-id', 'some-server-type')
  })

  it('should set the tray username on blur', function () {
    const setTrayUsername = mocks.spy()
    const props = {...DEFAULT_PROPS, setTrayUsername, trayId: 'some-tray-id'}

    const wrapper = shallow(<TraySettings {...props} />)
    const input = wrapper.find(locator('tray-username'))
    changeAndBlur(input, 'some-username')

    expect(setTrayUsername).to.have.been.calledWith('some-tray-id', 'some-username')
  })

  describe('password', function () {

    it('should be redacted (we can not show the actual password even if we wanted to, as we only have the encrypted value stored)', function () {
      const props = {...DEFAULT_PROPS, password: 'some-encrypted-password'}
      const wrapper = shallow(<TraySettings {...props} />)
      expect(wrapper.find(locator('tray-password'))).to.have.prop('value', '*******')
    })

    it('should be read only', function () {
      const props = {...DEFAULT_PROPS}
      const wrapper = shallow(<TraySettings {...props} />)
      expect(wrapper.find(locator('tray-password'))).to.have.prop('readOnly', true)
    })

    it('should show the change password button', function () {
      const props = {...DEFAULT_PROPS}
      const wrapper = shallow(<TraySettings {...props} />)
      expect(wrapper.find(locator('change-password'))).to.be.present()
    })

    describe('when editing (change password clicked)', function () {

      it('should blank out the value so the user can easily enter a new password', function () {
        const props = {...DEFAULT_PROPS, password: 'some-encrypted-password'}
        const wrapper = shallow(<TraySettings {...props} />)
        clickChangePassword(wrapper)
        expect(wrapper.find(locator('tray-password'))).to.have.prop('value', '')
      })

      it('should be read write', function () {
        const props = {...DEFAULT_PROPS}
        const wrapper = shallow(<TraySettings {...props} />)
        clickChangePassword(wrapper)
        expect(wrapper.find(locator('tray-password'))).to.have.prop('readOnly', false)
      })

      it('should show the update password button', function () {
        const props = {...DEFAULT_PROPS}
        const wrapper = shallow(<TraySettings {...props} />)
        clickChangePassword(wrapper)
        expect(wrapper.find(locator('change-password-update'))).to.be.present()
      })

      it('should show the cancel button', function () {
        const props = {...DEFAULT_PROPS}
        const wrapper = shallow(<TraySettings {...props} />)
        clickChangePassword(wrapper)
        expect(wrapper.find(locator('change-password-cancel'))).to.be.present()
      })

      it('should not show the change password button', function () {
        const props = {...DEFAULT_PROPS}
        const wrapper = shallow(<TraySettings {...props} />)
        clickChangePassword(wrapper)
        expect(wrapper.find(locator('change-password'))).to.not.be.present()
      })

      it('should encrypt the password when updated', function () {
        const encryptPassword = mocks.spy()
        const props = {...DEFAULT_PROPS, encryptPassword, trayId: 'some-tray-id'}

        const wrapper = shallow(<TraySettings {...props} />)
        clickChangePassword(wrapper)
        changeAndBlur(wrapper.find(locator('tray-password')), 'some-new-password')
        clickUpdatePassword(wrapper)

        expect(encryptPassword).to.have.been.calledWith('some-tray-id', 'some-new-password')
      })

      it('should not encrypt the password when cancelled', function () {
        const encryptPassword = mocks.spy()
        const props = {...DEFAULT_PROPS, encryptPassword}

        const wrapper = shallow(<TraySettings {...props} />)
        clickChangePassword(wrapper)
        wrapper.find(locator('change-password-cancel')).simulate('click')

        expect(encryptPassword).to.not.have.been.called()
      })
    })
  })

  it('should remove the tray when clicking the delete button', function () {
    const removeTray = mocks.spy()
    const props = {...DEFAULT_PROPS, removeTray, trayId: 'some-tray-id'}

    const wrapper = shallow(<TraySettings {...props} />)
    wrapper.find(locator('delete-tray')).simulate('click')

    expect(removeTray).to.have.been.calledWith('some-tray-id')
  })
})

function clickChangePassword(wrapper) {
  wrapper.find(locator('change-password')).simulate('click')
}

function clickUpdatePassword(wrapper) {
  wrapper.find(locator('change-password-update')).simulate('click')
}
