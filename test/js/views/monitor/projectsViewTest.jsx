jest.dontMock('../../../../src/js/views/monitor/projectsView.jsx')
    .dontMock('jquery')

function textFrom(element) {
    return element.getDOMNode().textContent
}

describe('projects view', function () {
    var React, TestUtils, InterestingProjects, projects, component, trackingRepositoryMock

    beforeEach(function () {
        React = require('react/addons')
        TestUtils = React.addons.TestUtils
        InterestingProjects = require('../../../../src/js/views/monitor/projectsView.jsx').InterestingProjects
        trackingRepositoryMock = require('../../../../src/js/storage/trackingRepository')
    })

    describe('showing projects', function () {
        it('gets tray associated with project', function () {
            trackingRepositoryMock.getTray.mockReturnValue({showStage: true})
            projects = [{'tray-id': '12345-abcde', name: 'proj-1', stage: 'a-stage', prognosis: 'sick'}]
            component = TestUtils.renderIntoDocument(<InterestingProjects projects={projects}/>)

            expect(trackingRepositoryMock.getTray).toBeCalledWith('12345-abcde')
        })

        it('shows stage name when project is configured to', function () {
            trackingRepositoryMock.getTray.mockReturnValue({showStage: true})
            projects = [{'tray-id': 'some-id', name: 'proj-1', stage: 'a-stage', prognosis: 'sick'}]
            component = TestUtils.renderIntoDocument(<InterestingProjects projects={projects}/>)

            var div = TestUtils.findRenderedDOMComponentWithClass(component, 'monitor-inner-container')

            var expectedText = projects[0].name + ' :: ' + projects[0].stage
            expect(textFrom(div)).toContain(expectedText)
        })

        it('does not show stage name when it is configured off', function () {
            trackingRepositoryMock.getTray.mockReturnValue({showStage: false})
            projects = [{'tray-id': '', name: 'proj-2', stage: 'some-stage', prognosis: 'sick'}]
            component = TestUtils.renderIntoDocument(<InterestingProjects projects={projects}/>)

            var div = TestUtils.findRenderedDOMComponentWithClass(component, 'monitor-inner-container')

            expect(textFrom(div)).not.toContain(projects[0].stage)
        })

        it('does not show stage name when it is null', function () {
            trackingRepositoryMock.getTray.mockReturnValue({showStage: true})
            projects = [{'tray-id': '', name: 'proj-2', stage: null, prognosis: 'sick'}]
            component = TestUtils.renderIntoDocument(<InterestingProjects projects={projects}/>)

            var div = TestUtils.findRenderedDOMComponentWithClass(component, 'monitor-inner-container')

            expect(textFrom(div)).not.toContain(projects[0].name + ' ::')
        })

    })
})
