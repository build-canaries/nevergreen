var $ = require('jquery')
var updater = require('../../../src/js/monitor/monitor')

describe('Monitor page', function () {
    it('loads index page', function () {
        var config = {
            load: function () {
                return {cctray: 'url', includedProjects: ['foo']}
            },
            isReady: function () {
                return true
            }
        }
        spyOn($, 'post')

        updater(config).updateBuildMonitor()

        expect($.post).toHaveBeenCalledWith('/api/projects', jasmine.any(Object), jasmine.any(Function), 'json')
    })

    it('loads config page', function () {
        var config = {
            load: function () {
                return {cctray: null, includedProjects: null}
            },
            isReady: function () {
                return false
            }
        }
        spyOn(window.location, 'replace')
        spyOn($, 'post')

        updater(config).updateBuildMonitor()

        expect($.post).not.toHaveBeenCalled()
        expect(window.location.replace).toHaveBeenCalledWith('config')
    })
})
