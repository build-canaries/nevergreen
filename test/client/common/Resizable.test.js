import React from 'react'
import {shallow} from 'enzyme'
import {Resizable} from '../../../src/client/common/Resizable'
import _ from 'lodash'

describe('<Resizable/>', () => {

  window.addEventListener = jest.fn()
  window.removeEventListener = jest.fn()

  const props = {
    onResize: _.noop
  }

  test('should not render anything as this is only a React component for easy setup/cleanup up on [un]mount', () => {
      const wrapper = shallow(<Resizable {...props} />)
      expect(wrapper.isEmptyRender()).toBeTruthy()
    }
  )

  // TODO: can we [easily] verify the resize fn gets registered? It gets wrapped by a debounce call so isn't === to the prop onResize
  test('should register resize fn on initial mount', () => {
    shallow(<Resizable {...props} />)
    expect(window.addEventListener).toBeCalledWith('resize', expect.any(Function))
    expect(window.removeEventListener).not.toBeCalled()
  })

  test('should remove resize fn on unmount', () => {
    const wrapper = shallow(<Resizable {...props} />)
    const resizeFn = window.addEventListener.mock.calls[0][1] // called on mount as verified in the test above

    wrapper.unmount()

    expect(window.removeEventListener).toBeCalledWith('resize', resizeFn)
  })

  test('should remove old resize fn when receiving new props and add a new one on update', () => {
      const newProps = {onResize: jest.fn()}
      const wrapper = shallow(<Resizable {...props} />)

      const originalResizeFn = window.addEventListener.mock.calls[0][1]

      wrapper.setProps(newProps)

      expect(window.removeEventListener).toBeCalledWith('resize', originalResizeFn)
      expect(window.addEventListener.mock.calls).toHaveLength(2)

      const removedResizeFn = window.removeEventListener.mock.calls[0][1]
      const updatedResizeFn = window.addEventListener.mock.calls[1][1]

      expect(removedResizeFn).toBe(originalResizeFn)
      expect(updatedResizeFn).not.toBe(originalResizeFn)
    }
  )
})
