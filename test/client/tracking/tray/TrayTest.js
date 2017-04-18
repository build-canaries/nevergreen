import '../../UnitSpec'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
import Tray from '../../../../src/client/tracking/tray/Tray'
import AvailableProjectsContainer from '../../../../src/client/tracking/projects/AvailableProjectsContainer'
import Messages from '../../../../src/client/common/messages/Messages'

describe('<Tray/>', function () {
  const DEFAULT_PROPS = {
    trayId: '',
    index: 1,
    loaded: null,
    errors: null,
    name: null,
    url: '',
    highlight: null
  }

  it('should render available projects', function () {
    const props = Object.assign({}, DEFAULT_PROPS, {})
    const wrapper = shallow(<Tray {...props} />)
    expect(wrapper.find(AvailableProjectsContainer)).to.be.present()
  })

  it('should render errors', function () {
    const props = Object.assign({}, DEFAULT_PROPS, {errors: ['some-error']})
    const wrapper = shallow(<Tray {...props} />)
    expect(wrapper.find(Messages)).to.have.prop('messages').that.contains('some-error')
  })
})
