import {describe, it} from 'mocha'
import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
import {AddTray} from '../../../src/client/tracking/AddTray'
import _ from 'lodash'
import {change, locator} from '../TestUtils'
import {mocks} from '../Mocking'

describe('<AddTray/>', function () {

  const DEFAULT_PROPS = {
    addTray: _.noop
  }

  it('should update the url', function () {
    const props = {...DEFAULT_PROPS}
    const wrapper = shallow(<AddTray {...props} />)
    change(wrapper.find(locator('add-tray-url')), 'some-new-url')
    expect(wrapper).to.have.state('url', 'some-new-url')
  })

  it('should update the username', function () {
    const props = {...DEFAULT_PROPS}
    const wrapper = shallow(<AddTray {...props} />)
    change(wrapper.find(locator('add-tray-username')), 'some-new-username')
    expect(wrapper).to.have.state('username', 'some-new-username')
  })

  it('should update the password', function () {
    const props = {...DEFAULT_PROPS}
    const wrapper = shallow(<AddTray {...props} />)
    change(wrapper.find(locator('add-tray-password')), 'some-new-password')
    expect(wrapper).to.have.state('password', 'some-new-password')
  })

  describe('add tray', function () {

    it('should pass the entered details', function () {
      const addTray = mocks.spy()
      const props = {...DEFAULT_PROPS, addTray}

      const wrapper = shallow(<AddTray {...props} />)
      change(wrapper.find(locator('add-tray-url')), 'some-new-url')
      change(wrapper.find(locator('add-tray-username')), 'some-new-username')
      change(wrapper.find(locator('add-tray-password')), 'some-new-password')
      wrapper.find(locator('add-tray')).simulate('click')

      expect(addTray).to.have.been.calledWith('some-new-url', 'some-new-username', 'some-new-password')
    })

    it('should clear the entered url', function () {
      const props = {...DEFAULT_PROPS}

      const wrapper = shallow(<AddTray {...props} />)
      change(wrapper.find(locator('add-tray-url')), 'some-new-url')
      wrapper.find(locator('add-tray')).simulate('click')

      expect(wrapper).to.have.state('url', '')
    })

    it('should clear the entered username', function () {
      const props = {...DEFAULT_PROPS}

      const wrapper = shallow(<AddTray {...props} />)
      change(wrapper.find(locator('add-tray-username')), 'some-new-username')
      wrapper.find(locator('add-tray')).simulate('click')

      expect(wrapper).to.have.state('username', '')
    })

    it('should clear the entered password', function () {
      const props = {...DEFAULT_PROPS}

      const wrapper = shallow(<AddTray {...props} />)
      change(wrapper.find(locator('add-tray-password')), 'some-new-password')
      wrapper.find(locator('add-tray')).simulate('click')

      expect(wrapper).to.have.state('password', '')
    })
  })
})
