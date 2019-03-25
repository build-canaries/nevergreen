import React from 'react'
import {shallow} from 'enzyme'
import _ from 'lodash'
import {Success} from '../../../src/client/success/Success'
import {AddedMessages} from '../../../src/client/success/AddedMessages'
import {Messages} from '../../../src/client/common/Messages'

describe('Success <Success/>', () => {

  const DEFAULT_PROPS = {
    messages: [],
    addMessage: _.noop,
    removeMessage: _.noop
  }

  test('should show success messages', () => {
    const messages = ['some-message', 'http://some-url']
    const props = {...DEFAULT_PROPS, messages}
    const wrapper = shallow(<Success {...props} />)
    expect(wrapper.find(AddedMessages).prop('messages')).toEqual(messages)
  })

  test('should show a warning if all success messages are removed', () => {
    const props = {...DEFAULT_PROPS, messages: []}
    const wrapper = shallow(<Success {...props} />)
    expect(wrapper.find(Messages).prop('messages')).not.toBeNull()
  })

  test('should not show a warning if at least one success messages exists', () => {
    const props = {...DEFAULT_PROPS, messages: ['some-message']}
    const wrapper = shallow(<Success {...props} />)
    expect(wrapper.find(Messages).prop('messages')).toBeNull()
  })
})
