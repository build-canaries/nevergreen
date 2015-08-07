jest.dontMock('../../../../src/js/views/tracking/availableProject.jsx')

describe('available project', function () {
    var React, TestUtils, AvailableProject, callback

    beforeEach(function () {
        React = require('react/addons')
        TestUtils = React.addons.TestUtils
        AvailableProject = require('../../../../src/js/views/tracking/availableProject.jsx').AvailableProject

        callback = jest.genMockFunction()
    })

    describe('calls the add select project function', function () {

        it('does on change of the checkbox to checked', function () {
            var component = TestUtils.renderIntoDocument(<AvailableProject name='some-name' included={false} wasRemoved={false} isNew={false} selectProject={callback}/>)

            TestUtils.Simulate.change(component.refs.toggleIncluded.getDOMNode(), {target: {checked: true}})
            expect(callback).toBeCalledWith(true)
        })

        it('does on change of the checkbox to unchecked', function () {
            var component = TestUtils.renderIntoDocument(<AvailableProject name='some-name' included={true} wasRemoved={false} isNew={false} selectProject={callback}/>)

            TestUtils.Simulate.change(component.refs.toggleIncluded.getDOMNode(), {target: {checked: false}})
            expect(callback).toBeCalledWith(false)
        })

    })

    describe('rendering info', function () {

        it('renders the name', function () {
            var component = TestUtils.renderIntoDocument(<AvailableProject name='some-name' included={false} wasRemoved={false} isNew={false} selectProject={callback}/>)
            expect(component.getDOMNode().textContent).toContain('some-name')
        })

        it('renders if the project is new', function () {
            var component = TestUtils.renderIntoDocument(<AvailableProject name='some-name' included={false} wasRemoved={false} isNew={true} selectProject={callback}/>)
            expect(component.getDOMNode().textContent).toContain('new')
        })

        it('renders if the project was removed', function () {
            var component = TestUtils.renderIntoDocument(<AvailableProject name='some-name' included={false} wasRemoved={true} isNew={false} selectProject={callback}/>)
            expect(component.getDOMNode().textContent).toContain('removed')
        })

    })
})
