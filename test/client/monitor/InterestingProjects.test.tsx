import React from 'react'
import {shallow} from 'enzyme'
import {InterestingProjects} from '../../../src/client/monitor/InterestingProjects'
import {buildProject, buildTray} from '../testHelpers'
import {Prognosis} from '../../../src/client/domain/Project'

describe('<InterestingProjects/>', () => {

  const DEFAULT_PROPS = {
    trays: [],
    maxProjectsToShow: 1
  }

  const PROJECT = buildProject({
    projectId: '',
    prognosis: Prognosis.unknown,
    name: '',
    lastBuildTime: '',
    trayId: 'someId'
  })

  describe('broken build sfx', () => {

    test('should render if its enabled and any project is broken', () => {
      const props = {
        ...DEFAULT_PROPS,
        projects: [buildProject({...PROJECT, prognosis: Prognosis.sick})],
        trays: [buildTray({name: 'some-tray-name', trayId: 'someId'})],
        playBrokenBuildSounds: true,
        brokenBuildFx: 'some-sfx'
      }
      const wrapper = shallow(<InterestingProjects {...props} />)
      expect(wrapper.find('audio').prop('src')).toEqual('some-sfx')
    })

    test('should not render if its disabled even if any project is sick', () => {
      const props = {
        ...DEFAULT_PROPS,
        projects: [buildProject({...PROJECT, prognosis: Prognosis.sick})],
        trays: [buildTray({name: 'some-tray-name', trayId: 'someId'})],
        playBrokenBuildSounds: false
      }
      const wrapper = shallow(<InterestingProjects {...props} />)
      expect(wrapper.find('audio').exists()).toBeFalsy()
    })

    test('should not render if its enabled but no projects are sick', () => {
      const props = {
        ...DEFAULT_PROPS,
        projects: [buildProject({...PROJECT, prognosis: Prognosis.unknown})],
        trays: [buildTray({name: 'some-tray-name', trayId: 'someId'})],
        playBrokenBuildSounds: false
      }
      const wrapper = shallow(<InterestingProjects {...props} />)
      expect(wrapper.find('audio').exists()).toBeFalsy()
    })

    test('should not render if its enabled but a sound fx has not been set', () => {
      const props = {
        ...DEFAULT_PROPS,
        projects: [buildProject({...PROJECT, prognosis: Prognosis.sick})],
        trays: [buildTray({name: 'some-tray-name', trayId: 'someId'})],
        playBrokenBuildSounds: true,
        brokenBuildFx: undefined
      }
      const wrapper = shallow(<InterestingProjects {...props} />)
      expect(wrapper.find('audio').exists()).toBeFalsy()
    })
  })

  describe('limiting the projects displayed', () => {

    test('should not render a summary if the number of projects is less than the max', () => {
      const props = {
        ...DEFAULT_PROPS,
        maxProjectsToShow: 3,
        projects: [PROJECT],
        trays: [buildTray({name: 'some-tray-name', trayId: 'someId'})]
      }
      const wrapper = shallow(<InterestingProjects {...props} />)
      expect(wrapper.find('ProjectSummary').exists()).toBeFalsy()
    })

    test('should not render a summary if the number of projects is equal to the max', () => {
      const props = {
        ...DEFAULT_PROPS,
        maxProjectsToShow: 3,
        projects: [PROJECT, PROJECT, PROJECT],
        trays: [buildTray({name: 'some-tray-name', trayId: 'someId'})]
      }
      const wrapper = shallow(<InterestingProjects {...props} />)
      expect(wrapper.find('ProjectSummary').exists()).toBeFalsy()
    })

    test('should render a summary if the number of projects is more than the max', () => {
      const props = {
        ...DEFAULT_PROPS,
        maxProjectsToShow: 1,
        projects: [PROJECT, PROJECT],
        trays: [buildTray({name: 'some-tray-name', trayId: 'someId'})]
      }
      const wrapper = shallow(<InterestingProjects {...props} />)
      expect(wrapper.find('ProjectSummary').exists()).toBeTruthy()
    })

    test('should render a summary if the number of errors is more than the max', () => {
      const props = {
        ...DEFAULT_PROPS,
        maxProjectsToShow: 1,
        errors: ['foo', 'bar'],
        projects: [],
        trays: [buildTray({name: 'some-tray-name', trayId: 'someId'})]
      }
      const wrapper = shallow(<InterestingProjects {...props} />)
      expect(wrapper.find('ProjectSummary').exists()).toBeTruthy()
    })

    test('should render a summary if the number of errors and projects is more than the max', () => {
      const props = {
        ...DEFAULT_PROPS,
        maxProjectsToShow: 2,
        errors: ['foo'],
        projects: [PROJECT, PROJECT],
        trays: [buildTray({name: 'some-tray-name', trayId: 'someId'})]
      }
      const wrapper = shallow(<InterestingProjects {...props} />)
      expect(wrapper.find('ProjectSummary').exists()).toBeTruthy()
    })
  })
})
