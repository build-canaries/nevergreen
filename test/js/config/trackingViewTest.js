var $ = require('jquery')
var trackingView = require('../../../src/js/config/trackingView')

describe('tracking view', function () {

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

    var view

    beforeEach(function () {
        $('body').empty()
        $('body').append('<div id="projects"/>')
        localStorage.clear()
        view = trackingView(adminControllerMock, trackingRepositoryMock, projectsViewMock, configViewMock)
    })

    describe('autoloads projects', function () {
        it('does if cctray is available', function () {
            spyOn(trackingRepositoryMock, 'hasCctray').and.returnValue(true)
            spyOn(trackingRepositoryMock, 'getCctray')
            spyOn(adminControllerMock, 'getProjects')

            view.init()

            expect(adminControllerMock.getProjects).toHaveBeenCalled()
            expect(trackingRepositoryMock.getCctray).toHaveBeenCalled()
        })

        it('does not if cctray is unavailable', function () {
            spyOn(trackingRepositoryMock, 'hasCctray').and.returnValue(false)
            spyOn(adminControllerMock, 'getProjects')

            view.init()

            expect(adminControllerMock.getProjects).not.toHaveBeenCalled()
        })
    })

    describe('cctray url', function () {
        it('saves on return key press', function () {
            spyOn(trackingRepositoryMock, 'saveCctray')

            $('body').append('<form>' +
            '<input id="cctray-url" type=text>' +
            '</form>')

            view.init()
            $('#cctray-url').val('some-url')

            // press return event
            var e = jQuery.Event('keypress');
            e.which = 13;
            e.keyCode = 13;
            $('#cctray-url').trigger(e);

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
