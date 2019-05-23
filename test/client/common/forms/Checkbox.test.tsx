import React from 'react'
import {shallow} from 'enzyme'
import {noop} from 'lodash'
import {Checkbox} from '../../../../src/client/common/forms/Checkbox'

describe('<Checkbox/>', () => {

  const DEFAULT_PROPS = {
    children: '',
    onToggle: noop
  }

  it('should render an input of type checkbox', () => {
    const props = {...DEFAULT_PROPS}
    const wrapper = shallow(<Checkbox {...props} />)
    expect(wrapper.find('input').prop('type')).toEqual('checkbox')
  })

  it('should call onToggle on change', () => {
    const onToggle = jest.fn()
    const props = {...DEFAULT_PROPS, onToggle}

    const wrapper = shallow(<Checkbox {...props} />)
    wrapper.find('input').simulate('change', {target: {checked: true}})

    expect(onToggle).toBeCalledWith(true)
  })
})
