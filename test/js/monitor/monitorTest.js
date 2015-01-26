var $ = require('jquery')
var monitor = require('../../../src/js/monitor/monitor')

describe('monitor view', function () {

    var testInstance

    var trackingRepositoryMock = {
        isReady: function () {
        },
        getCctray: function () {
        },
        getIncludedProjects: function () {
        },
        getServerType: function () {
        }
    }

    var appenderMock = {
        addProjects: function () {
        }
    }

    beforeEach(function () {
        testInstance = monitor(trackingRepositoryMock, appenderMock)
    })

    it('loads index page', function () {
        spyOn(trackingRepositoryMock, 'isReady').and.returnValue(true)
        spyOn(trackingRepositoryMock, 'getCctray').and.returnValue('some-url')
        spyOn(trackingRepositoryMock, 'getIncludedProjects').and.returnValue(['a', 'b', 'c'])
        spyOn(trackingRepositoryMock, 'getServerType').and.returnValue('server-type')
        spyOn($, 'ajax')

        testInstance.updateBuildMonitor()

        expect($.ajax).toHaveBeenCalledWith({
            url: '/api/projects',
            type: 'POST',
            data: {
                cctray: 'some-url',
                includedProjects: ['a', 'b', 'c'],
                serverType: 'server-type'
            },
            dataType: 'json',
            timeout: jasmine.any(Number),
            success: jasmine.any(Function),
            error: jasmine.any(Function)
        })
    })

    it('loads config page', function () {
        spyOn(trackingRepositoryMock, 'isReady').and.returnValue(false)
        spyOn(window.location, 'replace')

        testInstance.updateBuildMonitor()

        expect(window.location.replace).toHaveBeenCalledWith('config')
    })

    it('handles errors', function () {
        var $body = $('body');
        $body.empty()
        $body.append('<div id="projects"/>')

        spyOn(trackingRepositoryMock, 'isReady').and.returnValue(true)
        spyOn($, 'ajax').and.callFake(function (e) {
            e.error({status: 'code', statusText: 'reason'})
        })

        testInstance.updateBuildMonitor()

        expect($('#projects')).toContainHtml('reason')
    })
})
