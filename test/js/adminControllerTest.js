describe('Configurable build monitor', function () {
    var config = new Config()

    it('gets the projects using the api', function () {
        var projectNames = ['proj-1', 'proj-2']
        spyOn($, 'getJSON').and.callFake(function (_) {
            return $.Deferred().resolve(projectNames).promise()
        })
        spyOn(config, 'load').and.returnValue({cctray: 'some-url'})
        var callbackFunction = function (data) {
        }

        var projects = new AdminController(config).getProjects(callbackFunction)

        expect($.getJSON).toHaveBeenCalledWith('/api/projects', {url: 'some-url'}, callbackFunction)
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
