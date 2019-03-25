import React from 'react'
import {mount, shallow} from 'enzyme'
import {VisuallyHidden} from '../../../src/client/common/VisuallyHidden'
import {childText, locator} from '../testHelpers'
import {Title} from '../../../src/client/common/Title'
import * as ForceFocusHook from '../../../src/client/common/ForceFocusHook'

describe('<Title/>', () => {

  ForceFocusHook.useForceFocus = jest.fn()

  test('should set the document title on mount', () => {
    mount(<Title>some-title</Title>)
    expect(global.document).toHaveProperty('title', 'some-title')
  })

  test('should set the document title back to default on unmount', () => {
    const wrapper = mount(<Title>some-title</Title>)
    wrapper.unmount()
    expect(global.document).toHaveProperty('title', 'Nevergreen')
  })

  test('should focus on mount so keyboard users can start tabbing directly into the page and it also makes screen readers announce the title', () => {
    shallow(<Title>some-title</Title>)
    expect(ForceFocusHook.useForceFocus).toBeCalled()
  })

  test('should not be part of the normal tab flow', () => {
    const wrapper = shallow(<Title>some-title</Title>)
    expect(wrapper.find(locator('title')).prop('tabIndex')).toEqual('-1')
  })

  describe('accessibility', () => {

    test('should have a visually hidden title so screen readers still announce it', () => {
      const wrapper = shallow(<Title>some-title</Title>)
      expect(childText(wrapper, VisuallyHidden)).toBe('some-title')
    })
  })
})
