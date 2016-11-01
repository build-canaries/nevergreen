import '../../UnitSpec'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
import Tray from '../../../../src/client/tracking/tray/Tray'
import AvailableProjects from '../../../../src/client/tracking/projects/AvailableProjects'
import Messages from '../../../../src/client/common/messages/Messages'

describe('<Tray/>', function () {
  const DEFAULT_PROPS = {
    loaded: null,
    errors: null,
    index: 1,
    trayId: '',
    url: '',
    name: null,
    username: null,
    password: null,
    projects: [],
    timestamp: null,
    selected: [],
    removeTray: () => {
    },
    refreshTray: () => {
    },
    updateTray: () => {
    },
    selectProject: () => {
    }
  }

  it('should render available projects', function () {
    const props = Object.assign({}, DEFAULT_PROPS, {})
    const wrapper = shallow(<Tray {...props} />)
    expect(wrapper.find(AvailableProjects)).to.be.present()
  })

  it('should render errors', function () {
    const props = Object.assign({}, DEFAULT_PROPS, {errors: ['some-error']})
    const wrapper = shallow(<Tray {...props} />)
    expect(wrapper.find(Messages)).to.have.prop('messages').that.contains('some-error')
  })
})
