jest.dontMock('../../../../src/js/views/tracking/addTray.jsx')

var React = require('react/addons')
var TestUtils = React.addons.TestUtils
var AddTray = require('../../../../src/js/views/tracking/addTray.jsx').AddTray

describe('add tray component', function () {
    describe('calls the add tray function', function () {
        var callback, component

        beforeEach(function () {
            callback = jest.genMockFunction()
            component = TestUtils.renderIntoDocument(<AddTray addTray={callback}/>)
        })

        it('does on click of the add button', function () {
            TestUtils.Simulate.click(component.refs.addButton.getDOMNode())
            expect(callback).toBeCalled()
        })

        it('does on pressing enter in the url input', function () {
            TestUtils.Simulate.keyPress(component.refs.urlInput.getDOMNode(), {key: 'Enter'})
            expect(callback).toBeCalled()
        })

        it('does on pressing enter in the username input', function () {
            TestUtils.Simulate.keyPress(component.refs.usernameInput.getDOMNode(), {key: 'Enter'})
            expect(callback).toBeCalled()
        })

        it('does on pressing enter in the password input', function () {
            TestUtils.Simulate.keyPress(component.refs.passwordInput.getDOMNode(), {key: 'Enter'})
            expect(callback).toBeCalled()
        })

        it('passes the state to the callback', function () {
            TestUtils.Simulate.change(component.refs.urlInput.getDOMNode(), {target: {value: 'some-url'}})
            TestUtils.Simulate.change(component.refs.usernameInput.getDOMNode(), {target: {value: 'some-username'}})
            TestUtils.Simulate.change(component.refs.passwordInput.getDOMNode(), {target: {value: 'some-password'}})
            TestUtils.Simulate.click(component.refs.addButton.getDOMNode())
            expect(callback).toBeCalledWith({
                url: 'some-url',
                username: 'some-username',
                password: 'some-password'
            })
        })
    })
})
