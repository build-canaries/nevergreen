import React from 'react'
import {shallow} from 'enzyme'
import {BaseButton, ButtonTheme} from '../../../../src/client/common/forms/Button'

describe('<Button/>', () => {

  const DEFAULT_PROPS = {
    children: '',
    theme: ButtonTheme.secondary
  }

  describe('accessibility', () => {

    it('should explicitly set the type as the default is "submit"', () => {
      const props = {...DEFAULT_PROPS}
      const wrapper = shallow(<BaseButton {...props} />)
      expect(wrapper.find('button').prop('type')).toEqual('button')
    })
  })
})
