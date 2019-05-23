import React from 'react'
import {shallow} from 'enzyme'
import {Tab, TabPanel, Tabs as ReactTabs} from 'react-tabs'
import {Tabs} from '../../../src/client/common/Tabs'

describe('<Tabs/>', () => {

  const DEFAULT_PROPS = {
    titles: []
  }

  test('should call onSwitch after switching tabs', () => {
    const onSwitch = jest.fn()
    const props = {...DEFAULT_PROPS, titles: ['a'], onSwitch}
    const wrapper = shallow(<Tabs {...props}>{[<div key='a'/>]}</Tabs>)
    wrapper.find(ReactTabs).simulate('select')
    expect(onSwitch).toBeCalled()
  })

  test('should render the correct number of tabs and panels', () => {
    const props = {...DEFAULT_PROPS, titles: ['a', 'b']}
    const wrapper = shallow(<Tabs {...props}>{[<div key='a'/>, <div key='b'/>]}</Tabs>)
    expect(wrapper.find(Tab)).toHaveLength(2)
    expect(wrapper.find(TabPanel)).toHaveLength(2)
  })
})
