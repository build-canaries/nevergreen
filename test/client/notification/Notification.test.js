import {describe, it} from 'mocha'
import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
import {Notification} from '../../../src/client/notification/Notification'
import _ from 'lodash'
import {locator} from '../TestUtils'

describe('<Notification/>', function () {

  const DEFAULT_PROPS = {
    notification: null,
    fullScreen: null,
    dismiss: _.noop
  }

  it('should not render anything if notification is null', function () {
    const props = {...DEFAULT_PROPS, notification: null}
    const wrapper = shallow(<Notification {...props} />)
    expect(wrapper).to.be.blank()
  })

  it('should render the notification', function () {
    const props = {...DEFAULT_PROPS, notification: 'some-notification'}
    const wrapper = shallow(<Notification {...props} />)
    expect(wrapper.find(locator('notification'))).to.have.text('some-notification')
  })

  it('should render a dismiss button', function () {
    const props = {...DEFAULT_PROPS, notification: 'some-notification'}
    const wrapper = shallow(<Notification {...props} />)
    expect(wrapper.find(locator('dismiss'))).to.be.present()
  })
})
