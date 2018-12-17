import {describe, it} from 'mocha'
import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
import _ from 'lodash'
import {NotificationsSystem} from '../../../src/client/settings/NotificationsSystem'
import {Messages} from '../../../src/client/common/Messages'
import {locator} from '../TestUtils'

describe('<NotificationsSystem/>', function () {

  const DEFAULT_PROPS = {
    systemNotificationsSupported: true,
    showSystemNotifications: false,
    systemNotificationPermissionDenied: false,
    systemNotificationRequestingPermission: false,
    setShowSystemNotifications: _.noop
  }

  it('should give the option to show browser notifications if they are supported', function () {
    const props = {...DEFAULT_PROPS, systemNotificationsSupported: true}
    const wrapper = shallow(<NotificationsSystem {...props} />)
    expect(wrapper.find(locator('show-system-notifications'))).to.be.present()
  })

  it('should not show the not supported message if browser notifications are supported', function () {
    const props = {...DEFAULT_PROPS, systemNotificationsSupported: true}
    const wrapper = shallow(<NotificationsSystem {...props} />)
    expect(wrapper.find(locator('not-supported'))).to.not.be.present()
  })

  it('should show the not supported message if browser notifications are not supported', function () {
    const props = {...DEFAULT_PROPS, systemNotificationsSupported: false}
    const wrapper = shallow(<NotificationsSystem {...props} />)
    expect(wrapper.find(locator('not-supported'))).to.be.present()
  })

  it('should not give the option to show browser notifications if they are not supported', function () {
    const props = {...DEFAULT_PROPS, systemNotificationsSupported: false}
    const wrapper = shallow(<NotificationsSystem {...props} />)
    expect(wrapper.find(locator('show-system-notifications'))).to.not.be.present()
  })

  it('should show a message if notifications are supported but permission is denied', function () {
    const props = {...DEFAULT_PROPS, systemNotificationsSupported: true, systemNotificationPermissionDenied: true}
    const wrapper = shallow(<NotificationsSystem {...props} />)
    expect(wrapper.find(Messages)).to.be.present()
  })

  it('should disable the checkbox if permission is being requested', function () {
    const props = {...DEFAULT_PROPS, systemNotificationsSupported: true, systemNotificationRequestingPermission: true}
    const wrapper = shallow(<NotificationsSystem {...props} />)
    expect(wrapper.find(locator('show-system-notifications'))).to.have.prop('disabled', true)
  })
})
