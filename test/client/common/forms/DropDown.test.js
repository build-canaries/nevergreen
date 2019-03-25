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
    expect(wrapper.find('option[value="a"]').text()).toEqual('A')
    expect(wrapper.find('option[value="b"]').text()).toEqual('B')
    expect(wrapper.find('option[value="c"]').text()).toEqual('C')
  })

  it('should render children as the label text allowing it to be styled easily', function () {
    const props = {...DEFAULT_PROPS}
    const wrapper = shallow(<DropDown {...props}>some text</DropDown>)
    expect(wrapper.find('label').text()).toEqual('some text')
  })

  // imported styles are ignored in tests, so we can only test it has the custom class
  it('should add class name to the label allow default styles to be overridden', function () {
    const props = {...DEFAULT_PROPS, className: 'someCustomClass'}
    const wrapper = shallow(<DropDown {...props}>child</DropDown>)
    expect(wrapper.find('label').prop('className')).toContain('someCustomClass')
  })

  describe('accessibility', function () {

    // https://ffoodd.github.io/a11y.css/errors.html#namespace
    it('should generate an id (that does not start with a number) to associate the label and select correctly', function () {
      const props = {...DEFAULT_PROPS}
      const wrapper = shallow(<DropDown {...props} />)
      const label = wrapper.find('label')
      expect(label.prop('htmlFor')).toMatch(/i[0-9]/)
      expect(wrapper.find('select').prop('id')).toEqual(label.prop('htmlFor'))
    })
  })
})
