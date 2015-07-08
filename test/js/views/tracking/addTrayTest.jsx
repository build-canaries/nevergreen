jest.dontMock('../../../../src/js/views/tracking/addTray.jsx')

var React = require('react/addons')
var TestUtils = React.addons.TestUtils
var AddTray = require('../../../../src/js/views/tracking/addTray.jsx').AddTray

describe('add tray component', function () {
    describe('calls the add tray function', function () {
        var callback

        beforeEach(function () {
            callback = jest.genMockFunction()
        })

        it('does on click of the add button', function () {
            var component = TestUtils.renderIntoDocument(<AddTray addTray={callback}/>)
            TestUtils.Simulate.click(component.refs.addButton.getDOMNode())
            expect(callback).toBeCalled()
        })

        it('does on pressing enter in the url input', function () {
            var component = TestUtils.renderIntoDocument(<AddTray addTray={callback}/>)
            TestUtils.Simulate.keyPress(component.refs.urlInput.getDOMNode(), {key: 'Enter'})
            expect(callback).toBeCalled()
        })

        it('does on pressing enter in the username input', function () {
            var component = TestUtils.renderIntoDocument(<AddTray addTray={callback}/>)
            TestUtils.Simulate.keyPress(component.refs.usernameInput.getDOMNode(), {key: 'Enter'})
            expect(callback).toBeCalled()
        })

        it('does on pressing enter in the password input', function () {
            var component = TestUtils.renderIntoDocument(<AddTray addTray={callback}/>)
            TestUtils.Simulate.keyPress(component.refs.passwordInput.getDOMNode(), {key: 'Enter'})
            expect(callback).toBeCalled()
        })
    })
})