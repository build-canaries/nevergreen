/*eslint no-unused-vars: 1*/
/* Even though it isn't used if React isn't defined the tests fail for some reason... */

jest.dontMock('../../../../src/js/views/tracking/availableProject.js')

describe('available project', function () {
  let ReactDOM, React, TestUtils, AvailableProject, callback

  beforeEach(function () {
    React = require('react')
    ReactDOM = require('react-dom')
    TestUtils = require('react-addons-test-utils')
    AvailableProject = require('../../../../src/js/views/tracking/availableProject.js')

    callback = jest.genMockFunction()
  })

  describe('calls the add select project function', function () {

    it('does on change of the checkbox to checked', function () {
      const component = TestUtils.renderIntoDocument(<AvailableProject name='some-name' included={false}
                                                                       wasRemoved={false} isNew={false}
                                                                       selectProject={callback}/>)

      TestUtils.Simulate.change(ReactDOM.findDOMNode(component.refs.toggleIncluded), {target: {checked: true}})
      expect(callback).toBeCalledWith(true)
    })

    it('does on change of the checkbox to unchecked', function () {
      const component = TestUtils.renderIntoDocument(<AvailableProject name='some-name' included={true}
                                                                       wasRemoved={false}
                                                                       isNew={false} selectProject={callback}/>)

      TestUtils.Simulate.change(ReactDOM.findDOMNode(component.refs.toggleIncluded), {target: {checked: false}})
      expect(callback).toBeCalledWith(false)
    })

  })

  describe('rendering info', function () {

    it('renders the name', function () {
      const component = TestUtils.renderIntoDocument(<AvailableProject name='some-name' included={false}
                                                                       wasRemoved={false} isNew={false}
                                                                       selectProject={callback}/>)
      expect(TestUtils.findRenderedDOMComponentWithTag(component, 'p').textContent).toContain('some-name')
    })

    it('renders if the project is new', function () {
      const component = TestUtils.renderIntoDocument(<AvailableProject name='some-name' included={false}
                                                                       wasRemoved={false} isNew={true}
                                                                       selectProject={callback}/>)
      expect(TestUtils.findRenderedDOMComponentWithTag(component, 'p').textContent).toContain('new')
    })

    it('renders if the project was removed', function () {
      const component = TestUtils.renderIntoDocument(<AvailableProject name='some-name' included={false}
                                                                       wasRemoved={true}
                                                                       isNew={false} selectProject={callback}/>)
      expect(TestUtils.findRenderedDOMComponentWithTag(component, 'p').textContent).toContain('removed')
    })

  })
})
