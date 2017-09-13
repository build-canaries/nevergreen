import {locator} from '../../UnitSpec'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
import Messages from '../../../../src/client/common/messages/Messages'

describe('<Messages/>', function () {
  const DEFAULT_PROPS = {
    type: 'error',
    messages: null
  }

  it('should not render anything if messages is null', function () {
    const props = Object.assign({}, DEFAULT_PROPS, {messages: null})
    const wrapper = shallow(<Messages {...props} />)
    expect(wrapper.get(0)).to.be.null()
  })

  it('should not render anything if messages is empty', function () {
    const props = Object.assign({}, DEFAULT_PROPS, {messages: []})
    const wrapper = shallow(<Messages {...props} />)
    expect(wrapper.get(0)).to.be.null()
  })

  it('should render the messages', function () {
    const props = Object.assign({}, DEFAULT_PROPS, {messages: ['some-message', 'another-message']})
    const wrapper = shallow(<Messages {...props} />)
    expect(wrapper.find(locator('messages'))).to.contain.text('some-message')
    expect(wrapper.find(locator('messages'))).to.contain.text('another-message')
  })
})
