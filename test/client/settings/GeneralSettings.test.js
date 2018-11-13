import {describe, it} from 'mocha'
import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
import _ from 'lodash'
import {mocks} from '../Mocking'
import {GeneralSettings} from '../../../src/client/settings/GeneralSettings'
import {locator} from '../TestUtils'

describe('<GeneralSettings/>', function () {

  const DEFAULT_PROPS = {
    refreshTime: 0,
    setRefreshTime: _.noop,
    validRefreshTimes: [0],
    clickToShowMenu: false,
    setClickToShowMenu: _.noop
  }

  it('should set the click to show menu setting on click', function () {
    const setClickToShowMenu = mocks.spy()
    const props = {...DEFAULT_PROPS, setClickToShowMenu}

    const wrapper = shallow(<GeneralSettings {...props} />)
    wrapper.find(locator('click-to-show-menu')).prop('onToggle')(true)

    expect(setClickToShowMenu).to.have.been.calledWith(true)
  })
})
