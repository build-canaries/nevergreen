import {describe, it} from 'mocha'
import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
import {AvailableProjects} from '../../../../src/client/tracking/projects/AvailableProjects'
import _ from 'lodash'
import {change, childText, locator} from '../../TestUtils'

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

  it('should show tray errors', function () {
    const props = {...DEFAULT_PROPS, errors: ['some-error']}
    const wrapper = shallow(<AvailableProjects {...props} />)
    expect(wrapper.find(locator('errors'))).to.have.prop('messages').that.contains('some-error')
  })

  it('should show a warning if there are no projects', function () {
    const props = {...DEFAULT_PROPS, projects: []}
    const wrapper = shallow(<AvailableProjects {...props} />)
    expect(wrapper.find(locator('no-projects-warning'))).to.be.present()
  })

  it('should show a warning if no projects match the filter', function () {
    const props = {...DEFAULT_PROPS, projects: [{projectId: '1', name: 'foo'}]}
    const wrapper = shallow(<AvailableProjects {...props} />)
    change(wrapper.find(locator('filter')), 'bar')
    expect(wrapper.find(locator('filter-warning'))).to.be.present()
  })

  it('should show an error if the filter is invalid', function () {
    const props = {...DEFAULT_PROPS, projects: [{projectId: '1', name: 'foo'}]}
    const wrapper = shallow(<AvailableProjects {...props} />)
    change(wrapper.find(locator('filter')), '?')
    expect(wrapper.find(locator('invalid-filter'))).to.be.present()
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
