import React from 'react'
import {shallow} from 'enzyme'
import {AvailableProjects} from '../../../../src/client/tracking/projects/AvailableProjects'
import {noop} from 'lodash'
import {buildProject, change, childText, locator} from '../../testHelpers'

describe('<AvailableProjects/>', () => {

  const DEFAULT_PROPS = {
    trayId: '',
    index: 1,
    errors: [],
    projects: [],
    selected: [],
    selectProject: noop,
    refreshTray: noop,
    url: ''
  }

  it('should show tray errors', () => {
    const props = {...DEFAULT_PROPS, errors: ['some-error']}
    const wrapper = shallow(<AvailableProjects {...props} />)
    expect(wrapper.find(locator('errors')).prop('messages')).toContain('some-error')
  })

  it('should show a warning if there are no projects', () => {
    const props = {...DEFAULT_PROPS, projects: []}
    const wrapper = shallow(<AvailableProjects {...props} />)
    expect(wrapper.find(locator('no-projects-warning')).exists()).toBeTruthy()
  })

  it('should show a warning if no projects match the filter', () => {
    const props = {...DEFAULT_PROPS, projects: [buildProject({projectId: '1', name: 'foo'})]}
    const wrapper = shallow(<AvailableProjects {...props} />)
    change(wrapper.find(locator('filter')), 'bar')
    expect(wrapper.find(locator('filter-warning')).exists()).toBeTruthy()
  })

  it('should show an error if the filter is invalid', () => {
    const props = {...DEFAULT_PROPS, projects: [buildProject({projectId: '1', name: 'foo'})]}
    const wrapper = shallow(<AvailableProjects {...props} />)
    change(wrapper.find(locator('filter')), '?')
    expect(wrapper.find(locator('invalid-filter')).exists()).toBeTruthy()
  })

  describe('accessibility', () => {

    it('should have a visually hidden title', () => {
      const props = {...DEFAULT_PROPS}
      const wrapper = shallow(<AvailableProjects {...props} />)
      expect(childText(wrapper, locator('title'))).toEqual('Available projects')
    })

    it('should announce projects if a user refreshes', () => {
      const props = {...DEFAULT_PROPS, errors: [], projects: [buildProject({projectId: '1', name: '1'})]}
      const wrapper = shallow(<AvailableProjects {...props} />)
      expect(wrapper.find(locator('available-projects-list')).prop('aria-live')).toEqual('polite')
    })

    // This is because we first mark removed projects by disabling the checkbox and adding a disabled label.
    // The user would need to refresh again to actually remove the project checkbox from the DOM, at which
    // point they should already know the project has been removed and thus it doesn't need to be announced
    it('should only announce project additions', () => {
      const props = {...DEFAULT_PROPS, errors: [], projects: [buildProject({projectId: '1', name: '1'})]}
      const wrapper = shallow(<AvailableProjects {...props} />)
      expect(wrapper.find(locator('available-projects-list')).prop('aria-relevant')).toEqual('additions')
    })
  })
})
