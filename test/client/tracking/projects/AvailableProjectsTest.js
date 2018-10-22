import {describe, it} from 'mocha'
import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
import {AvailableProjects} from '../../../../src/client/tracking/projects/AvailableProjects'
import {Messages} from '../../../../src/client/common/messages/Messages'
import _ from 'lodash'
import {childText, locator} from '../../TestUtils'

describe('<AvailableProjects/>', function () {

  const DEFAULT_PROPS = {
    trayId: '',
    index: 1,
    errors: null,
    projects: [],
    selected: [],
    selectProject: _.noop,
    timestamp: null,
    refreshTray: _.noop,
    url: ''
  }

  it('should render errors', function () {
    const props = {...DEFAULT_PROPS, errors: ['some-error']}
    const wrapper = shallow(<AvailableProjects {...props} />)
    expect(wrapper.find(Messages)).to.have.prop('messages').that.contains('some-error')
  })

  describe('accessibility', function () {

    it('should have a visually hidden title', function () {
      const props = {...DEFAULT_PROPS}
      const wrapper = shallow(<AvailableProjects {...props} />)
      expect(childText(wrapper, locator('title'))).to.have.text('Available projects')
    })

    it('should announce projects if a user refreshes', function () {
      const props = {...DEFAULT_PROPS, errors: null, projects: [{projectId: '1', name: '1'}]}
      const wrapper = shallow(<AvailableProjects {...props} />)
      expect(wrapper.find(locator('available-projects-list'))).to.have.attr('aria-live', 'polite')
    })

    // This is because we first mark removed projects by disabling the checkbox and adding a disabled label.
    // The user would need to refresh again to actually remove the project checkbox from the DOM, at which
    // point they should already know the project has been removed and thus it doesn't need to be announced
    it('should only announce project additions', function () {
      const props = {...DEFAULT_PROPS, errors: null, projects: [{projectId: '1', name: '1'}]}
      const wrapper = shallow(<AvailableProjects {...props} />)
      expect(wrapper.find(locator('available-projects-list'))).to.have.attr('aria-relevant', 'additions')
    })
  })
})
