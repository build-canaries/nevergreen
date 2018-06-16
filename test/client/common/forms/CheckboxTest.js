import {describe, it} from 'mocha'
import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
import Checkbox from '../../../../src/client/common/forms/Checkbox'
import _ from 'lodash'
import {mocks} from '../../Mocking'

describe('<Checkbox/>', function () {

  const DEFAULT_PROPS = {
    children: '',
    onToggle: _.noop,
    className: null
  }

  it('should render an input of type checkbox', function () {
    const props = {...DEFAULT_PROPS}
    const wrapper = shallow(<Checkbox {...props} />)
    expect(wrapper.find('input')).to.have.prop('type', 'checkbox')
  })

  it('should call onToggle on change', function () {
    const onToggle = mocks.spy()
    const props = {...DEFAULT_PROPS, onToggle}

    const wrapper = shallow(<Checkbox {...props} />)
    wrapper.find('input').simulate('change', {target: {checked: true}})

    expect(onToggle).to.have.been.calledWith(true)
  })
})
