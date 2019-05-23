import {locator} from '../../testHelpers'
import React from 'react'
import {shallow} from 'enzyme'
import {AvailableProject} from '../../../../src/client/tracking/projects/AvailableProject'
import {noop} from 'lodash'

describe('<AvailableProject/>', function () {

  const DEFAULT_PROPS = {
    name: '',
    selectProject: noop
  }

  it('should render new tag if the project is new', function () {
    const props = {...DEFAULT_PROPS, isNew: true}
    const wrapper = shallow(<AvailableProject {...props} />)
    expect(wrapper.find(locator('new')).exists()).toBeTruthy()
    expect(wrapper.find(locator('removed')).exists()).toBeFalsy()
  })

  it('should render removed tag if the project was removed', function () {
    const props = {...DEFAULT_PROPS, removed: true}
    const wrapper = shallow(<AvailableProject {...props} />)
    expect(wrapper.find(locator('new')).exists()).toBeFalsy()
    expect(wrapper.find(locator('removed')).exists()).toBeTruthy()
  })

  it('should render the name and stage', function () {
    const props = {...DEFAULT_PROPS, name: 'name', stage: 'stage'}
    const wrapper = shallow(<AvailableProject {...props} />)
    expect(wrapper.find(locator('name')).text()).toEqual('name stage')
  })
})
