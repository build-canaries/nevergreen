/*eslint no-unused-vars: 1*/
/* Even though it isn't used if React isn't defined the tests fail for some reason... */

describe('available project', () => {
  let ReactDOM, React, TestUtils, AvailableProject, callback

  beforeEach(() => {
    jest.autoMockOff()

    React = require('react')
    ReactDOM = require('react-dom')
    TestUtils = require('react-addons-test-utils')
    AvailableProject = require('../../../../src/js/views/tracking/availableProject.js')

    jest.autoMockOn()

    callback = jest.genMockFunction()
  })

  describe('calls the add select project function', () => {

    it('does on change of the checkbox to checked', () => {
      const component = TestUtils.renderIntoDocument(<AvailableProject name='some-name' included={false}
                                                                       wasRemoved={false} isNew={false}
                                                                       selectProject={callback}/>)

      TestUtils.Simulate.change(ReactDOM.findDOMNode(component.refs.toggleIncluded), {target: {checked: true}})
      expect(callback).toBeCalledWith(true)
    })

    it('does on change of the checkbox to unchecked', () => {
      const component = TestUtils.renderIntoDocument(<AvailableProject name='some-name' included={true}
                                                                       wasRemoved={false}
                                                                       isNew={false} selectProject={callback}/>)

      TestUtils.Simulate.change(ReactDOM.findDOMNode(component.refs.toggleIncluded), {target: {checked: false}})
      expect(callback).toBeCalledWith(false)
    })

  })

  describe('rendering info', () => {

    it('renders the name', () => {
      const component = TestUtils.renderIntoDocument(<AvailableProject name='some-name' included={false}
                                                                       wasRemoved={false} isNew={false}
                                                                       selectProject={callback}/>)
      expect(TestUtils.findRenderedDOMComponentWithTag(component, 'p').textContent).toContain('some-name')
    })

    it('renders if the project is new', () => {
      const component = TestUtils.renderIntoDocument(<AvailableProject name='some-name' included={false}
                                                                       wasRemoved={false} isNew={true}
                                                                       selectProject={callback}/>)
      expect(TestUtils.findRenderedDOMComponentWithTag(component, 'p').textContent).toContain('new')
    })

    it('renders if the project was removed', () => {
      const component = TestUtils.renderIntoDocument(<AvailableProject name='some-name' included={false}
                                                                       wasRemoved={true}
                                                                       isNew={false} selectProject={callback}/>)
      expect(TestUtils.findRenderedDOMComponentWithTag(component, 'p').textContent).toContain('removed')
    })

  })
})
