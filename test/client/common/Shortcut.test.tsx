import React from 'react'
import {mount} from 'enzyme'
import {Shortcut} from '../../../src/client/common/Shortcut'
import Mousetrap from 'mousetrap'

describe('<Shortcut/>', () => {

  const DEFAULT_PROPS = {
    hotkeys: []
  }

  test('should bind the hot keys on mount', () => {
    jest.spyOn(Mousetrap, 'bind')
    const hotkeys = ['a']
    const props = {...DEFAULT_PROPS, hotkeys}

    mount(<Shortcut {...props} />)

    expect(Mousetrap.bind).toBeCalledWith(hotkeys, expect.any(Function))
  })

  test('should unbind the hot keys on unmount', () => {
    jest.spyOn(Mousetrap, 'unbind')
    const hotkeys = ['a']
    const props = {...DEFAULT_PROPS, hotkeys}

    const wrapper = mount(<Shortcut {...props} />)
    wrapper.unmount()

    expect(Mousetrap.unbind).toBeCalledWith(hotkeys)
  })

  test('should unbind old hot keys and bind new ones if they are different', () => {
    jest.spyOn(Mousetrap, 'bind')
    jest.spyOn(Mousetrap, 'unbind')
    const originalHotkeys = ['a']
    const newHotkeys = ['b']
    const props = {...DEFAULT_PROPS, hotkeys: originalHotkeys}

    const wrapper = mount(<Shortcut {...props} />)
    wrapper.setProps({hotkeys: newHotkeys})

    expect(Mousetrap.unbind).toBeCalledWith(originalHotkeys)
    expect(Mousetrap.bind).toBeCalledWith(newHotkeys, expect.any(Function))
  })

  test('should not do anything if the hot key has not changed', () => {
    jest.spyOn(Mousetrap, 'bind')
    jest.spyOn(Mousetrap, 'unbind')
    const hotkeys = ['a']
    const props = {...DEFAULT_PROPS, hotkeys}

    const wrapper = mount(<Shortcut {...props} />)
    wrapper.setProps({hotkeys})

    expect(Mousetrap.unbind).not.toBeCalled()
    expect(Mousetrap.bind).toHaveBeenCalledTimes(1) // it gets called once on mount
  })

  describe('accessibility', () => {

    // we only add the span to get a ref
    test('should hide the empty span', () => {
      const hotkeys = ['a']
      const props = {...DEFAULT_PROPS, hotkeys}

      const wrapper = mount(<Shortcut {...props} />)

      expect(wrapper.find('span').prop('aria-hidden')).toEqual(true)
    })
  })
})
