import React from 'react'
import {shallow} from 'enzyme'
import {ExternalLink} from '../../../src/client/common/ExternalLink'
import {VisuallyHidden} from '../../../src/client/common/VisuallyHidden'
import {childText} from '../testHelpers'

describe('<ExternalLink/>', () => {

  const DEFAULT_PROPS = {
    children: ''
  }

  test('should have the correct target', () => {
    const props = {...DEFAULT_PROPS}
    const wrapper = shallow(<ExternalLink {...props}>child</ExternalLink>)
    expect(wrapper.find('a').prop('target')).toEqual('_blank')
  })

  // https://mathiasbynens.github.io/rel-noopener/
  test('should defend against "reverse tabnabbing"', () => {
    const props = {...DEFAULT_PROPS}
    const wrapper = shallow(<ExternalLink {...props}>child</ExternalLink>)
    expect(wrapper.find('a').prop('rel')).toEqual('noopener noreferrer')
  })

  describe('accessibility', () => {

    test('should indicate it opens in a new window', () => {
      const props = {...DEFAULT_PROPS}
      const wrapper = shallow(<ExternalLink {...props}>child</ExternalLink>)
      expect(childText(wrapper, VisuallyHidden)).toBe(' (opens in a new window)')
    })
  })
})
