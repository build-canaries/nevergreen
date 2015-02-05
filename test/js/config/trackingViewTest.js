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
        },
        saveUsername: function () {
        },
        savePassword: function () {
        }
    }

    var projectsViewMock = {
        findIncludedProjects: function () {
        },
        searching: function () {
        },
        includeAll: function () {
        },
        excludeAll: function () {
        },
        listProjects: function () {
        },
        noProjects: function () {}
    }

    var configViewMock = {
        showSpinner: function () {
        },
        hideSpinner: function () {
        },
        errorHandler: function () {
        }
    }

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
            spyOn(projectsViewMock, 'noProjects')

            view.init()

            expect(adminControllerMock.getProjects).not.toHaveBeenCalled()
            expect(projectsViewMock.noProjects).toHaveBeenCalled()
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
            spyOn(trackingRepositoryMock, 'savePassword')

            view.appendProjects([], 'encrypted-password')

            expect(trackingRepositoryMock.saveIncludedProjects).toHaveBeenCalled()
            expect(trackingRepositoryMock.savePassword).toHaveBeenCalledWith('encrypted-password')
        })

        it('dont save password if it is not there', function () {
            spyOn(trackingRepositoryMock, 'saveIncludedProjects')
            spyOn(trackingRepositoryMock, 'savePassword')

            view.appendProjects([], null)

            expect(trackingRepositoryMock.saveIncludedProjects).toHaveBeenCalled()
            expect(trackingRepositoryMock.savePassword).not.toHaveBeenCalled()
        })
    })

    describe('getting projects', function() {
        it('gets projects with correct parameters', function () {
            spyOn(adminControllerMock, 'getProjects')
            spyOn(projectsViewMock, 'searching')
            spyOn(trackingRepositoryMock, 'saveUsername')
            $body.append('<input id="username"/><input id="password"/>')
            $('#username').val('user')
            $('#password').val('pass')

            view.getProjects()

            expect(projectsViewMock.searching).toHaveBeenCalled()
            expect(trackingRepositoryMock.saveUsername).toHaveBeenCalledWith('user')
            expect(adminControllerMock.getProjects)
                .toHaveBeenCalledWith(trackingRepositoryMock.getCctray(), 'user', 'pass', view.appendProjects, configViewMock.showSpinner, configViewMock.hideSpinner, configViewMock.errorHandler)
        })
    })

})

function pressReturnEvent() {
    var e = jQuery.Event('keypress');
    e.which = 13;
    e.keyCode = 13;
    return e
}
