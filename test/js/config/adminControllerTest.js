var $ = require('jquery')
var adminController = require('../../../src/js/config/adminController')
var config = require('../../../src/js/config/config')

describe('Configurable build monitor', function () {

    describe('get projects', function () {
        it('gets the projects using the api', function () {
            var projectNames = ['proj-1', 'proj-2']
            spyOn($, "ajax").and.callFake(function(e) {
                e.success(projectNames);
            })
            spyOn(config, 'load').and.returnValue({cctray: 'some-url'})
            var callbackFunction = function (data) { }

            var projects = adminController.getProjects(config, callbackFunction)

            expect($.ajax).toHaveBeenCalledWith({
                    type: 'GET',
                    url: '/api/projects',
                    timeout: jasmine.any(Number),
                    data: {url: 'some-url'}, dataType: "json",
                    beforeSend: jasmine.any(Function),
                    complete: jasmine.any(Function),
                    success: callbackFunction,
                    error: jasmine.any(Function)})
        })

        it('shows and hides spinner whilst getting projects', function () {
            var adminView = {showSpinner: function () { }, hideSpinner: function () {}}
            spyOn($, "ajax").and.callFake(function(e) {
                e.beforeSend()
                e.complete()
            })
            spyOn(adminView, 'showSpinner')
            spyOn(adminView, 'hideSpinner')

            adminController.getProjects(config, null, adminView.showSpinner, adminView.hideSpinner)

            expect(adminView.showSpinner).toHaveBeenCalled()
            expect(adminView.hideSpinner).toHaveBeenCalled()
        })
    })

    it('saves the included projects to local storage', function () {
        spyOn(localStorage, 'setItem')

        adminController.saveIncludedProjects(['proj-1', 'proj-2'])

        expect(localStorage.setItem).toHaveBeenCalledWith('includedProjects', ['proj-1', 'proj-2'])
    })


    it('saves success text', function () {
        spyOn(localStorage, 'setItem')

        adminController.saveSuccessText('anything')

        expect(localStorage.setItem).toHaveBeenCalledWith('successText', 'anything')
    })

    it('saves all projects', function() {
        spyOn(localStorage, 'setItem')

        adminController.saveSeenProjects(['proj-1', 'proj-2'])

        expect(localStorage.setItem).toHaveBeenCalledWith('seenProjects', ['proj-1', 'proj-2'])
    })

})
