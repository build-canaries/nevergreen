import {childText, forUndisplayableStrings, locator} from '../testHelpers'
import React from 'react'
import {shallow} from 'enzyme'
import {setSystemTime} from '../clock'
import {VisuallyHidden} from '../../../src/client/common/VisuallyHidden'
import {Duration} from '../../../src/client/common/Duration'

describe('<Duration/>', () => {

  const DEFAULT_PROPS = {
    abbreviate: null,
    timestamp: null,
    fullDescriptionPrefix: null,
    fullDescriptionSuffix: null
  }

  describe('abbreviated', () => {

    forUndisplayableStrings((val, friendlyName) => {
      test(`should show ?? if timestamp is ${friendlyName}`, () => {
        const props = {...DEFAULT_PROPS, abbreviate: true, timestamp: val}
        const wrapper = shallow(<Duration {...props} />)
        expect(wrapper.find(locator('duration')).text()).toEqual('??')
      })
    })

    test(
      'should display an abbreviated duration that is hidden from screen readers',
      () => {
        setSystemTime('2018-02-18T23:38:00Z')
        const props = {...DEFAULT_PROPS, abbreviate: true, timestamp: '2000-12-01T00:00:00Z'}
        const wrapper = shallow(<Duration {...props} />)
        expect(wrapper.find(locator('duration')).text()).toEqual('17y')
        expect(wrapper.find(locator('duration')).prop('aria-hidden')).toBeTruthy()
      }
    )

    test(
      'should include a visually hidden full description for screen readers',
      () => {
        setSystemTime('2018-02-18T23:38:00Z')
        const props = {...DEFAULT_PROPS, abbreviate: true, timestamp: '2000-12-01T00:00:00Z'}
        const wrapper = shallow(<Duration {...props} />)
        expect(childText(wrapper, VisuallyHidden)).toEqual('about 17 years.')
      }
    )
  })

  test('should display the given prefix', () => {
    setSystemTime('2018-02-18T23:38:00Z')
    const props = {
      ...DEFAULT_PROPS,
      abbreviate: false,
      timestamp: '2000-12-01T00:00:00Z',
      fullDescriptionPrefix: 'some prefix'
    }
    const wrapper = shallow(<Duration {...props} />)
    expect(wrapper.find(locator('duration')).text()).toEqual('some prefix about 17 years')
  })

  test('should display the given suffix', () => {
    setSystemTime('2018-02-18T23:38:00Z')
    const props = {
      ...DEFAULT_PROPS,
      abbreviate: false,
      timestamp: '2000-12-01T00:00:00Z',
      fullDescriptionSuffix: 'some suffix'
    }
    const wrapper = shallow(<Duration {...props} />)
    expect(wrapper.find(locator('duration')).text()).toEqual('about 17 years some suffix')
  })
})
