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
    focus: null
  }

  describe('read only', function () {

    it('should apply the read only attribute', function () {
      const props = {...DEFAULT_PROPS, readOnly: true}
      const wrapper = shallow(<Input {...props} />)
      expect(wrapper.find('input')).to.have.prop('readOnly', true)
    })

    it('should render the read only icon', function () {
      const props = {...DEFAULT_PROPS, readOnly: true}
      const wrapper = shallow(<Input {...props} />)
      expect(wrapper.find(locator('read-only-icon'))).to.be.present()
    })
  })
})
