var $ = require('jquery')
var Updater = require('../../../src/js/monitor/monitor')

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
        var updater = new Updater(config)

        updater.updateBuildMonitor()

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
        var updater = new Updater(config)

        updater.updateBuildMonitor()

        expect($.post).not.toHaveBeenCalled()
        expect(window.location.replace).toHaveBeenCalledWith('config')
    })
})
