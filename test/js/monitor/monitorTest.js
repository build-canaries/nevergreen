var $ = require('jquery')
var monitor = require('../../../src/js/monitor/monitor')

describe('Monitor page', function () {
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

    var successRepositoryMock = {
        hasSuccessImageUrl: function () {
        },
        getSuccessImageUrl: function () {
        },
        getSuccessText: function () {
        }
    }

    it('loads index page', function () {
        spyOn(trackingRepositoryMock, 'isReady').and.returnValue(true)
        spyOn(trackingRepositoryMock, 'getCctray').and.returnValue('some-url')
        spyOn(trackingRepositoryMock, 'getIncludedProjects').and.returnValue(['a', 'b', 'c'])
        spyOn(trackingRepositoryMock, 'getServerType').and.returnValue('server-type')
        spyOn($, 'ajax')

        monitor(trackingRepositoryMock, successRepositoryMock).updateBuildMonitor()

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

        monitor(trackingRepositoryMock, successRepositoryMock).updateBuildMonitor()

        expect(window.location.replace).toHaveBeenCalledWith('config')
    })

    it('handles errors', function () {
        $('body').empty()
        $('body').append('<div id="projects"/>')

        spyOn(trackingRepositoryMock, 'isReady').and.returnValue(true)
        spyOn($, 'ajax').and.callFake(function (e) {
            e.error({status: 'code', statusText: 'reason'})
        })

        monitor(trackingRepositoryMock, successRepositoryMock).updateBuildMonitor()

        expect($('#projects')).toContainHtml('reason')
    })
})
