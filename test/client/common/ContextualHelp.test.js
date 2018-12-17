import {expect} from 'chai'
import {describe, it} from 'mocha'
import React from 'react'
import {shallow} from 'enzyme'
import {ContextualHelp} from '../../../src/client/common/ContextualHelp'
import {Modal} from '../../../src/client/common/Modal'
import {locator} from '../TestUtils'

describe('ContextualHelp', function () {

  const DEFAULT_PROPS = {
    title: '',
    help: <div/>,
    className: null
  }

  it('should set the title prefixing with "Help"', function () {
    const props = {...DEFAULT_PROPS, title: 'some-title'}
    const wrapper = shallow(<ContextualHelp {...props}>child</ContextualHelp>)
    expect(wrapper.find(Modal)).to.have.prop('title', 'Help - some-title')
  })

  it('should show the help when the button is clicked', function () {
    const props = {...DEFAULT_PROPS}

    const wrapper = shallow(<ContextualHelp {...props}>child</ContextualHelp>)

    expect(wrapper.find(Modal)).to.have.prop('show', false)

    wrapper.find(locator('help-button')).simulate('click')

    expect(wrapper.find(Modal)).to.have.prop('show', true)
  })
})
