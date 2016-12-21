import '../UnitSpec'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
import InterestingProject from '../../../src/client/monitor/InterestingProject'

describe('<InterestingProject/>', function () {
  const DEFAULT_PROPS = {
    prognosis: '',
    name: '',
    stage: null,
    trayName: null,
    lastBuildTime: null,
    showBrokenBuildTimers: null,
    showTrayName: null
  }

  describe('show tray name disabled', function () {
    it('should render the project name', function () {
      const props = Object.assign({}, DEFAULT_PROPS, {name: 'some-name'})
      const wrapper = shallow(<InterestingProject {...props} />)
      expect(wrapper.find('.monitor-project-name')).to.have.text('some-name')
    })

    it('should render the project name including the stage', function () {
      const props = Object.assign({}, DEFAULT_PROPS, {name: 'some-name', stage: 'some-stage'})
      const wrapper = shallow(<InterestingProject {...props} />)
      expect(wrapper.find('.monitor-project-name')).to.have.text('some-name some-stage')
    })
  })

  describe('show tray name enabled', function () {
    it('should render the project name', function () {
      const props = Object.assign({}, DEFAULT_PROPS, {
        showTrayName: true,
        trayName: 'some-tray-name',
        name: 'some-name'
      })
      const wrapper = shallow(<InterestingProject {...props} />)
      expect(wrapper.find('.monitor-project-name')).to.have.text('some-tray-name some-name')
    })

    it('should render the project name including the stage', function () {
      const props = Object.assign({}, DEFAULT_PROPS, {
        showTrayName: true,
        trayName: 'some-tray-name',
        name: 'some-name',
        stage: 'some-stage'
      })
      const wrapper = shallow(<InterestingProject {...props} />)
      expect(wrapper.find('.monitor-project-name')).to.have.text('some-tray-name some-name some-stage')
    })
  })

  describe('broken build timer', function () {
    it('should not be shown if disabled', function () {
      const props = Object.assign({}, DEFAULT_PROPS, {showBrokenBuildTimers: false})
      const wrapper = shallow(<InterestingProject {...props} />)
      expect(wrapper.find('.time-broken')).to.not.be.present()
    })

    it('should not be shown if prognosis is not sick', function () {
      const props = Object.assign({}, DEFAULT_PROPS, {showBrokenBuildTimers: true, prognosis: 'healthy'})
      const wrapper = shallow(<InterestingProject {...props} />)
      expect(wrapper.find('.time-broken')).to.not.be.present()
    })

    it('should render ?? if last build time is blank', function () {
      const props = Object.assign({}, DEFAULT_PROPS, {
        showBrokenBuildTimers: true,
        prognosis: 'sick',
        lastBuildTime: ''
      })
      const wrapper = shallow(<InterestingProject {...props} />)
      expect(wrapper.find('.time-broken')).to.have.text(' ??')
    })

    it('should render how long its been broken', function () {
      const props = Object.assign({}, DEFAULT_PROPS, {
        showBrokenBuildTimers: true,
        prognosis: 'sick',
        lastBuildTime: '2000-12-01T00:00:00Z'
      })
      const wrapper = shallow(<InterestingProject {...props} />)
      expect(wrapper.find('.time-broken')).to.not.have.text(' ??')
      expect(wrapper.find('.time-broken')).to.have.text().match(/^ [ 0-9a-zA-Z]*$/)
    })
  })
})
