import {describe, it} from 'mocha'
import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
import {DropDown} from '../../../../src/client/common/forms/DropDown'

describe('<DropDown/>', function () {

  const DEFAULT_PROPS = {
    children: '',
    options: [],
    className: null
  }

  it('should add all the given options', function () {
    const options = [
      {value: 'a', display: 'A'},
      {value: 'b', display: 'B'},
      {value: 'c', display: 'C'}
    ]
    const props = {...DEFAULT_PROPS, options}
    const wrapper = shallow(<DropDown {...props}>child</DropDown>)
    expect(wrapper.find('option[value="a"]')).to.have.text('A')
    expect(wrapper.find('option[value="b"]')).to.have.text('B')
    expect(wrapper.find('option[value="c"]')).to.have.text('C')
  })

  it('should render children as the label text allowing it to be styled easily', function () {
    const props = {...DEFAULT_PROPS}
    const wrapper = shallow(<DropDown {...props}>some text</DropDown>)
    expect(wrapper.find('label')).to.have.text('some text')
  })

  // imported styles are ignored in tests, so we can only test it has the custom class
  it('should add class name to the label allow default styles to be overridden', function () {
    const props = {...DEFAULT_PROPS, className: 'someCustomClass'}
    const wrapper = shallow(<DropDown {...props}>child</DropDown>)
    expect(wrapper.find('label')).to.have.prop('className', 'someCustomClass')
  })
})
