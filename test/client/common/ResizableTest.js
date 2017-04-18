import '../UnitSpec'
import {after, before, beforeEach, describe, it} from 'mocha'
import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
import sinon from 'sinon'
import Resizable from '../../../src/client/common/Resizable'
import _ from 'lodash'

describe('<Resizable/>', function () {
  const props = {onResize: _.noop}
  let originalWindow

  before(function () {
    originalWindow = global.window
    global.window = {
      addEventListener: sinon.spy(),
      removeEventListener: sinon.spy()
    }
  })

  after(function () {
    global.window = originalWindow
  })

  beforeEach(function () {
    global.window.addEventListener.reset()
    global.window.removeEventListener.reset()
  })

  it('should render null', function () {
    const wrapper = shallow(<Resizable {...props} />)
    expect(wrapper.get(0)).to.be.null
  })

  it('should add event listener on mount', function () {
    new Resizable(props).componentDidMount()
    expect(global.window.addEventListener).to.have.been.calledWith('resize', props.onResize)
    expect(global.window.removeEventListener).to.not.have.been.called
  })

  it('should remove event listener on unmount', function () {
    new Resizable(props).componentWillUnmount()
    expect(global.window.removeEventListener).to.have.been.calledWith('resize', props.onResize)
    expect(global.window.addEventListener).to.not.have.been.called
  })

  it('should remove old event listener on update and add the new one', function () {
    const previousProps = {onResize: sinon.spy()}
    new Resizable(props).componentDidUpdate(previousProps)
    expect(global.window.removeEventListener).to.have.been.calledWith('resize', previousProps.onResize)
    expect(global.window.addEventListener).to.have.been.calledWith('resize', props.onResize)
  })
})
