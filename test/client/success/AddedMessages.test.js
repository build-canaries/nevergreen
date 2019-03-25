import {locator} from '../testHelpers'
import React from 'react'
import {shallow} from 'enzyme'
import _ from 'lodash'
import {AddedMessages} from '../../../src/client/success/AddedMessages'
import {SuccessMessage} from '../../../src/client/common/SuccessMessage'

describe('<AddedMessages/>', () => {

  const DEFAULT_PROPS = {
    messages: [],
    removeMessage: _.noop
  }

  test('should render nothing if messages is empty', () => {
    const props = {...DEFAULT_PROPS, messages: []}
    const wrapper = shallow(<AddedMessages {...props} />)
    expect(wrapper.get(0)).toBeNull()
  })

  test('should render text messages', () => {
    const props = {...DEFAULT_PROPS, messages: ['some-message']}
    const wrapper = shallow(<AddedMessages {...props} />)
    expect(wrapper.find(SuccessMessage).prop('message')).toEqual( 'some-message')
  })

  test('should render images', () => {
    const props = {...DEFAULT_PROPS, messages: ['https://some-url']}
    const wrapper = shallow(<AddedMessages {...props} />)
    expect(wrapper.find(locator('success-image')).prop('src')).toEqual( 'https://some-url')
  })
})
