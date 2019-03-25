import React from 'react'
import {shallow} from 'enzyme'
import {Success} from '../../../src/client/monitor/Success'
import {SuccessMessage} from '../../../src/client/common/SuccessMessage'
import {SuccessImage} from '../../../src/client/monitor/SuccessImage'

describe('Monitor <Success/>', () => {

  const DEFAULT_PROPS = {
    messages: []
  }

  test(
    'should pick a message when constructed to stop it changing after every successful refresh',
    () => {
      const props = {...DEFAULT_PROPS, messages: ['a', 'b', 'c']}
      const wrapper = shallow(<Success {...props} />)
      expect(wrapper.state('message')).toBeDefined()
    }
  )

  test('should render text messages', () => {
    const props = {...DEFAULT_PROPS, messages: ['some-message']}
    const wrapper = shallow(<Success {...props} />)
    expect(wrapper.find(SuccessMessage).prop('message')).toEqual('some-message')
  })

  test('should render images', () => {
    const props = {...DEFAULT_PROPS, messages: ['http://some-url']}
    const wrapper = shallow(<Success {...props} />)
    expect(wrapper.find(SuccessImage).prop('url')).toEqual('http://some-url')
  })

  test('should render nothing if there are no success messages', () => {
    const props = {...DEFAULT_PROPS, messages: []}
    const wrapper = shallow(<Success {...props} />)
    expect(wrapper.isEmptyRender()).toBeTruthy()
  })
})
