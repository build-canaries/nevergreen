import React from 'react'
import {shallow} from 'enzyme'
import {AddTray} from '../../../src/client/tracking/AddTray'
import {noop} from 'lodash'
import {change, locator} from '../testHelpers'

describe('<AddTray/>', () => {

  const DEFAULT_PROPS = {
    addTray: noop,
    addTrayUsingToken: noop
  }

  test('should update the url', () => {
    const props = {...DEFAULT_PROPS}
    const wrapper = shallow(<AddTray {...props} />)
    change(wrapper.find(locator('add-tray-url')), 'some-new-url')
    expect(wrapper.find(locator('add-tray-url')).prop('value')).toEqual('some-new-url')
  })

  test('should update the username', () => {
    const props = {...DEFAULT_PROPS}
    const wrapper = shallow(<AddTray {...props} />)
    change(wrapper.find(locator('add-tray-username')), 'some-new-username')
    expect(wrapper.find(locator('add-tray-username')).prop('value')).toEqual('some-new-username')
  })

  test('should update the password', () => {
    const props = {...DEFAULT_PROPS}
    const wrapper = shallow(<AddTray {...props} />)
    change(wrapper.find(locator('add-tray-password')), 'some-new-password')
    expect(wrapper.find(locator('add-tray-password')).prop('value')).toEqual('some-new-password')
  })

  test('should update the access token', () => {
    const props = {...DEFAULT_PROPS}
    const wrapper = shallow(<AddTray {...props} />)
    // wrapper.find('input').simulate('click')
    // @ts-ignore
    wrapper.find('input[id="access_token"]').props().onChange({target: {value: "access_token"}})

    change(wrapper.find(locator('add-tray-access-token')), 'some-dummy-token')
    expect(wrapper.find(locator('add-tray-access-token')).prop('value')).toEqual('some-dummy-token')
  })

  describe('add tray', () => {

    test('should pass the entered details', () => {
      const addTray = jest.fn()
      const props = {...DEFAULT_PROPS, addTray}

      const wrapper = shallow(<AddTray {...props} />)
      change(wrapper.find(locator('add-tray-url')), 'some-new-url')
      change(wrapper.find(locator('add-tray-username')), 'some-new-username')
      change(wrapper.find(locator('add-tray-password')), 'some-new-password')
      wrapper.find(locator('add-tray')).simulate('click')

      expect(addTray).toBeCalledWith('some-new-url', 'some-new-username', 'some-new-password')
    })

    test('should pass the access token with url', () => {
      const addTrayUsingToken = jest.fn()
      const props = {...DEFAULT_PROPS, addTrayUsingToken}

      const wrapper = shallow(<AddTray {...props} />)
      change(wrapper.find(locator('add-tray-url')), 'some-new-url')
      // @ts-ignore
      wrapper.find('input[id="access_token"]').props().onChange({target: {value: "access_token"}})
      change(wrapper.find(locator('add-tray-access-token')), 'some-dummy-token')

      wrapper.find(locator('add-tray')).simulate('click')

      expect(addTrayUsingToken).toBeCalledWith('some-new-url', 'some-dummy-token')
    })

    test('should clear the entered url', () => {
      const props = {...DEFAULT_PROPS}

      const wrapper = shallow(<AddTray {...props} />)
      change(wrapper.find(locator('add-tray-url')), 'some-new-url')
      wrapper.find(locator('add-tray')).simulate('click')

      expect(wrapper.find(locator('add-tray-url')).prop('value')).toEqual('')
    })

    test('should clear the entered username', () => {
      const props = {...DEFAULT_PROPS}

      const wrapper = shallow(<AddTray {...props} />)
      change(wrapper.find(locator('add-tray-username')), 'some-new-username')
      wrapper.find(locator('add-tray')).simulate('click')

      expect(wrapper.find(locator('add-tray-username')).prop('value')).toEqual('')
    })

    test('should clear the entered password', () => {
      const props = {...DEFAULT_PROPS}

      const wrapper = shallow(<AddTray {...props} />)
      change(wrapper.find(locator('add-tray-password')), 'some-new-password')
      wrapper.find(locator('add-tray')).simulate('click')

      expect(wrapper.find(locator('add-tray-password')).prop('value')).toEqual('')
    })
  })
})
