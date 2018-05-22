import {childText, forUndisplayablesStrings, locator} from '../TestUtils'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
import {setSystemTime} from '../FakeTimers'
import VisuallyHidden from '../../../src/client/common/VisuallyHidden'
import Duration from '../../../src/client/common/Duration'

describe('<Duration/>', function () {

  const DEFAULT_PROPS = {
    abbreviate: null,
    timestamp: null,
    fullDescriptionPrefix: null,
    fullDescriptionSuffix: null
  }

  describe('abbreviated', function () {

    forUndisplayablesStrings((val, friendlyName) => {
      it(`should show ?? if timestamp is ${friendlyName}`, function () {
        const props = {...DEFAULT_PROPS, abbreviate: true, timestamp: val}
        const wrapper = shallow(<Duration {...props} />)
        expect(wrapper.find(locator('duration'))).to.have.text('??')
      })
    })

    it('should display an abbreviated duration that is hidden from screen readers', function () {
      setSystemTime('2018-02-18T23:38:00Z')
      const props = {...DEFAULT_PROPS, abbreviate: true, timestamp: '2000-12-01T00:00:00Z'}
      const wrapper = shallow(<Duration {...props} />)
      expect(wrapper.find(locator('duration'))).to.have.text('17y')
      expect(wrapper.find(locator('duration'))).to.have.prop('aria-hidden', true)
    })

    it('should include a visually hidden full description for screen readers', function () {
      setSystemTime('2018-02-18T23:38:00Z')
      const props = {...DEFAULT_PROPS, abbreviate: true, timestamp: '2000-12-01T00:00:00Z'}
      const wrapper = shallow(<Duration {...props} />)
      expect(childText(wrapper, VisuallyHidden)).to.have.text('about 17 years.')
    })
  })

  it('should display the given prefix', function () {
    setSystemTime('2018-02-18T23:38:00Z')
    const props = {
      ...DEFAULT_PROPS,
      abbreviate: false,
      timestamp: '2000-12-01T00:00:00Z',
      fullDescriptionPrefix: 'some prefix'
    }
    const wrapper = shallow(<Duration {...props} />)
    expect(wrapper.find(locator('duration'))).to.have.text('some prefix about 17 years')
  })

  it('should display the given suffix', function () {
    setSystemTime('2018-02-18T23:38:00Z')
    const props = {
      ...DEFAULT_PROPS,
      abbreviate: false,
      timestamp: '2000-12-01T00:00:00Z',
      fullDescriptionSuffix: 'some suffix'
    }
    const wrapper = shallow(<Duration {...props} />)
    expect(wrapper.find(locator('duration'))).to.have.text('about 17 years some suffix')
  })
})
