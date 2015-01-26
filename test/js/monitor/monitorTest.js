var $ = require('jquery')
var monitor = require('../../../src/js/monitor/monitor')

describe('Monitor page', function () {
    var storageRepositoryMock = {
        isReady: function () {
        },
        getCctray: function () {
        },
        getIncludedProjects: function () {
        },
        getServerType: function () {
        }
    }

    it('loads index page', function () {
        spyOn(storageRepositoryMock, 'isReady').and.returnValue(true)
        spyOn(storageRepositoryMock, 'getCctray').and.returnValue('some-url')
        spyOn(storageRepositoryMock, 'getIncludedProjects').and.returnValue(['a', 'b', 'c'])
        spyOn(storageRepositoryMock, 'getServerType').and.returnValue('server-type')
        spyOn($, 'ajax')

        monitor(storageRepositoryMock).updateBuildMonitor()

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
        spyOn(storageRepositoryMock, 'isReady').and.returnValue(false)
        spyOn(window.location, 'replace')

        monitor(storageRepositoryMock).updateBuildMonitor()

        expect(window.location.replace).toHaveBeenCalledWith('config')
    })

    it('handles errors', function () {
        $('body').empty()
        $('body').append('<div id="projects"/>')

        spyOn(storageRepositoryMock, 'isReady').and.returnValue(true)
        spyOn($, 'ajax').and.callFake(function (e) {
            e.error({status: 'code', statusText: 'reason'})
        })

        monitor(storageRepositoryMock).updateBuildMonitor()

        expect($('#projects')).toContainHtml('reason')
    })
})
