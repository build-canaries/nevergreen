import {describe, it} from 'mocha'
import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
import Success from '../../../src/client/success/Success'
import AddedMessages from '../../../src/client/success/AddedMessages'
import AddedImages from '../../../src/client/success/AddedImages'
import noop from 'lodash/noop'

describe('Success <Success/>', function () {
  const DEFAULT_PROPS = {
    messages: [],
    addMessage: noop,
    removeMessage: noop
  }

  it('should render text messages', function () {
    const props = Object.assign({}, DEFAULT_PROPS, {messages: ['some-message', 'http://some-url']})
    const wrapper = shallow(<Success {...props} />)
    expect(wrapper.find(AddedMessages)).to.have.prop('messages').that.contains('some-message')
  })

  it('should render images', function () {
    const props = Object.assign({}, DEFAULT_PROPS, {messages: ['some-message', 'http://some-url']})
    const wrapper = shallow(<Success {...props} />)
    expect(wrapper.find(AddedImages)).to.have.prop('urls').that.contains('http://some-url')
  })
})
