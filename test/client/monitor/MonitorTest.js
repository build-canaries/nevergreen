import '../UnitSpec'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
import Monitor from '../../../src/client/monitor/Monitor'
import Messages from '../../../src/client/common/messages/Messages'
import InterestingProjects from '../../../src/client/monitor/InterestingProjects'
import Success from '../../../src/client/monitor/Success'

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
    fetchInteresting: () => {
    }
  }

  it('should render error messages', function () {
    const props = Object.assign({}, DEFAULT_PROPS, {errors: ['some-error']})
    const wrapper = shallow(<Monitor {...props} />)
    expect(wrapper.find(Messages)).to.have.prop('messages').that.contains('some-error')
  })

  describe('when there are no errors', function () {
    it('should render projects', function () {
      const props = Object.assign({}, DEFAULT_PROPS, {projects: [{projectId: 'some-id'}]})
      const wrapper = shallow(<Monitor {...props} />)
      expect(wrapper.find(InterestingProjects)).to.have.prop('projects').that.contains({projectId: 'some-id'})
    })

    it('should render success message if there are no projects', function () {
      const props = Object.assign({}, DEFAULT_PROPS, {projects: [], messages: ['some-message']})
      const wrapper = shallow(<Monitor {...props} />)
      expect(wrapper.find(Success)).to.have.prop('messages').that.contains('some-message')
    })
  })
})
