import {describe, it} from 'mocha'
import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
import AvailableProjects from '../../../../src/client/tracking/projects/AvailableProjects'
import Messages from '../../../../src/client/common/messages/Messages'
import noop from 'lodash/noop'

describe('<AvailableProjects/>', function () {
  const DEFAULT_PROPS = {
    trayId: '',
    index: 1,
    errors: null,
    projects: [],
    selected: [],
    selectProject: noop,
    timestamp: null,
    refreshTray: noop,
    pendingRequest: null,
    url: ''
  }

  it('should render errors', function () {
    const props = Object.assign({}, DEFAULT_PROPS, {errors: ['some-error']})
    const wrapper = shallow(<AvailableProjects {...props} />)
    expect(wrapper.find(Messages)).to.have.prop('messages').that.contains('some-error')
  })
})
