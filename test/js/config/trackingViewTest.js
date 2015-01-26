var $ = require('jquery')
var trackingView = require('../../../src/js/config/trackingView')

describe('tracking view', function () {

    var view
    var $body = $('body')

    var adminControllerMock = {
        getProjects: function () {
        },
        saveSeenProjects: function () {
        }
    }

    var trackingRepositoryMock = {
        hasCctray: function () {
        },
        saveCctray: function () {
        },
        saveIncludedProjects: function () {
        },
        getCctray: function () {
        },
        saveSeenProjects: function () {
        },
        cctraySeen: function () {
        }
    }

    var projectsViewMock = {
        findIncludedProjects: function () {
        },
        includeAll: function () {
        },
        excludeAll: function () {
        },
        listProjects: function () {
        }
    }

    var configViewMock = {}

    beforeEach(function () {
        $body.empty()
        $body.append('<div id="projects"/>')
        view = trackingView(adminControllerMock, trackingRepositoryMock, projectsViewMock, configViewMock)
    })

    describe('autoloads projects', function () {
        it('only if cctray is available', function () {
            spyOn(trackingRepositoryMock, 'hasCctray').and.returnValue(true)
            spyOn(trackingRepositoryMock, 'getCctray')
            spyOn(adminControllerMock, 'getProjects')

            view.init()

            expect(adminControllerMock.getProjects).toHaveBeenCalled()
            expect(trackingRepositoryMock.getCctray).toHaveBeenCalled()
        })

        it('expect when cctray is unavailable', function () {
            spyOn(trackingRepositoryMock, 'hasCctray').and.returnValue(false)
            spyOn(adminControllerMock, 'getProjects')

            view.init()

            expect(adminControllerMock.getProjects).not.toHaveBeenCalled()
        })
    })

    describe('cctray url', function () {
        it('saves on return key press', function () {
            spyOn(trackingRepositoryMock, 'saveCctray')

            $body.append('<input id="cctray-url" type="text">')

            view.init()

            var $cctray = $('#cctray-url');
            $cctray.val('some-url')
            $cctray.trigger(pressReturnEvent());

            expect(trackingRepositoryMock.saveCctray).toHaveBeenCalledWith('some-url')
        })
    })

    describe('fetch projects saves afterwards', function () {
        it('saves', function () {
            spyOn(trackingRepositoryMock, 'saveIncludedProjects')

            view.appendProjects([])

            expect(trackingRepositoryMock.saveIncludedProjects).toHaveBeenCalled()
        })
    })

})

function pressReturnEvent() {
    var e = jQuery.Event('keypress');
    e.which = 13;
    e.keyCode = 13;
    return e
}
