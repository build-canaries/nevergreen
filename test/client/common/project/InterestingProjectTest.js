import {childText, forUndisplayablesStrings, locator} from '../../TestUtils'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
import InterestingProject from '../../../../src/client/common/project/InterestingProject'
import {PROGNOSIS_HEALTHY_BUILDING, PROGNOSIS_SICK, PROGNOSIS_UNKNOWN} from '../../../../src/client/domain/Project'

/*
 * The whitespace in this component is important, because it gets its text scaled on the monitor view. We need to use
 * real whitespace characters, as opposed to css padding/margin, so the correct font size can be calculated. This is
 * the reason many of the tests below specifically check for a space either at the end or beginning of an elements text.
 * This does introduce coupling between the different elements as they need to know whether to add a space before
 * and/or after.
 */
describe('<InterestingProject/>', function () {

  const DEFAULT_PROPS = {
    prognosis: PROGNOSIS_UNKNOWN,
    name: '',
    stage: null,
    trayName: null,
    lastBuildTime: null,
    showBuildLabel: null,
    showTrayName: null,
    lastBuildLabel: null,
    thisBuildTime: null,
    showBuildTimers: null,
    showBrokenBuildTimers: null
  }

  describe('tray name', function () {

    it('should display with a space at the end if enabled and exists', function () {
      const props = {...DEFAULT_PROPS, showTrayName: true, trayName: 'some-tray-name'}
      const wrapper = shallow(<InterestingProject {...props} />)
      expect(wrapper.find(locator('tray-name'))).to.have.text('some-tray-name ')
    })

    it('should not display if disabled', function () {
      const props = {...DEFAULT_PROPS, showTrayName: false, trayName: 'some-tray-name'}
      const wrapper = shallow(<InterestingProject {...props} />)
      expect(wrapper.find(locator('tray-name'))).to.not.be.present()
    })

    forUndisplayablesStrings((val, friendlyName) => {
      it(`should not display if enabled but value is ${friendlyName}`, function () {
        const props = {...DEFAULT_PROPS, showTrayName: true, trayName: val}
        const wrapper = shallow(<InterestingProject {...props} />)
        expect(wrapper.find(locator('tray-name'))).to.not.be.present()
      })
    })
  })

  it('should display the project name with no added spaces', function () {
    const props = {...DEFAULT_PROPS, name: 'some-name'}
    const wrapper = shallow(<InterestingProject {...props} />)
    expect(wrapper.find(locator('project-name'))).to.have.text('some-name')
  })

  describe('stage', function () {

    it('should display with a space at the beginning if it exists', function () {
      const props = {...DEFAULT_PROPS, stage: 'some-stage'}
      const wrapper = shallow(<InterestingProject {...props} />)
      expect(wrapper.find(locator('project-stage'))).to.have.text(' some-stage')
    })

    forUndisplayablesStrings((val, friendlyName) => {
      it(`should not display if value is ${friendlyName}`, function () {
        const props = {...DEFAULT_PROPS, stage: val}
        const wrapper = shallow(<InterestingProject {...props} />)
        expect(wrapper.find(locator('project-stage'))).to.not.be.present()
      })
    })
  })

  it('should add a visually hidden prognosis for screen readers', function () {
    const props = {...DEFAULT_PROPS, prognosis: PROGNOSIS_HEALTHY_BUILDING}
    const wrapper = shallow(<InterestingProject {...props} />)
    expect(childText(wrapper, locator('prognosis'))).to.have.text(' prognosis healthy-building')
  })

  describe('broken build timer', function () {

    it('should not display if disabled', function () {
      const props = {...DEFAULT_PROPS, showBrokenBuildTimers: false}
      const wrapper = shallow(<InterestingProject {...props} />)
      expect(wrapper.find(locator('time-broken'))).to.not.be.present()
    })

    it('should not display if prognosis is not sick', function () {
      const props = {...DEFAULT_PROPS, showBrokenBuildTimers: true, prognosis: PROGNOSIS_UNKNOWN}
      const wrapper = shallow(<InterestingProject {...props} />)
      expect(wrapper.find(locator('time-broken'))).to.not.be.present()
    })

    it('should display if prognosis is sick and its enabled', function () {
      const props = {...DEFAULT_PROPS, showBrokenBuildTimers: true, prognosis: PROGNOSIS_SICK}
      const wrapper = shallow(<InterestingProject {...props} />)
      expect(wrapper.find(locator('time-broken'))).to.be.present()
    })
  })

  describe('build timer', function () {

    it('should not display if disabled', function () {
      const props = {...DEFAULT_PROPS, showBuildTimers: false}
      const wrapper = shallow(<InterestingProject {...props} />)
      expect(wrapper.find(locator('time-building'))).to.not.be.present()
    })

    it('should not display if prognosis is not building', function () {
      const props = {...DEFAULT_PROPS, showBuildTimers: true, prognosis: PROGNOSIS_UNKNOWN}
      const wrapper = shallow(<InterestingProject {...props} />)
      expect(wrapper.find(locator('time-building'))).to.not.be.present()
    })

    it('should display if prognosis is building and its enabled', function () {
      const props = {...DEFAULT_PROPS, showBuildTimers: true, prognosis: PROGNOSIS_HEALTHY_BUILDING}
      const wrapper = shallow(<InterestingProject {...props} />)
      expect(wrapper.find(locator('time-building'))).to.be.present()
    })
  })

  describe('build label', function () {

    it('should not display if disabled', function () {
      const props = {...DEFAULT_PROPS, showBuildLabel: false}
      const wrapper = shallow(<InterestingProject {...props} />)
      expect(wrapper.find(locator('build-label'))).to.not.be.present()
    })

    /*
     * This is because CI servers only update the lastBuildLabel when a build has finished building. So the build label
     * is always one build out of date for projects that are currently building, and thus we can only show the build
     * label for sick projects. It's also possible to change the build label in some CI servers (e.g. GoCD) so we
     * can't assume it's a number and increment by one for display purposes on non broken builds.
     */
    it('should not display if prognosis is not sick', function () {
      const props = {
        ...DEFAULT_PROPS,
        showBuildLabel: true,
        lastBuildLabel: '1234',
        prognosis: PROGNOSIS_HEALTHY_BUILDING
      }
      const wrapper = shallow(<InterestingProject {...props} />)
      expect(wrapper.find(locator('build-label'))).to.not.be.present()
    })

    forUndisplayablesStrings((val, friendlyName) => {
      it(`should not display if ${friendlyName}, regardless of prognosis`, function () {
        const props = {...DEFAULT_PROPS, showBuildLabel: true, lastBuildLabel: val, prognosis: PROGNOSIS_SICK}
        const wrapper = shallow(<InterestingProject {...props} />)
        expect(wrapper.find(locator('build-label'))).to.not.be.present()
      })
    })

    it('should display with a space before if enabled, exists and prognosis is sick', function () {
      const props = {...DEFAULT_PROPS, showBuildLabel: true, lastBuildLabel: '1234', prognosis: PROGNOSIS_SICK}
      const wrapper = shallow(<InterestingProject {...props} />)
      expect(wrapper.find(locator('build-label'))).to.be.present()
      expect(wrapper.find(locator('build-label')).text()).to.equal(' #1234')
    })
  })
})
