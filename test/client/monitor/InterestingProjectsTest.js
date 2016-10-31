import '../UnitSpec'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
import InterestingProjects from '../../../src/client/monitor/InterestingProjects'

describe('<InterestingProjects/>', function () {
  const DEFAULT_PROPS = {
    projects: [],
    trays: [],
    showBrokenBuildTimers: null,
    showTrayName: null,
    playBrokenBuildSounds: null,
    brokenBuildFx: null
  }

  it('should render broken build sound fx if its enabled and any project is broken', function () {
    const props = Object.assign({}, DEFAULT_PROPS, {
      projects: [{projectId: 'someId', prognosis: 'sick'}],
      trays: [{someId: {name: 'some-tray-name'}}],
      playBrokenBuildSounds: true,
      brokenBuildFx: 'some-sfx'
    })
    const wrapper = shallow(<InterestingProjects {...props} />)
    expect(wrapper.find('audio')).to.have.attr('src', 'some-sfx')
  })

  it('should not render broken build sound fx if its disabled even if any project is sick', function () {
    const props = Object.assign({}, DEFAULT_PROPS, {
      projects: [{projectId: 'someId', prognosis: 'sick'}],
      trays: [{someId: {name: 'some-tray-name'}}],
      playBrokenBuildSounds: false,
    })
    const wrapper = shallow(<InterestingProjects {...props} />)
    expect(wrapper.find('audio')).to.not.be.present()
  })

  it('should not render broken build sound fx if its enabled but no projects are sick', function () {
    const props = Object.assign({}, DEFAULT_PROPS, {
      projects: [{projectId: 'someId', prognosis: 'healthy'}],
      trays: [{someId: {name: 'some-tray-name'}}],
      playBrokenBuildSounds: false,
    })
    const wrapper = shallow(<InterestingProjects {...props} />)
    expect(wrapper.find('audio')).to.not.be.present()
  })
})
