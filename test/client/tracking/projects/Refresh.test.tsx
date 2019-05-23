import {locator} from '../../testHelpers'
import React from 'react'
import {shallow} from 'enzyme'
import {Refresh} from '../../../../src/client/tracking/projects/Refresh'
import {Duration} from '../../../../src/client/common/Duration'
import {noop} from 'lodash'

describe('<Refresh/>', () => {

  const DEFAULT_PROPS = {
    index: 1,
    refreshTray: noop
  }

  it('should render projects were fetched "never" if there is no timestamp', () => {
    const props = {...DEFAULT_PROPS, timestamp: undefined}
    const wrapper = shallow(<Refresh {...props} />)
    expect(wrapper.find(locator('refresh-time')).text()).toEqual('projects last refreshed never')
  })

  it('should render how long ago projects were refreshed if a timestamp is given', () => {
    const props = {...DEFAULT_PROPS, timestamp: '2017-06-07T21:40:00+01:00'}
    const wrapper = shallow(<Refresh {...props} />)
    expect(wrapper.find(Duration).exists()).toBeTruthy()
  })
})
