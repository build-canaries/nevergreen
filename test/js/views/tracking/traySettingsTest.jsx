jest.dontMock('../../../../src/js/views/tracking/traySettings.jsx')

describe('tray setting', function () {
    var React, TestUtils, TraySettings, component, trackingRepositoryMock

    beforeEach(function () {
        React = require('react/addons')
        TestUtils = React.addons.TestUtils
        TraySettings = require('../../../../src/js/views/tracking/traySettings.jsx').TraySettings
        trackingRepositoryMock = require('../../../../src/js/storage/trackingRepository')
    })

    describe('changes value of show stage', function () {
        it('turns show stage on', function () {
            trackingRepositoryMock.getTray.mockReturnValue({username: '', showStage: false})
            component = TestUtils.renderIntoDocument(<TraySettings trayId={'id'} removeTray={function(){}}/>)

            TestUtils.Simulate.change(component.refs.showStage.getDOMNode())

            expect(trackingRepositoryMock.saveTray).toBeCalledWith('id', {username: '', showStage: true})
        })

        it('turns show stage off', function () {
            trackingRepositoryMock.getTray.mockReturnValue({username: '', showStage: true})
            component = TestUtils.renderIntoDocument(<TraySettings trayId={'id'} removeTray={function(){}}/>)

            TestUtils.Simulate.change(component.refs.showStage.getDOMNode())

            expect(trackingRepositoryMock.saveTray).toBeCalledWith('id', {username: '', showStage: false})
        })
    })
})
