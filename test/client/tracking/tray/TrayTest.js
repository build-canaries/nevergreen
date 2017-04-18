import '../../UnitSpec'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
import Tray from '../../../../src/client/tracking/tray/Tray'
import AvailableProjectsContainer from '../../../../src/client/tracking/projects/AvailableProjectsContainer'
import Messages from '../../../../src/client/common/messages/Messages'
import sinon from 'sinon'
import _ from 'lodash'

describe('<Tray/>', function () {
  const DEFAULT_PROPS = {
    trayId: '',
    index: 1,
    loaded: null,
    errors: null,
    name: null,
    url: '',
    highlight: null,
    clearTrayHighlight: _.noop
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

  it('should clear the highlight on unmount to stop it happening again if the user switches back and forth between tabs', function () {
    const clearTrayHighlight = sinon.spy()
    const props = Object.assign({}, DEFAULT_PROPS, {highlight: true, clearTrayHighlight})
    new Tray(props).componentWillUnmount()
    expect(clearTrayHighlight).to.have.been.called
  })
})
