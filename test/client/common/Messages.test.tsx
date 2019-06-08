import {locator} from '../testHelpers'
import React from 'react'
import {shallow} from 'enzyme'
import {Messages, MessagesProps, MessagesType} from '../../../src/client/common/Messages'

describe('<Messages/>', () => {

  test('should not render anything if messages is empty', () => {
    const props: MessagesProps = {type: MessagesType.ERROR, messages: []}
    const wrapper = shallow(<Messages {...props} />)
    expect(wrapper.isEmptyRender()).toBeTruthy()
  })

  test('should render the messages', () => {
    const props: MessagesProps = {type: MessagesType.ERROR, messages: ['some-message', 'another-message']}
    const wrapper = shallow(<Messages {...props} />)
    expect(wrapper.find(locator('error-messages')).text()).toEqual('some-messageanother-message')
  })
})
