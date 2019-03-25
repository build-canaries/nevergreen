import {childText, forUndisplayableStrings, locator} from '../../testHelpers'
import React from 'react'
import {shallow} from 'enzyme'
import {InterestingProject} from '../../../../src/client/common/project/InterestingProject'
import {PROGNOSIS_HEALTHY_BUILDING, PROGNOSIS_SICK, PROGNOSIS_UNKNOWN} from '../../../../src/client/domain/Project'

/*
 * The whitespace in this component is important, because it gets its text scaled on the monitor view. We need to use
 * real whitespace characters, as opposed to css padding/margin, so the correct font size can be calculated. This is
 * the reason many of the tests below specifically check for a space either at the end or beginning of an elements text.
 * This does introduce coupling between the different elements as they need to know whether to add a space before
 * and/or after.
 */
describe('<InterestingProject/>', () => {

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

  describe('tray name', () => {

    it('should display with a space at the end if enabled and exists', () => {
      const props = {...DEFAULT_PROPS, showTrayName: true, trayName: 'some-tray-name'}
      const wrapper = shallow(<InterestingProject {...props} />)
      expect(wrapper.find(locator('tray-name')).text()).toEqual('some-tray-name ')
    })

    it('should not display if disabled', () => {
      const props = {...DEFAULT_PROPS, showTrayName: false, trayName: 'some-tray-name'}
      const wrapper = shallow(<InterestingProject {...props} />)
      expect(wrapper.find(locator('tray-name')).exists()).toBeFalsy()
    })

    forUndisplayableStrings((val, friendlyName) => {
      it(`should not display if enabled but value is ${friendlyName}`, () => {
        const props = {...DEFAULT_PROPS, showTrayName: true, trayName: val}
        const wrapper = shallow(<InterestingProject {...props} />)
        expect(wrapper.find(locator('tray-name')).exists()).toBeFalsy()
      })
    })
  })

  it('should display the project name with no added spaces', () => {
    const props = {...DEFAULT_PROPS, name: 'some-name'}
    const wrapper = shallow(<InterestingProject {...props} />)
    expect(wrapper.find(locator('project-name')).text()).toEqual('some-name')
  })

  describe('stage', () => {

    it('should display with a space at the beginning if it exists', () => {
      const props = {...DEFAULT_PROPS, stage: 'some-stage'}
      const wrapper = shallow(<InterestingProject {...props} />)
      expect(wrapper.find(locator('project-stage')).text()).toEqual(' some-stage')
    })

    forUndisplayableStrings((val, friendlyName) => {
      it(`should not display if value is ${friendlyName}`, () => {
        const props = {...DEFAULT_PROPS, stage: val}
        const wrapper = shallow(<InterestingProject {...props} />)
        expect(wrapper.find(locator('project-stage')).exists()).toBeFalsy()
      })
    })
  })

  it('should add a visually hidden prognosis for screen readers', () => {
    const props = {...DEFAULT_PROPS, prognosis: PROGNOSIS_HEALTHY_BUILDING}
    const wrapper = shallow(<InterestingProject {...props} />)
    expect(childText(wrapper, locator('prognosis'))).toEqual(' prognosis healthy-building')
  })

  describe('broken build timer', () => {

    it('should not display if disabled', () => {
      const props = {...DEFAULT_PROPS, showBrokenBuildTimers: false}
      const wrapper = shallow(<InterestingProject {...props} />)
      expect(wrapper.find(locator('time-broken')).exists()).toBeFalsy()
    })

    it('should not display if prognosis is not sick', () => {
      const props = {...DEFAULT_PROPS, showBrokenBuildTimers: true, prognosis: PROGNOSIS_UNKNOWN}
      const wrapper = shallow(<InterestingProject {...props} />)
      expect(wrapper.find(locator('time-broken')).exists()).toBeFalsy()
    })

    it('should display if prognosis is sick and its enabled', () => {
      const props = {...DEFAULT_PROPS, showBrokenBuildTimers: true, prognosis: PROGNOSIS_SICK}
      const wrapper = shallow(<InterestingProject {...props} />)
      expect(wrapper.find(locator('time-broken')).exists()).toBeTruthy()
    })
  })

  describe('build timer', () => {

    it('should not display if disabled', () => {
      const props = {...DEFAULT_PROPS, showBuildTimers: false}
      const wrapper = shallow(<InterestingProject {...props} />)
      expect(wrapper.find(locator('time-building')).exists()).toBeFalsy()
    })

    it('should not display if prognosis is not building', () => {
      const props = {...DEFAULT_PROPS, showBuildTimers: true, prognosis: PROGNOSIS_UNKNOWN}
      const wrapper = shallow(<InterestingProject {...props} />)
      expect(wrapper.find(locator('time-building')).exists()).toBeFalsy()
    })

    it('should display if prognosis is building and its enabled', () => {
      const props = {...DEFAULT_PROPS, showBuildTimers: true, prognosis: PROGNOSIS_HEALTHY_BUILDING}
      const wrapper = shallow(<InterestingProject {...props} />)
      expect(wrapper.find(locator('time-building')).exists()).toBeTruthy()
    })
  })

  describe('build label', () => {

    it('should not display if disabled', () => {
      const props = {...DEFAULT_PROPS, showBuildLabel: false}
      const wrapper = shallow(<InterestingProject {...props} />)
      expect(wrapper.find(locator('build-label')).exists()).toBeFalsy()
    })

    /*
     * This is because CI servers only update the lastBuildLabel when a build has finished building. So the build label
     * is always one build out of date for projects that are currently building, and thus we can only show the build
     * label for sick projects. It's also possible to change the build label in some CI servers (e.g. GoCD) so we
     * can't assume it's a number and increment by one for display purposes on non broken builds.
     */
    it('should not display if prognosis is not sick', () => {
      const props = {
        ...DEFAULT_PROPS,
        showBuildLabel: true,
        lastBuildLabel: '1234',
        prognosis: PROGNOSIS_HEALTHY_BUILDING
      }
      const wrapper = shallow(<InterestingProject {...props} />)
      expect(wrapper.find(locator('build-label')).exists()).toBeFalsy()
    })

    forUndisplayableStrings((val, friendlyName) => {
      it(`should not display if ${friendlyName}, regardless of prognosis`, () => {
        const props = {...DEFAULT_PROPS, showBuildLabel: true, lastBuildLabel: val, prognosis: PROGNOSIS_SICK}
        const wrapper = shallow(<InterestingProject {...props} />)
        expect(wrapper.find(locator('build-label')).exists()).toBeFalsy()
      })
    })

    it('should display with a space before if enabled, exists and prognosis is sick', () => {
      const props = {...DEFAULT_PROPS, showBuildLabel: true, lastBuildLabel: '1234', prognosis: PROGNOSIS_SICK}
      const wrapper = shallow(<InterestingProject {...props} />)
      expect(wrapper.find(locator('build-label')).text()).toEqual(' #1234')
    })
  })
})
