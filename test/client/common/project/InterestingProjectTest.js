import {locator} from '../../UnitSpec'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
import InterestingProject from '../../../../src/client/common/project/InterestingProject'

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

  it('should render the project name', function () {
    const props = Object.assign({}, DEFAULT_PROPS, {name: 'some-name'})
    const wrapper = shallow(<InterestingProject {...props} />)
    expect(wrapper.find(locator('project-name'))).to.have.text('some-name')
  })

  it('should render the project stage if it exists', function () {
    const props = Object.assign({}, DEFAULT_PROPS, {stage: 'some-stage'})
    const wrapper = shallow(<InterestingProject {...props} />)
    expect(wrapper.find(locator('project-stage'))).to.have.text(' some-stage')
  })

  it('should not render the project stage if it doesn\'t exist', function () {
    const props = Object.assign({}, DEFAULT_PROPS, {stage: null})
    const wrapper = shallow(<InterestingProject {...props} />)
    expect(wrapper.find(locator('project-stage'))).to.not.be.present()
  })

  describe('tray name', function () {
    it('should be shown if enabled and not null', function () {
      const props = Object.assign({}, DEFAULT_PROPS, {showTrayName: true, trayName: 'some-tray-name'})
      const wrapper = shallow(<InterestingProject {...props} />)
      expect(wrapper.find(locator('tray-name'))).to.have.text('some-tray-name ')
    })

    it('should not be shown if disabled', function () {
      const props = Object.assign({}, DEFAULT_PROPS, {showTrayName: false, trayName: 'some-tray-name'})
      const wrapper = shallow(<InterestingProject {...props} />)
      expect(wrapper.find(locator('tray-name'))).to.not.be.present()
    })

    it('should not be shown if enabled but is null', function () {
      const props = Object.assign({}, DEFAULT_PROPS, {showTrayName: true, trayName: null})
      const wrapper = shallow(<InterestingProject {...props} />)
      expect(wrapper.find(locator('tray-name'))).to.not.be.present()
    })

    it('should not be shown if enabled but is blank', function () {
      const props = Object.assign({}, DEFAULT_PROPS, {showTrayName: true, trayName: ' '})
      const wrapper = shallow(<InterestingProject {...props} />)
      expect(wrapper.find(locator('tray-name'))).to.not.be.present()
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

    it('should show ?? if last build time is blank', function () {
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
