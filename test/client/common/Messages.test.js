import {locator} from '../testHelpers'
import React from 'react'
import {shallow} from 'enzyme'
import {Messages} from '../../../src/client/common/Messages'

describe('<Messages/>', () => {

  const DEFAULT_PROPS = {
    type: 'error',
    messages: null
  }

  test('should not render anything if messages is null', () => {
    const props = {...DEFAULT_PROPS, messages: null}
    const wrapper = shallow(<Messages {...props} />)
    expect(wrapper.isEmptyRender()).toBeTruthy()
  })

  test('should not render anything if messages is empty', () => {
    const props = {...DEFAULT_PROPS, messages: []}
    const wrapper = shallow(<Messages {...props} />)
    expect(wrapper.isEmptyRender()).toBeTruthy()
  })

  test('should render the messages', () => {
    const props = {...DEFAULT_PROPS, type: 'error', messages: ['some-message', 'another-message']}
    const wrapper = shallow(<Messages {...props} />)
    expect(wrapper.find(locator('error-messages')).text()).toEqual('some-messageanother-message')
  })
})
