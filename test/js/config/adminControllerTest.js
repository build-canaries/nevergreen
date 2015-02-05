var $ = require('jquery')
var adminController = require('../../../src/js/config/adminController')

describe('Configurable build monitor', function () {

    describe('get projects', function () {
        it('gets the projects without authentication', function () {
            var projectNames = ['proj-1', 'proj-2']
            spyOn($, 'ajax').and.callFake(function (e) {
                e.success(projectNames);
            })
            var callbackFunction = function (data) {
            }

            adminController.getProjects('some-url', null, null, callbackFunction)

            expect($.ajax).toHaveBeenCalledWith({
                type: 'GET',
                url: '/api/projects',
                data: {
                    url: 'some-url',
                    serverType: null
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
            var callbackFunction = function (data) {
            }
            localStorage.setItem('serverType', 'go')

            adminController.getProjects('some-url', 'some-username', 'some-password', callbackFunction)

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
            var configView = {
                showSpinner: function () {
                },
                hideSpinner: function () {
                }
            }
            spyOn($, 'ajax').and.callFake(function (e) {
                e.beforeSend()
                e.complete()
            })
            spyOn(configView, 'showSpinner')
            spyOn(configView, 'hideSpinner')

            adminController.getProjects('some-url', 'some-username', 'some-password', null, configView.showSpinner, configView.hideSpinner)

            expect(configView.showSpinner).toHaveBeenCalled()
            expect(configView.hideSpinner).toHaveBeenCalled()
        })
    })

})
