import {describe, it} from 'mocha'
import {expect} from 'chai'
import React from 'react'
import {shallow, mount} from 'enzyme'
import {VisuallyHidden} from '../../../src/client/common/VisuallyHidden'
import {childText, locator, withMockedImports} from '../TestUtils'
import {mocks} from '../Mocking'

describe('<Title/>', function () {

  const useForceFocus = mocks.spy()

  const {Title} = withMockedImports('client/common/Title', {
    './ForceFocusHook': {useForceFocus}
  })

  it('should set the document title on mount', function () {
    mount(<Title>some-title</Title>)
    expect(global.document).to.have.property('title', 'some-title')
  })

  it('should set the document title back to default on unmount', function () {
    const wrapper = mount(<Title>some-title</Title>)
    wrapper.unmount()
    expect(global.document).to.have.property('title', 'Nevergreen')
  })

  it('should focus on mount so keyboard users can start tabbing directly into the page and it also makes screen readers announce the title', function () {
    shallow(<Title>some-title</Title>)
    expect(useForceFocus).to.have.been.called()
  })

  it('should not be part of the normal tab flow', function () {
    const wrapper = shallow(<Title>some-title</Title>)
    expect(wrapper.find(locator('title'))).to.have.prop('tabIndex', '-1')
  })

  describe('accessibility', function () {

    it('should have a visually hidden title so screen readers still announce it', function () {
      const wrapper = shallow(<Title>some-title</Title>)
      expect(childText(wrapper, VisuallyHidden)).to.equal('some-title')
    })
  })
})
