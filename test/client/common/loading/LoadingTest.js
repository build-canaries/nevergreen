import '../../UnitSpec'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
import Loading from '../../../../src/client/common/loading/Loading'

describe('<Loading/>', function () {
  const DEFAULT_PROPS = {
    children: null,
    loaded: null
  }

  it('should render loading if loaded is null', function () {
    const props = Object.assign({}, DEFAULT_PROPS, {loaded: null})
    const wrapper = shallow(<Loading {...props} />)
    expect(wrapper.find('.loading')).to.be.present()
  })

  it('should render loading if loaded is false', function () {
    const props = Object.assign({}, DEFAULT_PROPS, {loaded: false})
    const wrapper = shallow(<Loading {...props} />)
    expect(wrapper.find('.loading')).to.be.present()
  })

  it('should render children if loaded is true', function () {
    const props = Object.assign({}, DEFAULT_PROPS, {loaded: true, children: <div className='child'/>})
    const wrapper = shallow(<Loading {...props} />)
    expect(wrapper.find('.child')).to.be.present()
  })
})
