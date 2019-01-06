import {describe, it} from 'mocha'
import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
import _ from 'lodash'
import {Success} from '../../../src/client/success/Success'
import {AddedMessages} from '../../../src/client/success/AddedMessages'
import {Messages} from '../../../src/client/common/Messages'

describe('Success <Success/>', function () {

  const DEFAULT_PROPS = {
    messages: [],
    addMessage: _.noop,
    removeMessage: _.noop
  }

  it('should show success messages', function () {
    const messages = ['some-message', 'http://some-url']
    const props = {...DEFAULT_PROPS, messages}
    const wrapper = shallow(<Success {...props} />)
    expect(wrapper.find(AddedMessages)).to.have.prop('messages').that.deep.equals(messages)
  })

  it('should show a warning if all success messages are removed', function () {
    const props = {...DEFAULT_PROPS, messages: []}
    const wrapper = shallow(<Success {...props} />)
    expect(wrapper.find(Messages)).to.have.prop('messages').that.is.not.null()
  })

  it('should not show a warning if at least one success messages exists', function () {
    const props = {...DEFAULT_PROPS, messages: ['some-message']}
    const wrapper = shallow(<Success {...props} />)
    expect(wrapper.find(Messages)).to.have.prop('messages').that.is.null()
  })
})
