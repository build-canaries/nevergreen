import {describe, it} from 'mocha'
import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
import {Tab, TabPanel, Tabs as ReactTabs} from 'react-tabs'
import {Tabs} from '../../../../src/client/common/tabs/Tabs'
import {mocks} from '../../Mocking'

describe('<Tabs/>', function () {

  const DEFAULT_PROPS = {
    titles: [],
    onSwitch: null
  }

  it('should call onSwitch after switching tabs', function () {
    const onSwitch = mocks.spy()
    const props = {...DEFAULT_PROPS, titles: ['a'], onSwitch}
    const wrapper = shallow(<Tabs {...props}>{[<div key='a'/>]}</Tabs>)
    wrapper.find(ReactTabs).simulate('select')
    expect(onSwitch).to.have.been.called()
  })

  it('should render the correct number of tabs and panels', function () {
    const props = {...DEFAULT_PROPS, titles: ['a', 'b']}
    const wrapper = shallow(<Tabs {...props}>{[<div key='a'/>, <div key='b'/>]}</Tabs>)
    expect(wrapper.find(Tab)).to.have.length(2)
    expect(wrapper.find(TabPanel)).to.have.length(2)
  })
})
