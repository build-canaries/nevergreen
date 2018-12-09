import {locator} from '../TestUtils'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
import {Messages} from '../../../src/client/common/Messages'

describe('<Messages/>', function () {

  const DEFAULT_PROPS = {
    type: 'error',
    messages: null
  }

  it('should not render anything if messages is null', function () {
    const props = {...DEFAULT_PROPS, messages: null}
    const wrapper = shallow(<Messages {...props} />)
    expect(wrapper).to.be.blank()
  })

  it('should not render anything if messages is empty', function () {
    const props = {...DEFAULT_PROPS, messages: []}
    const wrapper = shallow(<Messages {...props} />)
    expect(wrapper).to.be.blank()
  })

  it('should render the messages', function () {
    const props = {...DEFAULT_PROPS, type: 'error', messages: ['some-message', 'another-message']}
    const wrapper = shallow(<Messages {...props} />)
    expect(wrapper.find(locator('error-messages'))).to.contain.text('some-message')
    expect(wrapper.find(locator('error-messages'))).to.contain.text('another-message')
  })
})
