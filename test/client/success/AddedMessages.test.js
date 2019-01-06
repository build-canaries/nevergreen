import {locator} from '../TestUtils'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
import _ from 'lodash'
import {AddedMessages} from '../../../src/client/success/AddedMessages'
import {SuccessMessage} from '../../../src/client/common/SuccessMessage'

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

  it('should render text messages', function () {
    const props = {...DEFAULT_PROPS, messages: ['some-message']}
    const wrapper = shallow(<AddedMessages {...props} />)
    expect(wrapper.find(SuccessMessage)).to.have.prop('message', 'some-message')
  })

  it('should render images', function () {
    const props = {...DEFAULT_PROPS, messages: ['https://some-url']}
    const wrapper = shallow(<AddedMessages {...props} />)
    expect(wrapper.find(locator('success-image'))).to.have.prop('src', 'https://some-url')
  })
})
