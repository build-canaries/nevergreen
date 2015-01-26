var $ = require('jquery')
var adminController = require('../../../src/js/config/adminController')

describe('Configurable build monitor', function () {

    describe('get projects', function () {
        it('gets the projects using the api', function () {
            var projectNames = ['proj-1', 'proj-2']
            spyOn($, 'ajax').and.callFake(function (e) {
                e.success(projectNames);
            })
            var callbackFunction = function (data) {
            }

            var projects = adminController.getProjects('some-url', callbackFunction)

            expect($.ajax).toHaveBeenCalledWith({
                type: 'GET',
                url: '/api/projects',
                data: {url: 'some-url'},
                dataType: 'json',
                timeout: jasmine.any(Number),
                beforeSend: jasmine.any(Function),
                complete: jasmine.any(Function),
                success: jasmine.any(Function),
                error: jasmine.any(Function)
            })
        })

        it('shows and hides spinner whilst getting projects', function () {
            var condigView = {
                showSpinner: function () {
                },
                hideSpinner: function () {
                }
            }
            spyOn($, 'ajax').and.callFake(function (e) {
                e.beforeSend()
                e.complete()
            })
            spyOn(condigView, 'showSpinner')
            spyOn(condigView, 'hideSpinner')

            adminController.getProjects('some-url', null, condigView.showSpinner, condigView.hideSpinner)

            expect(condigView.showSpinner).toHaveBeenCalled()
            expect(condigView.hideSpinner).toHaveBeenCalled()
        })
    })

})
