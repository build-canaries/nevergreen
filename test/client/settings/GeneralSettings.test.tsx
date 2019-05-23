import React from 'react'
import {shallow} from 'enzyme'
import {noop} from 'lodash'
import {GeneralSettings} from '../../../src/client/settings/GeneralSettings'
import {locator} from '../testHelpers'

describe('<GeneralSettings/>', () => {

  const DEFAULT_PROPS = {
    refreshTime: 0,
    setRefreshTime: noop,
    validRefreshTimes: [0],
    clickToShowMenu: false,
    setClickToShowMenu: noop
  }

  test('should set the click to show menu setting on click', () => {
    const setClickToShowMenu = jest.fn()
    const props = {...DEFAULT_PROPS, setClickToShowMenu}

    const wrapper = shallow(<GeneralSettings {...props} />)
    const onToggle: (show: boolean) => void = wrapper.find(locator('click-to-show-menu')).prop('onToggle')
    onToggle && onToggle(true)

    expect(setClickToShowMenu).toBeCalledWith(true)
  })
})
