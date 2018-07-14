import {describe, it} from 'mocha'
import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
import Monitor from '../../../src/client/monitor/Monitor'
import InterestingProjects from '../../../src/client/monitor/InterestingProjects'
import Success from '../../../src/client/monitor/Success'
import _ from 'lodash'
import {PROGNOSIS_UNKNOWN} from '../../../src/client/domain/Project'
import {mocks} from '../Mocking'

describe('<Monitor/>', function () {

  const DEFAULT_PROPS = {
    loaded: true,
    errors: null,
    trays: [],
    selected: {},
    projects: [],
    showBuildTimers: null,
    showBrokenBuildTimers: null,
    showTrayName: null,
    playBrokenBuildSounds: null,
    brokenBuildFx: null,
    messages: [],
    fetchInteresting: _.noop,
    refreshTime: 5,
    requestFullScreen: _.noop,
    isFullScreen: null,
    pendingRequest: null,
    showSystemNotifications: null,
    triggerSystemNotifications: _.noop,
    maxProjectsToShow: 1
  }

  const someProject = {projectId: 'some-id', trayId: '', prognosis: PROGNOSIS_UNKNOWN}

  it('should render projects', function () {
    const props = {...DEFAULT_PROPS, projects: [someProject]}
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

  it('should trigger system notifications when projects change', function () {
    const triggerSystemNotifications = mocks.spy()
    const previousProjects = []
    const nextProjects = [someProject]
    const props = {
      ...DEFAULT_PROPS,
      projects: previousProjects,
      showSystemNotifications: true,
      triggerSystemNotifications
    }

    const wrapper = shallow(<Monitor {...props} />, { lifecycleExperimental: true })
    wrapper.setProps({projects: nextProjects})

    expect(triggerSystemNotifications).to.have.been.calledWith(previousProjects, nextProjects)
  })
})
