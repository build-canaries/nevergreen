import {describe, it} from 'mocha'
import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
import Monitor from '../../../src/client/monitor/Monitor'
import InterestingProjects from '../../../src/client/monitor/InterestingProjects'
import Success from '../../../src/client/monitor/Success'
import _ from 'lodash'

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
    fetchInteresting: _.noop,
    refreshTime: 5,
    requestFullScreen: _.noop,
    isFullScreen: null
  }

  it('should render projects', function () {
    const props = {...DEFAULT_PROPS, projects: [{projectId: 'some-id', trayId: '', prognosis: 'unknown'}]}
    const wrapper = shallow(<Monitor {...props} />)
    expect(wrapper.find(InterestingProjects)).to.have.prop('projects').that.deep.contains({
      projectId: 'some-id',
      trayId: '',
      prognosis: 'unknown'
    })
  })

  it('should render success message if there are no projects', function () {
    const props = {...DEFAULT_PROPS, projects: [], messages: ['some-message']}
    const wrapper = shallow(<Monitor {...props} />)
    expect(wrapper.find(Success)).to.have.prop('messages').that.contains('some-message')
  })
})
