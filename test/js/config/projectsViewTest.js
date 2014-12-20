var $ = require('jquery')
var projectView = require('../../../src/js/config/projectsView')

describe('view logic', function () {

    var saveProjects = function () { }
    var config = {
        isReady: function () { return true },
        includesProject: function () { return true },
        previouslyFetched: function() { return true }
    }

    beforeEach(function () {
        $('body').empty()
        $('body').append('<div id="projects"/>')
        view = projectView(saveProjects)
    })

    describe('adds projects to the dom', function () {
        it('prints a list of project names', function () {
            view.listProjects(config, [
                {'name': 'foo'},
                {'name': 'bar'}
            ])

            expect($('#projects ul li').size()).toBe(2)
            expect($('#projects ul li:first').text()).toEqual('bar')
        })

        it('clears out the projects before adding them', function () {
            view.listProjects(config, [{'name': 'foo'}, {'name': 'bar'}])
            view.listProjects(config, [{'name': 'foo'}, {'name': 'bar'}])

            expect($('#projects ul li').size()).toBe(2)
        })

        it('highlights any new projects', function () {
            var config = {
                isReady: function () { return true },
                includesProject: function (name) { return name === 'foo' },
                previouslyFetched: function(name) { return name === 'foo' }
            }

            view.listProjects(config, [
                {'name': 'foo'},
                {'name': 'bar'}
            ])

            expect($('#projects ul li:first').html()).toEqual('bar <sup class="config-new-project">new</sup>')
            expect($('#projects ul li:last').text()).toEqual('foo')
        })

        it('remembers what projects the user has selected previously', function () {
            var config = {
                isReady: function () { return true },
                includesProject: function (name) { return name === 'foo' },
                previouslyFetched: function() { return true }
            }

            view.listProjects(config, [
                {'name': 'foo'},
                {'name': 'bar'}
            ])

            expect($('#projects ul li:first')).not.toHaveClass('config-project-included')
            expect($('#projects ul li:last')).toHaveClass('config-project-included')
        })
    })

    describe('projects click', function () {
        it('adds an included class when clicked', function () {
            view.listProjects(config, [
                {'name': 'foo'},
                {'name': 'bar'}
            ])
            var project = $('#projects ul li:first')
            expect(project).toHaveClass('config-project-included')
            expect(project).toHaveClass('no-text-selection')

            project.click()

            expect(project).not.toHaveClass('included')
        })

        it('saves clicked projects to local storage', function () {
            var observer = { saveProjects: function () { } }
            spyOn(observer, 'saveProjects')
            view = projectView(observer.saveProjects)
            view.listProjects(config, [
                {'name': 'bar'},
                {'name': 'foo'}
            ])
            var project = $('#projects ul li:first')

            project.click()

            expect(observer.saveProjects).toHaveBeenCalled()
        })
    })

    describe('include and exclude all buttons', function () {
        beforeEach(function () {
            $('body').empty()
            $('body').append('<input id="save-projects"/>')
            $('body').append('<input id="include-all"/>')
            $('body').append('<div id="projects"><ul>' +
            '<li>proj-1</li>' +
            '<li>proj-2</li>' +
            '<li>proj-3</li>' +
            '</ul></div>')
        })

        it('includes all click will add class included to all projects', function () {
            view.includeAll()

            expect($('#projects ul li:last')).toHaveClass('config-project-included')
        })

        it('excludes all click will remove class included from all projects', function () {
            view.excludeAll()

            expect($('#projects ul li:first')).not.toHaveClass('included')
        })

        it('saves', function () {
            var observer = { saveProjects: function () { } }
            spyOn(observer, 'saveProjects')
            view = projectView(observer.saveProjects)

            view.listProjects(config, [{'name': 'foo'}])
            view.includeAll()

            expect(observer.saveProjects).toHaveBeenCalled()
        })
    })

})
