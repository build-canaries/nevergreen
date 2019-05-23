import React from 'react'
import {mount, shallow} from 'enzyme'
import {ContextualHelp} from '../../../src/client/common/ContextualHelp'
import {Modal} from '../../../src/client/common/Modal'
import {locator} from '../testHelpers'
import ReactModal from 'react-modal'

describe('ContextualHelp', () => {

  const Help = () => <div/>

  const DEFAULT_PROPS = {
    title: '',
    help: <Help/>
  }

  beforeAll(() => {
    ReactModal.setAppElement('body')
  })

  test('should set the title prefixing with "Help"', () => {
    const props = {...DEFAULT_PROPS, title: 'some-title'}
    const wrapper = shallow(<ContextualHelp {...props}>child</ContextualHelp>)
    expect(wrapper.find(Modal).prop('title')).toEqual('Help - some-title')
  })

  // mounting required to trigger hooks correctly
  test('should show the help when the button is clicked', () => {
    const props = {...DEFAULT_PROPS}
    const wrapper = mount(<ContextualHelp {...props}>child</ContextualHelp>)

    expect(wrapper.find(Modal).prop('show')).toBeFalsy()

    wrapper.find(locator('help-button')).at(0).simulate('click')

    expect(wrapper.find(Modal).prop('show')).toBeTruthy()
  })
})
