import React from 'react'
import {shallow} from 'enzyme'
import _ from 'lodash'
import {NotificationsSystem} from '../../../src/client/settings/NotificationsSystem'
import {Messages} from '../../../src/client/common/Messages'
import {locator} from '../testHelpers'

describe('<NotificationsSystem/>', () => {

  const DEFAULT_PROPS = {
    systemNotificationsSupported: true,
    showSystemNotifications: false,
    systemNotificationPermissionDenied: false,
    systemNotificationRequestingPermission: false,
    setShowSystemNotifications: _.noop
  }

  test('should give the option to show browser notifications if they are supported', () => {
    const props = {...DEFAULT_PROPS, systemNotificationsSupported: true}
    const wrapper = shallow(<NotificationsSystem {...props} />)
    expect(wrapper.find(locator('show-system-notifications')).exists()).toBeTruthy()
  })

  test('should not show the not supported message if browser notifications are supported', () => {
    const props = {...DEFAULT_PROPS, systemNotificationsSupported: true}
    const wrapper = shallow(<NotificationsSystem {...props} />)
    expect(wrapper.find(locator('not-supported')).exists()).toBeFalsy()
  })

  test('should show the not supported message if browser notifications are not supported', () => {
    const props = {...DEFAULT_PROPS, systemNotificationsSupported: false}
    const wrapper = shallow(<NotificationsSystem {...props} />)
    expect(wrapper.find(locator('not-supported')).exists()).toBeTruthy()
  })

  test('should not give the option to show browser notifications if they are not supported', () => {
    const props = {...DEFAULT_PROPS, systemNotificationsSupported: false}
    const wrapper = shallow(<NotificationsSystem {...props} />)
    expect(wrapper.find(locator('show-system-notifications')).exists()).toBeFalsy()
  })

  test('should show a message if notifications are supported but permission is denied', () => {
    const props = {...DEFAULT_PROPS, systemNotificationsSupported: true, systemNotificationPermissionDenied: true}
    const wrapper = shallow(<NotificationsSystem {...props} />)
    expect(wrapper.find(Messages).exists()).toBeTruthy()
  })

  test('should disable the checkbox if permission is being requested', () => {
    const props = {...DEFAULT_PROPS, systemNotificationsSupported: true, systemNotificationRequestingPermission: true}
    const wrapper = shallow(<NotificationsSystem {...props} />)
    expect(wrapper.find(locator('show-system-notifications')).prop('disabled')).toEqual(true)
  })
})
