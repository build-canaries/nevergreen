import {describe, it} from 'mocha'
import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
import {Container} from '../../../../src/client/common/container/Container'
import {locator, pressKeyOn} from '../../TestUtils'

describe('<Container/>', function () {

  const DEFAULT_PROPS = {
    children: null,
    title: '',
    subTitle: null,
    className: null,
    hidden: null,
    highlight: null
  }

  it('should include the given title', function () {
    const props = {...DEFAULT_PROPS, title: 'some-title'}
    const wrapper = shallow(<Container {...props} />)
    expect(wrapper.find(locator('title'))).to.have.text('some-title')
  })

  it('should include the given sub title', function () {
    const props = {...DEFAULT_PROPS, subTitle: 'some-sub-title'}
    const wrapper = shallow(<Container {...props} />)
    expect(wrapper.find(locator('sub-title'))).to.have.text('some-sub-title')
  })

  it('should not include a sub title if one is not given', function () {
    const props = {...DEFAULT_PROPS, subTitle: null}
    const wrapper = shallow(<Container {...props} />)
    expect(wrapper.find(locator('sub-title'))).to.not.be.present()
  })

  it('should show the body when not hidden', function () {
    const props = {...DEFAULT_PROPS, hidden: false}
    const wrapper = shallow(<Container {...props} />)
    expect(wrapper.find(locator('body'))).to.be.present()
  })

  it('should not show the body when hidden', function () {
    const props = {...DEFAULT_PROPS, hidden: true}
    const wrapper = shallow(<Container {...props} />)
    expect(wrapper.find(locator('body'))).to.not.be.present()
  })

  it('should toggle visibility when clicking the title bar', function () {
    const props = {...DEFAULT_PROPS, hidden: true}
    const wrapper = shallow(<Container {...props} />)
    wrapper.find(locator('title-bar')).simulate('click')
    expect(wrapper.find(locator('body'))).to.be.present()
  })

  it('should toggle visibility when pressing the enter key when the title bar has focus', function () {
    const props = {...DEFAULT_PROPS, hidden: true}
    const wrapper = shallow(<Container {...props} />)
    pressKeyOn(wrapper.find(locator('title-bar')), 'Enter')
    expect(wrapper.find(locator('body'))).to.be.present()
  })

  it('should toggle visibility when pressing the space key when the title bar has focus', function () {
    const props = {...DEFAULT_PROPS, hidden: true}
    const wrapper = shallow(<Container {...props} />)
    pressKeyOn(wrapper.find(locator('title-bar')), ' ')
    expect(wrapper.find(locator('body'))).to.be.present()
  })

  describe('accessibility', function () {

    it('should have a focusable title bar', function () {
      const props = {...DEFAULT_PROPS}
      const wrapper = shallow(<Container {...props} />)
      expect(wrapper.find(locator('title-bar'))).to.have.prop('tabIndex', '0')
    })

    it('should have the button role', function () {
      const props = {...DEFAULT_PROPS}
      const wrapper = shallow(<Container {...props} />)
      expect(wrapper.find(locator('title-bar'))).to.have.prop('role', 'button')
    })

    it('should have a label describing what action click will perform', function () {
      const props = {...DEFAULT_PROPS, title: 'some-title', hidden: false}
      const wrapper = shallow(<Container {...props} />)
      expect(wrapper.find(locator('title-bar'))).to.have.prop('aria-label', 'hide section some-title')
    })

    it('should have a label describing what action click will perform (when hidden)', function () {
      const props = {...DEFAULT_PROPS, title: 'some-title', hidden: true}
      const wrapper = shallow(<Container {...props} />)
      expect(wrapper.find(locator('title-bar'))).to.have.prop('aria-label', 'show section some-title')
    })
  })
})
