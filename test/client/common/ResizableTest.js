import {beforeEach, describe, it} from 'mocha'
import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
import {sandbox} from '../Sandbox'
import Resizable from '../../../src/client/common/Resizable'
import _ from 'lodash'

describe('<Resizable/>', function () {

  const props = {
    onResize: _.noop
  }

  beforeEach(function () {
    sandbox.spy(global.window, 'addEventListener')
    sandbox.spy(global.window, 'removeEventListener')
  })

  it('should not render anything as this is only a React component for easy setup/cleanup up on [un]mount', function () {
    const wrapper = shallow(<Resizable {...props} />)
    expect(wrapper).to.be.blank()
  })

  // TODO: can we [easily] verify the resize fn gets registered? It gets wrapped by a debounce call so isn't === to the prop onResize
  it('should register resize fn on initial mount', function () {
    shallow(<Resizable {...props} />)
    expect(global.window.addEventListener).to.have.been.calledWith('resize')
    expect(global.window.removeEventListener).to.not.have.been.called()
  })

  it('should remove resize fn on unmount', function () {
    const wrapper = shallow(<Resizable {...props} />)
    const resizeFn = global.window.addEventListener.args[0][1] // called on mount as verified in the test above

    wrapper.unmount()

    expect(global.window.removeEventListener).to.have.been.calledWith('resize', resizeFn)
  })

  it('should remove old resize fn when receiving new props and add a new one on update', function () {
    const newProps = {onResize: sandbox.spy()}
    const wrapper = shallow(<Resizable {...props} />)

    const originalResizeFn = global.window.addEventListener.args[0][1]

    wrapper.setProps(newProps)

    expect(global.window.removeEventListener).to.have.been.calledWith('resize', originalResizeFn)
    expect(global.window.addEventListener).to.have.been.calledTwice()

    const removedResizeFn = global.window.removeEventListener.args[0][1]
    const updatedResizeFn = global.window.addEventListener.args[1][1]

    expect(removedResizeFn).to.equal(originalResizeFn)
    expect(updatedResizeFn).to.not.equal(originalResizeFn)
  })
})
