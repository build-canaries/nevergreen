import React from 'react'
import {shallow} from 'enzyme'
import {Container} from '../../../src/client/common/Container'
import {locator, pressKeyOn} from '../testHelpers'

describe('<Container/>', () => {

  const DEFAULT_PROPS = {
    children: null,
    title: '',
    subTitle: null,
    className: null,
    hidden: null,
    highlight: null
  }

  test('should include the given title', () => {
    const props = {...DEFAULT_PROPS, title: 'some-title'}
    const wrapper = shallow(<Container {...props} />)
    expect(wrapper.find(locator('container-title')).text()).toEqual('some-title')
  })

  test('should include the given sub title', () => {
    const props = {...DEFAULT_PROPS, subTitle: 'some-sub-title'}
    const wrapper = shallow(<Container {...props} />)
    expect(wrapper.find(locator('container-sub-title')).text()).toEqual('some-sub-title')
  })

  test('should not include a sub title if one is not given', () => {
    const props = {...DEFAULT_PROPS, subTitle: null}
    const wrapper = shallow(<Container {...props} />)
    expect(wrapper.find(locator('container-sub-title')).exists()).toBeFalsy()
  })

  test('should show the body when not hidden', () => {
    const props = {...DEFAULT_PROPS, hidden: false}
    const wrapper = shallow(<Container {...props} />)
    expect(wrapper.find(locator('body')).exists()).toBeTruthy()
  })

  test(
    'should render the body when hidden as it is hidden via css',
    () => {
      const props = {...DEFAULT_PROPS, hidden: true}
      const wrapper = shallow(<Container {...props} />)
      expect(wrapper.find(locator('body')).exists()).toBeTruthy()
    }
  )

  test('should toggle visibility when clicking the title bar', () => {
    const props = {...DEFAULT_PROPS, hidden: true}
    const wrapper = shallow(<Container {...props} />)
    wrapper.find(locator('title-bar')).simulate('click')
    expect(wrapper.find(locator('body')).exists()).toBeTruthy()
  })

  test(
    'should toggle visibility when pressing the enter key when the title bar has focus',
    () => {
      const props = {...DEFAULT_PROPS, hidden: true}
      const wrapper = shallow(<Container {...props} />)
      pressKeyOn(wrapper.find(locator('title-bar')), 'Enter')
      expect(wrapper.find(locator('body')).exists()).toBeTruthy()
    }
  )

  test(
    'should toggle visibility when pressing the space key when the title bar has focus',
    () => {
      const props = {...DEFAULT_PROPS, hidden: true}
      const wrapper = shallow(<Container {...props} />)
      pressKeyOn(wrapper.find(locator('title-bar')), ' ')
      expect(wrapper.find(locator('body')).exists()).toBeTruthy()
    }
  )

  describe('accessibility', () => {

    test('should have a focusable title bar', () => {
      const props = {...DEFAULT_PROPS}
      const wrapper = shallow(<Container {...props} />)
      expect(wrapper.find(locator('title-bar')).prop('tabIndex')).toEqual('0')
    })

    test('should have the button role', () => {
      const props = {...DEFAULT_PROPS}
      const wrapper = shallow(<Container {...props} />)
      expect(wrapper.find(locator('title-bar')).prop('role')).toEqual('button')
    })

    test(
      'should have a label describing what action click will perform',
      () => {
        const props = {...DEFAULT_PROPS, title: 'some-title', initiallyHidden: false}
        const wrapper = shallow(<Container {...props} />)
        expect(wrapper.find(locator('title-bar')).prop('aria-label')).toEqual('hide section some-title')
      }
    )

    test(
      'should have a label describing what action click will perform (when hidden)',
      () => {
        const props = {...DEFAULT_PROPS, title: 'some-title', initiallyHidden: true}
        const wrapper = shallow(<Container {...props} />)
        expect(wrapper.find(locator('title-bar')).prop('aria-label')).toEqual('show section some-title')
      }
    )
  })
})
