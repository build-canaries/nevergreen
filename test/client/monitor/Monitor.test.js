import React from 'react'
import {shallow} from 'enzyme'
import {GettingStartedHelp, Monitor} from '../../../src/client/monitor/Monitor'
import {InterestingProjects} from '../../../src/client/monitor/InterestingProjects'
import {Success} from '../../../src/client/monitor/Success'
import _ from 'lodash'
import {PROGNOSIS_UNKNOWN} from '../../../src/client/domain/Project'

describe('<Monitor/>', () => {

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

  test('should render projects', () => {
    const props = {...DEFAULT_PROPS, projects: [someProject], trays: [someTray]}

    const wrapper = shallow(<Monitor {...props} />)

    expect(wrapper.find(InterestingProjects).prop('projects')).toEqual([someProject])
    expect(wrapper.find(Success).exists()).toBeFalsy()
    expect(wrapper.find(GettingStartedHelp).exists()).toBeFalsy()
  })

  test('should render success message if there are no projects', () => {
    const props = {...DEFAULT_PROPS, projects: [], messages: ['some-message'], trays: [someTray]}

    const wrapper = shallow(<Monitor {...props} />)

    expect(wrapper.find(Success).prop('messages')).toEqual(['some-message'])
    expect(wrapper.find(InterestingProjects).exists()).toBeFalsy()
    expect(wrapper.find(GettingStartedHelp).exists()).toBeFalsy()
  })

  test('should render a helpful message if no trays are added', () => {
    const props = {...DEFAULT_PROPS, trays: []}

    const wrapper = shallow(<Monitor {...props} />)

    expect(wrapper.find(GettingStartedHelp).exists()).toBeTruthy()
    expect(wrapper.find(Success).exists()).toBeFalsy()
    expect(wrapper.find(InterestingProjects).exists()).toBeFalsy()
  })
})
