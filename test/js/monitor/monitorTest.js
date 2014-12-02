var $ = require('jquery')
var updater = require('../../../src/js/monitor/monitor')

describe('Monitor page', function () {
     it('loads index page', function () {
        var config = {
            load: function () { return {cctray: 'url', includedProjects: ['foo']} },
            isReady: function () { return true }
        }
        spyOn($, 'ajax')

        updater(config).updateBuildMonitor()

         expect($.ajax).toHaveBeenCalledWith(
             {   url: '/api/projects',
                 type: 'POST',
                 data: jasmine.any(Object),
                 dataType: 'json',
                 success: jasmine.any(Function),
                 error: jasmine.any(Function)
             })
    })

    it('loads config page', function () {
        var config = {
            load: function () { return {cctray: null, includedProjects: null} },
            isReady: function () { return false }
        }
        spyOn(window.location, 'replace')

        updater(config).updateBuildMonitor()

        expect(window.location.replace).toHaveBeenCalledWith('config')
    })

    it('handles errors', function() {
        $('body').empty()
        $('body').append('<div id="projects"/>')
        var config = {
            load: function () { return {cctray: 'url', includedProjects: ['foo']} },
            isReady: function () { return true }
        }
        spyOn($, 'ajax').and.callFake(function(e) {
            e.error({status: 'code', statusText: 'reason'})
        })

        updater(config).updateBuildMonitor()

        expect($('#projects')).toContainHtml('reason')
    })
})
