import {describe, it} from 'mocha'
import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
import Monitor from '../../../src/client/monitor/Monitor'
import InterestingProjects from '../../../src/client/monitor/InterestingProjects'
import Success from '../../../src/client/monitor/Success'
import noop from 'lodash/noop'

describe('<Monitor/>', function () {
  const DEFAULT_PROPS = {
    loaded: true,
    errors: null,
    trays: [],
    selected: {},
    projects: [],
    showBrokenBuildTimers: null,
    showTrayName: null,
    playBrokenBuildSounds: null,
    brokenBuildFx: null,
    messages: [],
    fetchInteresting: noop,
    refreshTime: 5,
    requestFullScreen: noop,
    isFullScreen: null
  }

  it('should render projects', function () {
    const props = Object.assign({}, DEFAULT_PROPS, {projects: [{projectId: 'some-id', trayId: '', prognosis: 'unknown'}]})
    const wrapper = shallow(<Monitor {...props} />)
    expect(wrapper.find(InterestingProjects)).to.have.prop('projects').that.deep.contains({projectId: 'some-id', trayId: '', prognosis: 'unknown'})
  })

  it('should render success message if there are no projects', function () {
    const props = Object.assign({}, DEFAULT_PROPS, {projects: [], messages: ['some-message']})
    const wrapper = shallow(<Monitor {...props} />)
    expect(wrapper.find(Success)).to.have.prop('messages').that.contains('some-message')
  })
})
