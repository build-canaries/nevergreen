import {describe, it} from 'mocha'
import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
import Title from '../../../src/client/common/Title'
import VisuallyHidden from '../../../src/client/common/VisuallyHidden'
import {childText} from '../TestUtils'

describe('<Title/>', function () {

  const DEFAULT_PROPS = {
    children: ''
  }

  it('should set the document title on mount', function () {
    const props = {...DEFAULT_PROPS, children: 'some-title'}
    shallow(<Title {...props} />)
    expect(global.document).to.have.property('title', 'some-title')
  })

  it('should set the document title back to default on unmount', function () {
    const props = {...DEFAULT_PROPS, children: 'some-title'}
    const wrapper = shallow(<Title {...props} />)
    wrapper.unmount()
    expect(global.document).to.have.property('title', 'Nevergreen')
  })

  describe('accessibility', function () {

    it('should have a visually hidden title', function () {
      const props = {...DEFAULT_PROPS, children: 'some-title'}
      const wrapper = shallow(<Title {...props} />)
      expect(childText(wrapper, VisuallyHidden)).to.have.text('some-title')
    })
  })
})
