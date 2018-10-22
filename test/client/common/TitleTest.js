import {describe, it} from 'mocha'
import {expect} from 'chai'
import React from 'react'
import {mount, shallow} from 'enzyme'
import {Title} from '../../../src/client/common/Title'
import {VisuallyHidden} from '../../../src/client/common/VisuallyHidden'
import {childText, locator} from '../TestUtils'
import {mocks} from '../Mocking'

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

  it('should have a visually hidden title for accessibility', function () {
    const props = {...DEFAULT_PROPS, children: 'some-title'}
    const wrapper = shallow(<Title {...props} />)
    expect(childText(wrapper, VisuallyHidden)).to.have.text('some-title')
  })

  it('should focus on mount so keyboard users can start tabbing directly into the page and it also makes screen readers announce the title', function () {
    const props = {...DEFAULT_PROPS, children: 'some-title'}

    const wrapper = mount(<Title {...props} />)
    const {titleNode} = wrapper.instance()
    const focus = mocks.spy(titleNode.current, 'focus')
    wrapper.instance().componentDidMount() // need to call this again now we are spying on focus

    expect(focus).to.have.been.called()
  })

  it('should not be part of the normal tab flow', function () {
    const props = {...DEFAULT_PROPS, children: 'some-title'}
    const wrapper = shallow(<Title {...props} />)
    expect(wrapper.find(locator('title'))).to.have.prop('tabIndex', '-1')
  })
})
