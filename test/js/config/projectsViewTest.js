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

            expect($('#projects input').size()).toBe(2)
            expect($('#projects label:first').text().trim()).toEqual('bar')
        })

        it('clears out the projects before adding them', function () {
            view.listProjects(config, [{'name': 'foo'}, {'name': 'bar'}])
            view.listProjects(config, [{'name': 'foo'}, {'name': 'bar'}])

            expect($('#projects input').size()).toBe(2)
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

            expect($('#projects label:first').html()).toContain('bar <sup class="config-new-project">new</sup>')
            expect($('#projects label:last').text().trim()).toEqual('foo')
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

            expect($('#projects input:first')).not.toBeChecked()
            expect($('#projects input:last')).toBeChecked()
        })
    })

    describe('projects click', function () {
        it('adds an included class when clicked', function () {
            view.listProjects(config, [
                {'name': 'foo'},
                {'name': 'bar'}
            ])
            var project = $('#projects input:first')
            expect(project).toBeChecked()
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
            var project = $('#projects input:first')

            project.click()

            expect(observer.saveProjects).toHaveBeenCalled()
        })
    })

    describe('include and exclude all buttons', function () {
        beforeEach(function () {
            $('body').empty()
            $('body').append('<input id="save-projects"/>')
            $('body').append('<input id="include-all"/>')
            $('body').append('<input id="exclude-all"/>')
            $('body').append('<div id="projects">' +
            '<input>proj-1</input>' +
            '<input>proj-2</input>' +
            '<input>proj-3</input>' +
            '</div>')
        })

        it('includes all click will add class included to all projects', function () {
            view.includeAll()

            expect($('#projects input:last')).toBeChecked()
        })

        it('excludes all click will remove class included from all projects', function () {
            view.excludeAll()

            expect($('#projects input:first')).not.toHaveClass('included')
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
