var $ = require('jquery')
var controller = require('../../../src/js/config/adminController')

describe('Configurable build monitor', function () {

    var trackingRepositoryMock = {
        getServerType: function () {
        },
        saveServerType: function () {
        },
        getUsername: function () {
        },
        getPassword: function () {
        },
        getCctray: function () {
        }
    }
    var configViewMock = {
        showSpinner: function () {
        },
        hideSpinner: function () {
        },
        errorHandler: function () {
        }
    }
    var adminController = controller(trackingRepositoryMock, configViewMock)

    beforeEach(function () {
        $.ajax.isSpy = false
    })

    describe('get projects', function () {
        it('gets the projects without authentication', function () {
            var projectNames = ['proj-1', 'proj-2']
            spyOn($, 'ajax').and.callFake(function (e) {
                e.success(projectNames);
            })
            var callbackFunction = function (data) {
            }
            spyOn(trackingRepositoryMock, 'getServerType').and.returnValue('go')
            spyOn(trackingRepositoryMock, 'getCctray').and.returnValue('some-url')

            adminController.getProjects(callbackFunction)

            expect($.ajax).toHaveBeenCalledWith({
                type: 'GET',
                url: '/api/projects',
                data: {
                    url: 'some-url',
                    serverType: 'go'
                },
                dataType: 'json',
                timeout: jasmine.any(Number),
                beforeSend: jasmine.any(Function),
                complete: jasmine.any(Function),
                success: jasmine.any(Function),
                error: jasmine.any(Function)
            })
        })

        it('uses authentication', function () {
            var projectNames = ['proj-1', 'proj-2']
            spyOn($, 'ajax').and.callFake(function (e) {
                e.success(projectNames);
            })
            var callbackFunction = function (data) {}
            spyOn(trackingRepositoryMock, 'getServerType').and.returnValue('go')
            spyOn(trackingRepositoryMock, 'getCctray').and.returnValue('some-url')
            spyOn(trackingRepositoryMock, 'getUsername').and.returnValue('some-username')
            spyOn(trackingRepositoryMock, 'getPassword').and.returnValue('some-password')

            adminController.getProjects(callbackFunction)

            expect($.ajax).toHaveBeenCalledWith({
                type: 'GET',
                url: '/api/projects',
                data: {
                    url: 'some-url',
                    serverType: 'go',
                    username: 'some-username',
                    password: 'some-password'
                },
                dataType: 'json',
                timeout: jasmine.any(Number),
                beforeSend: jasmine.any(Function),
                complete: jasmine.any(Function),
                success: jasmine.any(Function),
                error: jasmine.any(Function)
            })
        })

        it('shows and hides spinner whilst getting projects', function () {
            spyOn($, 'ajax').and.callFake(function (e) {
                e.beforeSend()
                e.complete()
            })
            spyOn(configViewMock, 'showSpinner')
            spyOn(configViewMock, 'hideSpinner')

            adminController.getProjects(function(){})

            expect(configViewMock.showSpinner).toHaveBeenCalled()
            expect(configViewMock.hideSpinner).toHaveBeenCalled()
        })
    })

    describe('encryption', function () {
        it('sends password to be encrypted', function () {
            spyOn($, 'ajax')

            adminController.encryptPassword('a-password')

            expect($.ajax).toHaveBeenCalledWith({
                type: 'POST',
                url: '/api/encrypt',
                data: {
                    password: 'a-password'
                },
                dataType: 'json',
                timeout: jasmine.any(Number),
                beforeSend: jasmine.any(Function),
                complete: jasmine.any(Function),
                success: jasmine.any(Function),
                error: jasmine.any(Function)
            })
        })

        it('shows and hides spinner whilst encrypting password', function () {
            spyOn($, 'ajax').and.callFake(function (e) {
                e.beforeSend()
                e.complete()
            })
            spyOn(configViewMock, 'showSpinner')
            spyOn(configViewMock, 'hideSpinner')

            adminController.encryptPassword('password', function(){})

            expect(configViewMock.showSpinner).toHaveBeenCalled()
            expect(configViewMock.hideSpinner).toHaveBeenCalled()
        })
    })

})
