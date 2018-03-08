import {describe, it} from 'mocha'
import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
import Monitor from '../../../src/client/monitor/Monitor'
import InterestingProjects from '../../../src/client/monitor/InterestingProjects'
import Success from '../../../src/client/monitor/Success'
import _ from 'lodash'
import {locator} from '../TestUtils'
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
    isFullScreen: null
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

  describe('adding a timer to ensure build times are accurately updated', function () {

    describe('when refresh time is not granular enough', function () {

      it('should when broken build timers are enabled', function () {
        const props = {...DEFAULT_PROPS, projects: [someProject], refreshTime: 61, showBrokenBuildTimers: true}
        const wrapper = shallow(<Monitor {...props} />)
        expect(wrapper.find(locator('force-update'))).to.be.present()
      })

      it('should when build timers are enabled', function () {
        const props = {...DEFAULT_PROPS, projects: [someProject], refreshTime: 61, showBuildTimers: true}
        const wrapper = shallow(<Monitor {...props} />)
        expect(wrapper.find(locator('force-update'))).to.be.present()
      })

      it('should not when no build timers are enabled', function () {
        const props = {
          ...DEFAULT_PROPS,
          projects: [someProject],
          refreshTime: 61,
          showBrokenBuildTimers: false,
          showBuildTimers: false
        }
        const wrapper = shallow(<Monitor {...props} />)
        expect(wrapper.find(locator('force-update'))).to.not.be.present()
      })
    })

    it('should not if the refresh time is granular enough to update the timers', function () {
      const props = {
        ...DEFAULT_PROPS,
        projects: [someProject],
        refreshTime: 60,
        showBrokenBuildTimers: true,
        showBuildTimers: true
      }
      const wrapper = shallow(<Monitor {...props} />)
      expect(wrapper.find(locator('force-update'))).to.not.be.present()
    })
  })
})
