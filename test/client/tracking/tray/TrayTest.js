import {describe, it} from 'mocha'
import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
import Tray from '../../../../src/client/tracking/tray/Tray'
import AvailableProjectsContainer from '../../../../src/client/tracking/projects/AvailableProjectsContainer'

describe('<Tray/>', function () {

  const DEFAULT_PROPS = {
    trayId: '',
    index: 1,
    loaded: null,
    name: null,
    url: '',
    highlight: null
  }

  it('should render available projects', function () {
    const props = {...DEFAULT_PROPS}
    const wrapper = shallow(<Tray {...props} />)
    expect(wrapper.find(AvailableProjectsContainer)).to.be.present()
  })
})
