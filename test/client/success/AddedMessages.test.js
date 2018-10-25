import {locator} from '../TestUtils'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
import {AddedMessages} from '../../../src/client/success/AddedMessages'
import _ from 'lodash'

describe('<AddedMessages/>', function () {

  const DEFAULT_PROPS = {
    messages: [],
    removeMessage: _.noop
  }

  it('should render nothing if messages is empty', function () {
    const props = {...DEFAULT_PROPS, messages: []}
    const wrapper = shallow(<AddedMessages {...props} />)
    expect(wrapper.get(0)).to.be.null()
  })

  it('should render the messages', function () {
    const props = {...DEFAULT_PROPS, messages: ['some-message']}
    const wrapper = shallow(<AddedMessages {...props} />)
    expect(wrapper.find(locator('success-message'))).to.have.text('some-message')
  })
})
