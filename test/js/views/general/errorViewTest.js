jest.dontMock('../../../../src/js/views/general/errorView.js')

function textFrom(element) {
  return element.getDOMNode().textContent
}

describe('error view', function () {

  var React, TestUtils, ErrorView

  beforeEach(function () {
    React = require('react')
    TestUtils = require('react-addons-test-utils')
    ErrorView = require('../../../../src/js/views/general/errorView.js')
  })

  it('renders with a default reason', function () {
    var component = TestUtils.renderIntoDocument(<ErrorView />)
    var div = TestUtils.findRenderedDOMComponentWithClass(component, 'error-message')
    expect(textFrom(div)).toContain('unknown')
  })

  it('renders the given reason', function () {
    var component = TestUtils.renderIntoDocument(<ErrorView reason='some-reason'/>)
    var div = TestUtils.findRenderedDOMComponentWithClass(component, 'error-message')
    expect(textFrom(div)).toContain('some-reason')
  })

  it('renders a different message if no status is returned', function () {
    var component = TestUtils.renderIntoDocument(<ErrorView status={0}/>)
    var div = TestUtils.findRenderedDOMComponentWithClass(component, 'error-message')
    expect(textFrom(div)).toEqual('Nevergreen is not responding')
  })
})
