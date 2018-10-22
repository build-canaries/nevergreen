import {describe, it} from 'mocha'
import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
import {InterestingProjects} from '../../../src/client/monitor/InterestingProjects'

describe('<InterestingProjects/>', function () {

  const DEFAULT_PROPS = {
    projects: null,
    trays: [],
    showBuildTimers: null,
    showBrokenBuildTimers: null,
    showTrayName: null,
    playBrokenBuildSounds: null,
    brokenBuildFx: null,
    showBuildLabel: null,
    maxProjectsToShow: 1
  }

  const PROJECT = {
    projectId: '',
    prognosis: 'unknown',
    name: '',
    lastBuildTime: '',
    trayId: 'someId'
  }

  describe('broken build sfx', function () {

    it('should render if its enabled and any project is broken', function () {
      const props = {
        ...DEFAULT_PROPS,
        projects: [{...PROJECT, prognosis: 'sick'}],
        trays: [{name: 'some-tray-name', trayId: 'someId'}],
        playBrokenBuildSounds: true,
        brokenBuildFx: 'some-sfx'
      }
      const wrapper = shallow(<InterestingProjects {...props} />)
      expect(wrapper.find('audio')).to.have.attr('src', 'some-sfx')
    })

    it('should not render if its disabled even if any project is sick', function () {
      const props = {
        ...DEFAULT_PROPS,
        projects: [{...PROJECT, prognosis: 'sick'}],
        trays: [{name: 'some-tray-name', trayId: 'someId'}],
        playBrokenBuildSounds: false
      }
      const wrapper = shallow(<InterestingProjects {...props} />)
      expect(wrapper.find('audio')).to.not.be.present()
    })

    it('should not render if its enabled but no projects are sick', function () {
      const props = {
        ...DEFAULT_PROPS,
        projects: [{...PROJECT, prognosis: 'unknown'}],
        trays: [{name: 'some-tray-name', trayId: 'someId'}],
        playBrokenBuildSounds: false
      }
      const wrapper = shallow(<InterestingProjects {...props} />)
      expect(wrapper.find('audio')).to.not.be.present()
    })

    it('should not render if its enabled but a sound fx has not been set', function () {
      const props = {
        ...DEFAULT_PROPS,
        projects: [{...PROJECT, prognosis: 'sick'}],
        trays: [{name: 'some-tray-name', trayId: 'someId'}],
        playBrokenBuildSounds: true,
        brokenBuildFx: null
      }
      const wrapper = shallow(<InterestingProjects {...props} />)
      expect(wrapper.find('audio')).to.not.be.present()
    })
  })

  describe('limiting the projects displayed', function () {

    it('should not render a summary if the number of projects is less than the max', function () {
      const props = {
        ...DEFAULT_PROPS,
        maxProjectsToShow: 3,
        projects: [PROJECT],
        trays: [{name: 'some-tray-name', trayId: 'someId'}]
      }
      const wrapper = shallow(<InterestingProjects {...props} />)
      expect(wrapper.find('ProjectSummary')).to.not.be.present()
    })

    it('should not render a summary if the number of projects is equal to the max', function () {
      const props = {
        ...DEFAULT_PROPS,
        maxProjectsToShow: 3,
        projects: [PROJECT, PROJECT, PROJECT],
        trays: [{name: 'some-tray-name', trayId: 'someId'}]
      }
      const wrapper = shallow(<InterestingProjects {...props} />)
      expect(wrapper.find('ProjectSummary')).to.not.be.present()
    })

    it('should render a summary if the number of projects is more than the max', function () {
      const props = {
        ...DEFAULT_PROPS,
        maxProjectsToShow: 1,
        projects: [PROJECT, PROJECT],
        trays: [{name: 'some-tray-name', trayId: 'someId'}]
      }
      const wrapper = shallow(<InterestingProjects {...props} />)
      expect(wrapper.find('ProjectSummary')).to.be.present()
    })

    it('should render a summary if the number of errors is more than the max', function () {
      const props = {
        ...DEFAULT_PROPS,
        maxProjectsToShow: 1,
        errors: ['foo', 'bar'],
        projects: [],
        trays: [{name: 'some-tray-name', trayId: 'someId'}]
      }
      const wrapper = shallow(<InterestingProjects {...props} />)
      expect(wrapper.find('ProjectSummary')).to.be.present()
    })

    it('should render a summary if the number of errors and projects is more than the max', function () {
      const props = {
        ...DEFAULT_PROPS,
        maxProjectsToShow: 2,
        errors: ['foo'],
        projects: [PROJECT, PROJECT],
        trays: [{name: 'some-tray-name', trayId: 'someId'}]
      }
      const wrapper = shallow(<InterestingProjects {...props} />)
      expect(wrapper.find('ProjectSummary')).to.be.present()
    })
  })
})
