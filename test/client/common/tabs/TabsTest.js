import {describe, it} from 'mocha'
import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
import Tabs from '../../../../src/client/common/tabs/Tabs'
import {locator} from '../../TestUtils'

describe('<Tabs/>', function () {

  const DEFAULT_PROPS = {
    children: [],
    titles: []
  }

  it('should switch tabs', function () {
    const props = {...DEFAULT_PROPS, titles: ['a', 'b']}
    const wrapper = shallow(<Tabs {...props} />)
    wrapper.find(locator('tab-b')).simulate('click')
    expect(wrapper).to.have.state('active', 1)
  })

  describe('accessibility', function () {

    it('should include the tab list role on the tab bar', function () {
      const props = {...DEFAULT_PROPS}
      const wrapper = shallow(<Tabs {...props} />)
      expect(wrapper.find(locator('tab-bar'))).to.have.prop('role', 'tablist')
    })

    describe('tab', function () {

      it('should include the tab role', function () {
        const props = {...DEFAULT_PROPS, titles: ['some-title']}
        const wrapper = shallow(<Tabs {...props} />)
        expect(wrapper.find(locator('tab-some-title'))).to.have.prop('role', 'tab')
      })

      it('should indicate if selected', function () {
        const props = {...DEFAULT_PROPS, titles: ['some-title']}
        const wrapper = shallow(<Tabs {...props} />)
        expect(wrapper.find(locator('tab-some-title'))).to.have.prop('aria-selected', true)
      })

      it('should specify what panel it controls', function () {
        const props = {...DEFAULT_PROPS, titles: ['some-title']}
        const wrapper = shallow(<Tabs {...props} />)
        expect(wrapper.find(locator('tab-some-title'))).to.have.prop('aria-controls').that.match(/tab-panel-tabs\d+-0/)
      })
    })

    describe('tab panel', function () {
      const someChild = <div/>

      it('should be focusable as this is helpful if the panel contains no focusable elements', function () {
        const props = {...DEFAULT_PROPS, children: [someChild]}
        const wrapper = shallow(<Tabs {...props} />)
        expect(wrapper.find(locator('tab-panel-0'))).to.have.prop('tabIndex', '0')
      })

      it('should include the tab panel role', function () {
        const props = {...DEFAULT_PROPS, children: [someChild]}
        const wrapper = shallow(<Tabs {...props} />)
        expect(wrapper.find(locator('tab-panel-0'))).to.have.prop('role', 'tabpanel')
      })

      it('should specify which tab is in control', function () {
        const props = {...DEFAULT_PROPS, children: [someChild]}
        const wrapper = shallow(<Tabs {...props} />)
        expect(wrapper.find(locator('tab-panel-0'))).to.have.prop('aria-labelledby').that.match(/tab-tabs\d+-0/)
      })
    })
  })
})
