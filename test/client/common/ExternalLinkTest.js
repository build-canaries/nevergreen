import {describe, it} from 'mocha'
import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
import {ExternalLink} from '../../../src/client/common/ExternalLink'
import {VisuallyHidden} from '../../../src/client/common/VisuallyHidden'
import {childText} from '../TestUtils'

describe('<ExternalLink/>', function () {

  const DEFAULT_PROPS = {
    children: ''
  }

  it('should have the correct target', function () {
    const props = {...DEFAULT_PROPS}
    const wrapper = shallow(<ExternalLink {...props}>child</ExternalLink>)
    expect(wrapper.find('a')).to.have.prop('target', '_blank')
  })

  // https://mathiasbynens.github.io/rel-noopener/
  it('should defend against "reverse tabnabbing"', function () {
    const props = {...DEFAULT_PROPS}
    const wrapper = shallow(<ExternalLink {...props}>child</ExternalLink>)
    expect(wrapper.find('a')).to.have.prop('rel', 'noopener noreferrer')
  })

  describe('accessibility', function () {

    it('should indicate it opens in a new window', function () {
      const props = {...DEFAULT_PROPS}
      const wrapper = shallow(<ExternalLink {...props}>child</ExternalLink>)
      expect(childText(wrapper, VisuallyHidden)).to.have.text(' (opens in a new window)')
    })
  })
})
