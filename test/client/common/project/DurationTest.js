import {childText, forUndisplayables, locator} from '../../TestUtils'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
import {fixTime} from '../../FakeTimers'
import VisuallyHidden from '../../../../src/client/common/VisuallyHidden'
import Duration from '../../../../src/client/common/project/Duration'

/*
 * This component needs to render spaces as it is used in the <InterestingProject/> component, see those tests for more
 * details.
 */
describe('<Duration/>', function () {
  const DEFAULT_PROPS = {
    timestamp: null,
    fullDescription: ''
  }

  forUndisplayables((val, friendlyName) => {
    it(`should show ?? with a space at the beginning if timestamp is ${friendlyName}`, function () {
      const props = {...DEFAULT_PROPS, show: true, timestamp: val}
      const wrapper = shallow(<Duration {...props} />)
      expect(wrapper.find(locator('duration'))).to.have.text(' ??')
    })
  })

  it('should display an abbreviated duration with a space at the beginning', function () {
    fixTime('2018-02-18T23:38:00Z')
    const props = {...DEFAULT_PROPS, show: true, timestamp: '2000-12-01T00:00:00Z'}
    const wrapper = shallow(<Duration {...props} />)
    expect(wrapper.find(locator('duration'))).to.have.text(' 17y')
    expect(wrapper.find(locator('duration'))).to.have.prop('aria-hidden', true)
  })

  it('should include a visually hidden full description for screen readers', function () {
    fixTime('2018-02-18T23:38:00Z')
    const props = {...DEFAULT_PROPS, show: true, timestamp: '2000-12-01T00:00:00Z'}
    const wrapper = shallow(<Duration {...props} />)
    expect(childText(wrapper, VisuallyHidden)).to.have.text(' about 17 years.')
  })
})
