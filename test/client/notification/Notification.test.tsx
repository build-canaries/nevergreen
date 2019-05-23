import React from 'react'
import {shallow} from 'enzyme'
import {Notification} from '../../../src/client/notification/Notification'
import {noop} from 'lodash'
import {locator} from '../testHelpers'

describe('<Notification/>', () => {

  const DEFAULT_PROPS = {
    dismiss: noop,
    notification: '',
    fullScreen: false
  }

  test('should not render anything if notification is empty', () => {
    const props = {...DEFAULT_PROPS, notification: ''}
    const wrapper = shallow(<Notification {...props} />)
    expect(wrapper.isEmptyRender()).toBeTruthy()
  })

  test('should not render anything if notification is blank', () => {
    const props = {...DEFAULT_PROPS, notification: '      '}
    const wrapper = shallow(<Notification {...props} />)
    expect(wrapper.isEmptyRender()).toBeTruthy()
  })

  test('should render the notification', () => {
    const props = {...DEFAULT_PROPS, notification: 'some-notification'}
    const wrapper = shallow(<Notification {...props} />)
    expect(wrapper.find(locator('notification')).text()).toEqual('some-notification')
  })

  test('should render a dismiss button', () => {
    const props = {...DEFAULT_PROPS, notification: 'some-notification'}
    const wrapper = shallow(<Notification {...props} />)
    expect(wrapper.find(locator('dismiss')).exists()).toBeTruthy()
  })
})
