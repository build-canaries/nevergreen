import {describe, it} from 'mocha'
import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
import {GettingStartedHelp, Monitor} from '../../../src/client/monitor/Monitor'
import {InterestingProjects} from '../../../src/client/monitor/InterestingProjects'
import {Success} from '../../../src/client/monitor/Success'
import _ from 'lodash'
import {PROGNOSIS_UNKNOWN} from '../../../src/client/domain/Project'

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
    maxProjectsToShow: 1
  }

  const someTray = {trayId: 'some-tray-id'}
  const someProject = {projectId: 'some-id', trayId: '', name: '', prognosis: PROGNOSIS_UNKNOWN}

  it('should render projects', function () {
    const props = {...DEFAULT_PROPS, projects: [someProject], trays: [someTray]}

    const wrapper = shallow(<Monitor {...props} />)

    expect(wrapper.find(InterestingProjects)).to.have.prop('projects').that.deep.contains(someProject)
    expect(wrapper.find(Success)).to.not.be.present()
    expect(wrapper.find(GettingStartedHelp)).to.not.be.present()
  })

  it('should render success message if there are no projects', function () {
    const props = {...DEFAULT_PROPS, projects: [], messages: ['some-message'], trays: [someTray]}

    const wrapper = shallow(<Monitor {...props} />)

    expect(wrapper.find(Success)).to.have.prop('messages').that.contains('some-message')
    expect(wrapper.find(InterestingProjects)).to.not.be.present()
    expect(wrapper.find(GettingStartedHelp)).to.not.be.present()
  })

  it('should render a helpful message if no trays are added', function () {
    const props = {...DEFAULT_PROPS, trays: []}

    const wrapper = shallow(<Monitor {...props} />)

    expect(wrapper.find(GettingStartedHelp)).to.be.present()
    expect(wrapper.find(Success)).to.not.be.present()
    expect(wrapper.find(InterestingProjects)).to.not.be.present()
  })
})
