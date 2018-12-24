import {describe, it} from 'mocha'
import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
import {BaseButton} from '../../../../src/client/common/forms/Button'

describe('<Button/>', function () {

  const DEFAULT_PROPS = {
    children: '',
    style: 'secondary',
    className: null,
    icon: null,
    iconOnly: null
  }
  describe('accessibility', function () {

    it('should explicitly set the type as the default is "submit"', function () {
      const props = {...DEFAULT_PROPS}
      const wrapper = shallow(<BaseButton {...props} />)
      expect(wrapper.find('button')).to.have.prop('type', 'button')
    })
  })
})
