import React from 'react'
import {shallow} from 'enzyme'
import _ from 'lodash'
import {GeneralSettings} from '../../../src/client/settings/GeneralSettings'
import {locator} from '../testHelpers'

describe('<GeneralSettings/>', () => {

  const DEFAULT_PROPS = {
    refreshTime: 0,
    setRefreshTime: _.noop,
    validRefreshTimes: [0],
    clickToShowMenu: false,
    setClickToShowMenu: _.noop
  }

  test('should set the click to show menu setting on click', () => {
    const setClickToShowMenu = jest.fn()
    const props = {...DEFAULT_PROPS, setClickToShowMenu}

    const wrapper = shallow(<GeneralSettings {...props} />)
    wrapper.find(locator('click-to-show-menu')).prop('onToggle')(true)

    expect(setClickToShowMenu).toBeCalledWith(true)
  })
})
