import '../../UnitSpec'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
import Refresh from '../../../../src/client/tracking/projects/Refresh'
import _ from 'lodash'

describe('<Refresh/>', function () {
  const DEFAULT_PROPS = {
    index: 1,
    timestamp: null,
    refreshTray: _.noop
  }

  it('should render projects fetched never if there is no timestamp', function () {
    const props = Object.assign({}, DEFAULT_PROPS, {timestamp: null})
    const wrapper = shallow(<Refresh {...props} />)
    expect(wrapper.find('.tray-refresh-last-fetch')).to.include.text('never')
  })

  it('should render how long ago projects were refreshed if a timestamp is given', function () {
    const props = Object.assign({}, DEFAULT_PROPS, {timestamp: '2017-06-07T21:40:00+01:00'})
    const wrapper = shallow(<Refresh {...props} />)
    expect(wrapper.find('.tray-refresh-last-fetch')).to.include.text('ago')
  })
})
