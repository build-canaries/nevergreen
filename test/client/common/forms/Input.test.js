import React from 'react'
import {shallow} from 'enzyme'
import {Input} from '../../../../src/client/common/forms/Input'
import {locator} from '../../testHelpers'

describe('<Input/>', function () {

  const DEFAULT_PROPS = {
    children: '',
    onEnter: null,
    className: null,
    readOnly: null,
    focus: null
  }

  describe('read only', function () {

    it('should apply the read only attribute', function () {
      const props = {...DEFAULT_PROPS, readOnly: true}
      const wrapper = shallow(<Input {...props} />)
      expect(wrapper.find('input').prop('readOnly')).toBeTruthy()
    })

    it('should render the read only icon', function () {
      const props = {...DEFAULT_PROPS, readOnly: true}
      const wrapper = shallow(<Input {...props} />)
      expect(wrapper.find(locator('read-only-icon')).exists()).toBeTruthy()
    })
  })

  describe('accessibility', function () {

    // https://ffoodd.github.io/a11y.css/errors.html#namespace
    it('should generate an id (that does not start with a number) to associate the label and input correctly', function () {
      const props = {...DEFAULT_PROPS}
      const wrapper = shallow(<Input {...props} />)
      const label = wrapper.find('label')
      expect(label.prop('htmlFor')).toMatch(/i[0-9]/)
      expect(wrapper.find('input').prop('id')).toEqual(label.prop('htmlFor'))
    })

    it('should use the id provided', function () {
      const props = {...DEFAULT_PROPS, id: 'some-id'}
      const wrapper = shallow(<Input {...props} />)
      expect(wrapper.find('label').prop('htmlFor')).toEqual('some-id')
      expect(wrapper.find('input').prop('id')).toEqual('some-id')
    })
  })
})
