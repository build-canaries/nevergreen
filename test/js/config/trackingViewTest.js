var $ = require('jquery')
var trackingView = require('../../../src/js/config/trackingView')

describe('tracking view', function () {

    var view
    var $body = $('body')

    var adminControllerMock = {
        getProjects: function () {
        },
        saveSeenProjects: function () {
        },
        encryptPasswordAndGetProjects: function () {
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
        },
        getUsername: function () {
        },
        getPassword: function () {
        },
        clearAuthDetails: function () {
        },
        setIsAuthenticated: function () {
        },
        isAuthenticated: function () {
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
        it('saves projects', function () {
            spyOn(trackingRepositoryMock, 'saveIncludedProjects')

            view.appendProjects([])

            expect(trackingRepositoryMock.saveIncludedProjects).toHaveBeenCalled()
        })

        it('encrypts password if should be authenticated', function () {
            spyOn(view, 'encryptPasswordAndGetProjects')
            spyOn(view, 'getProjects')
            spyOn(trackingRepositoryMock, 'isAuthenticated').and.returnValue(true)
            $body.append('<input id="cctray-fetch" type="button"/><input id="is-authenticated" type="checkbox">')

            view.init()
            $('#cctray-fetch').trigger('click')

            expect(view.encryptPasswordAndGetProjects).toHaveBeenCalled()
            expect(view.getProjects).not.toHaveBeenCalled()
        })

        it('doesnt encrypt password if not authenticated', function () {
            spyOn(view, 'encryptPasswordAndGetProjects')
            spyOn(view, 'getProjects')
            spyOn(trackingRepositoryMock, 'isAuthenticated').and.returnValue(false)
            $body.append('<input id="cctray-fetch" type="button"/>')

            view.init()
            $('#cctray-fetch').trigger('click')

            expect(view.encryptPasswordAndGetProjects).not.toHaveBeenCalled()
            expect(view.getProjects).toHaveBeenCalled()
        })

        it('updates password input to be encrypted password', function () {
            spyOn(trackingRepositoryMock, 'getPassword').and.returnValue('encrypted-password')
            spyOn(trackingRepositoryMock, 'isAuthenticated').and.returnValue(true)
            $body.append('<input id="password">')

            view.appendProjects([])

            expect($('#password').val()).toBe('encrypted-password')
        })
    })

    describe('getting projects', function() {
        it('gets projects with correct parameters', function () {
            spyOn(projectsViewMock, 'searching')
            spyOn(adminControllerMock, 'getProjects')

            view.getProjects()

            expect(projectsViewMock.searching).toHaveBeenCalled()
            expect(adminControllerMock.getProjects).toHaveBeenCalledWith(view.appendProjects)
        })

        it('gets projects with username and password', function () {
            spyOn(adminControllerMock, 'getProjects')
            spyOn(trackingRepositoryMock, 'saveUsername')
            spyOn(trackingRepositoryMock, 'savePassword')
            $body.append('<input id="username"/>')
            $('#username').val('user')

            view.getProjectsWithUsernameAndPassword({password: 'encrypted-password'})

            expect(trackingRepositoryMock.saveUsername).toHaveBeenCalledWith('user')
            expect(trackingRepositoryMock.savePassword).toHaveBeenCalledWith('encrypted-password')
            expect(adminControllerMock.getProjects).toHaveBeenCalledWith(view.appendProjects)
        })


    })

    describe('encrypt password', function() {
        it('get encrypted password', function() {
            spyOn(adminControllerMock, 'encryptPasswordAndGetProjects')
            $body.append('<input id="password"/>')
            $('#password').val('pass')

            view.encryptPasswordAndGetProjects()

            expect(adminControllerMock.encryptPasswordAndGetProjects).toHaveBeenCalledWith('pass', view.getProjectsWithUsernameAndPassword)
        })
    })

    describe('authentication group', function () {
        it('hides authentication when not authenticated', function () {
            spyOn(trackingRepositoryMock, 'setIsAuthenticated')
            spyOn(trackingRepositoryMock, 'clearAuthDetails')
            $body.append('<input id="is-authenticated" type="checkbox" checked/><div id="authentication-group"></div>')
            view.addEventHandlers()

            $('#is-authenticated').trigger('click')

            expect(trackingRepositoryMock.setIsAuthenticated).toHaveBeenCalledWith(false)
            expect($('#authentication-group')).toHaveClass('visuallyhidden')
            expect(trackingRepositoryMock.clearAuthDetails).toHaveBeenCalled()
        })

        it('shows authentication when authenticated', function () {
            spyOn(trackingRepositoryMock, 'setIsAuthenticated')
            $body.append('<input id="is-authenticated" type="checkbox"/><div id="authentication-group" class="visuallyhidden"></div>')
            view.addEventHandlers()

            $('#is-authenticated').trigger('click')

            expect(trackingRepositoryMock.setIsAuthenticated).toHaveBeenCalledWith(true)
            expect($('#authentication-group')).not.toHaveClass('visuallyhidden')
        })

        it('auto loads username and password', function () {
            spyOn(trackingRepositoryMock, 'isAuthenticated').and.returnValue(true)
            spyOn(trackingRepositoryMock, 'getUsername').and.returnValue('username')
            spyOn(trackingRepositoryMock, 'getPassword').and.returnValue('password')
            $body.append('<div id="authentication-group" class="visuallyhidden"></div>' +
            '<input id="username"><input id="password">' +
            '<input id="is-authenticated" type="checkbox">')

            view.init()

            expect($('#username').val()).toBe('username')
            expect($('#password').val()).toBe('password')
            expect($('#authentication-group')).not.toHaveClass('visuallyhidden')
        })
    })

})

function pressReturnEvent() {
    var e = jQuery.Event('keypress');
    e.which = 13;
    e.keyCode = 13;
    return e
}
