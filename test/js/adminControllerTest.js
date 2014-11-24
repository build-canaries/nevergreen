describe('Configurable build monitor', function () {
    var config = new Config()

    describe('get projects', function () {
        it('gets the projects using the api', function () {
            var projectNames = ['proj-1', 'proj-2']
            spyOn($, 'getJSON').and.callFake(function (_) {
                $.Deferred().resolve(projectNames).promise()
                return {complete: function(){}}
            })
            spyOn(config, 'load').and.returnValue({cctray: 'some-url'})
            var callbackFunction = function (data) {
            }

            var projects = new AdminController(config).getProjects(callbackFunction, function(){})

            expect($.getJSON).toHaveBeenCalledWith('/api/projects', {url: 'some-url'}, callbackFunction)
        })

        it('shows and hides spinner whilst getting projects', function () {
            var adminView = {showSpinner: function () {
            }}
            spyOn($, 'getJSON').and.callFake(function (_) {
                $.Deferred().resolve(['foo']).promise()
                return {complete: function(){adminView.showSpinner(false)}}
            })
            spyOn(adminView, 'showSpinner')

            new AdminController(config).getProjects(function (data) {}, adminView.showSpinner)

            expect(adminView.showSpinner).toHaveBeenCalledWith(true)
            expect(adminView.showSpinner).toHaveBeenCalledWith(false)
        })
    })

    it('saves the included projects to local storage', function () {
        spyOn(localStorage, 'setItem')

        new AdminController(config).saveIncludedProjects(['proj-1', 'proj-2'])

        expect(localStorage.setItem).toHaveBeenCalledWith('includedProjects', ['proj-1', 'proj-2'])
    })


    it('saves success text', function () {
        spyOn(localStorage, 'setItem')

        new AdminController(config).saveSuccessText('anything')

        expect(localStorage.setItem).toHaveBeenCalledWith('successText', 'anything')
    })

})

describe('View', function () {
    var config = new Config()

    beforeEach(function () {
        $('body').append('<div id="projects"/>')
    })

    it('clears projects', function () {
        $('#projects').append('some text')

        new AdminController(config).clearProjects()

        expect($('#projects')).toBeEmpty()
    })
})
