import {describe, it} from 'mocha'
import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
import {Success} from '../../../src/client/monitor/Success'
import {SuccessMessage} from '../../../src/client/monitor/SuccessMessage'
import {SuccessImage} from '../../../src/client/monitor/SuccessImage'

describe('Monitor <Success/>', function () {

  const DEFAULT_PROPS = {
    messages: []
  }

  it('should pick a message when constructed to stop it changing after every successful refresh', function () {
    const props = {...DEFAULT_PROPS, messages: ['a', 'b', 'c']}
    const wrapper = shallow(<Success {...props} />)
    expect(wrapper.state('message')).to.exist()
  })

  it('should render text messages', function () {
    const props = {...DEFAULT_PROPS, messages: ['some-message']}
    const wrapper = shallow(<Success {...props} />)
    expect(wrapper.find(SuccessMessage)).to.have.prop('message', 'some-message')
  })

  it('should render images', function () {
    const props = {...DEFAULT_PROPS, messages: ['http://some-url']}
    const wrapper = shallow(<Success {...props} />)
    expect(wrapper.find(SuccessImage)).to.have.prop('url', 'http://some-url')
  })

  it('should render nothing if there are no success messages', function () {
    const props = {...DEFAULT_PROPS, messages: []}
    const wrapper = shallow(<Success {...props} />)
    expect(wrapper).to.be.blank()
  })
})
