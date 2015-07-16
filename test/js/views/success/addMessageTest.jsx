jest.dontMock('../../../../src/js/views/success/addMessage.jsx')

describe('add message component', function () {

    var React, TestUtils, AddMessage, callback, component

    beforeEach(function () {
        React = require('react/addons')
        TestUtils = React.addons.TestUtils
        AddMessage = require('../../../../src/js/views/success/addMessage.jsx').AddMessage

        callback = jest.genMockFunction()
        component = TestUtils.renderIntoDocument(<AddMessage addMessage={callback}/>)
    })

    describe('calls the add message function', function () {
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
