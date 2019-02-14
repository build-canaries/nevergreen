import {describe, it} from 'mocha'
import {expect} from 'chai'
import React from 'react'
import {shallow, mount} from 'enzyme'
import {Input} from '../../../../src/client/common/forms/Input'
import {Password} from '../../../../src/client/common/forms/Password'

describe('<Password/>', function () {

  const DEFAULT_PROPS = {
    children: ''
  }

  it('should have the password type by default', function () {
    const props = {...DEFAULT_PROPS}
    const wrapper = shallow(<Password {...props} />)
    expect(wrapper.find(Input)).to.have.prop('type', 'password')
  })

  it('should allow the password to be shown', function () {
    const props = {...DEFAULT_PROPS}
    const wrapper = mount(<Password {...props} />)
    wrapper.find('button').simulate('click')
    expect(wrapper.find(Input)).to.have.prop('type', 'text')
  })
})
