import {locator} from '../testHelpers'
import React from 'react'
import {shallow} from 'enzyme'
import {Loading} from '../../../src/client/common/Loading'

describe('<Loading/>', () => {

  const DEFAULT_PROPS = {
    children: null,
    loaded: null
  }

  test('should render loading if loaded is not given', () => {
    const props = {...DEFAULT_PROPS, loaded: undefined}
    const wrapper = shallow(<Loading {...props} />)
    expect(wrapper.find(locator('loading')).exists()).toBeTruthy()
  })

  test('should render loading if loaded is false', () => {
    const props = {...DEFAULT_PROPS, loaded: false}
    const wrapper = shallow(<Loading {...props} />)
    expect(wrapper.find(locator('loading')).exists()).toBeTruthy()
  })

  test('should render children if loaded is true', () => {
    const props = {...DEFAULT_PROPS, loaded: true, children: <div className='child'/>}
    const wrapper = shallow(<Loading {...props} />)
    expect(wrapper.find('.child').exists()).toBeTruthy()
  })
})
