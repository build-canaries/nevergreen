import {describe, it} from 'mocha'
import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
import InterestingProjects from '../../../src/client/monitor/InterestingProjects'

describe('<InterestingProjects/>', function () {

  const DEFAULT_PROPS = {
    projects: null,
    trays: [],
    showBuildTimers: null,
    showBrokenBuildTimers: null,
    showTrayName: null,
    playBrokenBuildSounds: null,
    brokenBuildFx: null,
    showBuildLabel: null
  }

  it('should render broken build sound fx if its enabled and any project is broken', function () {
    const props = {
      ...DEFAULT_PROPS,
      projects: [{projectId: 'someId', prognosis: 'sick', name: '', lastBuildTime: '', trayId: 'someId'}],
      trays: [{name: 'some-tray-name', trayId: 'someId'}],
      playBrokenBuildSounds: true,
      brokenBuildFx: 'some-sfx'
    }
    const wrapper = shallow(<InterestingProjects {...props} />)
    expect(wrapper.find('audio')).to.have.attr('src', 'some-sfx')
  })

  it('should not render broken build sound fx if its disabled even if any project is sick', function () {
    const props = {
      ...DEFAULT_PROPS,
      projects: [{projectId: 'someId', prognosis: 'sick', name: '', lastBuildTime: '', trayId: 'someId'}],
      trays: [{name: 'some-tray-name', trayId: 'someId'}],
      playBrokenBuildSounds: false
    }
    const wrapper = shallow(<InterestingProjects {...props} />)
    expect(wrapper.find('audio')).to.not.be.present()
  })

  it('should not render broken build sound fx if its enabled but no projects are sick', function () {
    const props = {
      ...DEFAULT_PROPS,
      projects: [{projectId: 'someId', prognosis: 'unknown', name: '', lastBuildTime: '', trayId: 'someId'}],
      trays: [{name: 'some-tray-name', trayId: 'someId'}],
      playBrokenBuildSounds: false
    }
    const wrapper = shallow(<InterestingProjects {...props} />)
    expect(wrapper.find('audio')).to.not.be.present()
  })

  it('should not render broken build sound fx if its enabled but a sound fx has not been set', function () {
    const props = {
      ...DEFAULT_PROPS,
      projects: [{projectId: 'someId', prognosis: 'sick', name: '', lastBuildTime: '', trayId: 'someId'}],
      trays: [{name: 'some-tray-name', trayId: 'someId'}],
      playBrokenBuildSounds: true,
      brokenBuildFx: null
    }
    const wrapper = shallow(<InterestingProjects {...props} />)
    expect(wrapper.find('audio')).to.not.be.present()
  })
})
