import React from 'react'
import {shallow} from 'enzyme'
import {AddTray} from '../../../src/client/tracking/AddTray'
import {noop} from 'lodash'
import {change, locator} from '../testHelpers'
import {AuthTypes} from '../../../src/client/domain/Tray'

describe('<AddTray/>', () => {

  const DEFAULT_PROPS = {
    addTray: noop
  }

  test('should update the url', () => {
    const props = {...DEFAULT_PROPS}
    const wrapper = shallow(<AddTray {...props} />)
    change(wrapper.find(locator('add-tray-url')), 'some-new-url')
    expect(wrapper.find(locator('add-tray-url')).prop('value')).toEqual('some-new-url')
  })

  describe('add tray', () => {

    test('should pass the entered details', () => {
      const addTray = jest.fn()
      const props = {...DEFAULT_PROPS, addTray}

      const wrapper = shallow(<AddTray {...props} />)
      change(wrapper.find(locator('add-tray-url')), 'some-new-url')
      wrapper.find(locator('add-tray')).simulate('click')

      expect(addTray).toBeCalledWith('some-new-url', {
        type: AuthTypes.none,
        username: '',
        password: '',
        accessToken: ''
      })
    })

    test('should clear the entered url', () => {
      const props = {...DEFAULT_PROPS}

      const wrapper = shallow(<AddTray {...props} />)
      change(wrapper.find(locator('add-tray-url')), 'some-new-url')
      wrapper.find(locator('add-tray')).simulate('click')

      expect(wrapper.find(locator('add-tray-url')).prop('value')).toEqual('')
    })
  })
})
