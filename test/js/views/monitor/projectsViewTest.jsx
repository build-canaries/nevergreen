jest.dontMock('../../../../src/js/views/monitor/projectsView.jsx')

function textFrom(element) {
    return element.getDOMNode().textContent
}

describe('add tray component', function () {
    var React, TestUtils, InterestingProjects, projects, component, trackingRepositoryMock

    beforeEach(function () {
        React = require('react/addons')
        TestUtils = React.addons.TestUtils
        InterestingProjects = require('../../../../src/js/views/monitor/projectsView.jsx').InterestingProjects
        trackingRepositoryMock = require('../../../../src/js/storage/trackingRepository')
    })

    describe('showing projects', function () {
        it('shows stage name when project is configured to', function () {
            trackingRepositoryMock.getTray.mockReturnValue({showStage: true})
            projects = [{name: 'proj-1', stage: 'a-stage', prognosis: 'sick'}]
            component = TestUtils.renderIntoDocument(<InterestingProjects projects={projects}/>)

            var div = TestUtils.findRenderedDOMComponentWithClass(component, 'monitor-inner-container')

            var expectedText = projects[0].name + '::' + projects[0].stage
            expect(textFrom(div)).toContain(expectedText)
        })

        it('does not show stage name when it is configured off', function () {
            trackingRepositoryMock.getTray.mockReturnValue({showStage: false})
            projects = [{name: 'proj-2', stage: 'some-stage', prognosis: 'sick'}]
            component = TestUtils.renderIntoDocument(<InterestingProjects projects={projects}/>)

            var div = TestUtils.findRenderedDOMComponentWithClass(component, 'monitor-inner-container')

            expect(textFrom(div)).not.toContain(projects[0].stage)
        })
    })
})
