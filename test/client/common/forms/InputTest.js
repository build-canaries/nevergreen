import {describe, it} from 'mocha'
import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
import {Input} from '../../../../src/client/common/forms/Input'
import {locator} from '../../TestUtils'

describe('<Input/>', function () {

  const DEFAULT_PROPS = {
    children: '',
    onEnter: null,
    className: null,
    readOnly: null,
    focus: null,
    type: null
  }

  describe('read only', function () {

    it('should not allow keyboard focus', function () {
      const props = {...DEFAULT_PROPS, readOnly: true}
      const wrapper = shallow(<Input {...props} />)
      expect(wrapper.find('input')).to.have.prop('tabIndex', -1)
    })

    it('should render the read only icon', function () {
      const props = {...DEFAULT_PROPS, readOnly: true}
      const wrapper = shallow(<Input {...props} />)
      expect(wrapper.find(locator('read-only-icon'))).to.be.present()
    })
  })

  describe('password', function () {

    describe('hidden', function () {

      it('should have the password type', function () {
        const props = {...DEFAULT_PROPS, type: 'password'}
        const wrapper = shallow(<Input {...props} />)
        expect(wrapper.find('input')).to.have.prop('type', 'password')
      })

      it('should render the show password button', function () {
        const props = {...DEFAULT_PROPS, type: 'password'}
        const wrapper = shallow(<Input {...props} />)
        expect(wrapper.find(locator('show-password'))).to.be.present()
      })
    })

    describe('shown', function () {

      it('should have the text type', function () {
        const props = {...DEFAULT_PROPS, type: 'password'}
        const wrapper = shallow(<Input {...props} />)
        wrapper.find(locator('show-password')).simulate('click')
        expect(wrapper.find('input')).to.have.prop('type', 'text')
      })

      it('should render the hide password button', function () {
        const props = {...DEFAULT_PROPS, type: 'password'}
        const wrapper = shallow(<Input {...props} />)
        wrapper.find(locator('show-password')).simulate('click')
        expect(wrapper.find(locator('hide-password'))).to.be.present()
      })
    })
  })
})
