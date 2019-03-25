import React from 'react'
import {shallow} from 'enzyme'
import _ from 'lodash'
import {Checkbox} from '../../../../src/client/common/forms/Checkbox'

describe('<Checkbox/>', function () {

  const DEFAULT_PROPS = {
    children: '',
    onToggle: _.noop,
    className: null
  }

  it('should render an input of type checkbox', function () {
    const props = {...DEFAULT_PROPS}
    const wrapper = shallow(<Checkbox {...props} />)
    expect(wrapper.find('input').prop('type')).toEqual('checkbox')
  })

  it('should call onToggle on change', function () {
    const onToggle = jest.fn()
    const props = {...DEFAULT_PROPS, onToggle}

    const wrapper = shallow(<Checkbox {...props} />)
    wrapper.find('input').simulate('change', {target: {checked: true}})

    expect(onToggle).toBeCalledWith(true)
  })
})
