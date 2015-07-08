jest.dontMock('../../../../src/js/views/success/addMessage.jsx')

var React = require('react/addons')
var TestUtils = React.addons.TestUtils
var AddMessage = require('../../../../src/js/views/success/addMessage.jsx').AddMessage

describe('add message component', function () {
    describe('calls the add message function', function () {
        var callback, component

        beforeEach(function () {
            callback = jest.genMockFunction()
            component = TestUtils.renderIntoDocument(<AddMessage addMessage={callback}/>)
        })

        it('does on click of the add button', function () {
            TestUtils.Simulate.change(component.refs.messageInput.getDOMNode(), {target: {value: 'some-message'}})
            TestUtils.Simulate.click(component.refs.addButton.getDOMNode())
            expect(callback).toBeCalledWith('some-message')
        })

        it('does on pressing enter in the message input', function () {
            TestUtils.Simulate.change(component.refs.messageInput.getDOMNode(), {target: {value: 'some-message'}})
            TestUtils.Simulate.keyPress(component.refs.messageInput.getDOMNode(), {key: 'Enter'})
            expect(callback).toBeCalledWith('some-message')
        })
    })
})
