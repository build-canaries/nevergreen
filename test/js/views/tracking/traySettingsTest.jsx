jest.dontMock('../../../../src/js/views/tracking/traySettings.jsx')

describe('tray setting', function () {
    var React, TestUtils, TraySettings, callback, component, trackingRepositoryMock

    beforeEach(function () {
        React = require('react/addons')
        TestUtils = React.addons.TestUtils
        TraySettings = require('../../../../src/js/views/tracking/traySettings.jsx').TraySettings
        trackingRepositoryMock = require('../../../../src/js/storage/trackingRepository')

        callback = jest.genMockFunction()
    })

    describe('changes value of show stage', function () {
        it('on change', function () {
            trackingRepositoryMock.getTray.mockReturnValue({username: '', showStage: false})
            component = TestUtils.renderIntoDocument(<TraySettings trayId={'id'} removeTray={function(){}}/>)

            TestUtils.Simulate.change(component.refs.showStage.getDOMNode())

            expect(trackingRepositoryMock.saveTray).toBeCalledWith('id', {username: '', showStage: true})
        })
    })
})
