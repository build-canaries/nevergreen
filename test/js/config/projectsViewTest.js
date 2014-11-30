var $ = require('jquery')
var projectView = require('../../../src/js/config/projectsView')

describe('view logic', function () {

    var saveProjects = function () { }
    var config = {
        isReady: function () { return true },
        includesProject: function () { return true },
    }

    beforeEach(function () {
        $('body').empty()
        $('body').append('<div id="projects"/>')
        view = projectView(saveProjects)
    })

    it('prints a list of project names to the dom', function () {
        view.listProjects(config, [
            {'name': 'foo'},
            {'name': 'bar'}
        ])

        expect($('#projects ul li').size()).toBe(2)
        expect($('#projects ul li:first').text()).toEqual('bar')
    })

    it('highlights news projects', function () {
        view.listProjects(config, [
            {'name': 'foo'},
            {'name': 'bar'}
        ])

        expect($('#projects ul li:first').html()).toEqual('bar <sup>new</sup>')
        expect($('#projects ul li:last').text()).toEqual('foo')
    })

    it('clears out the projects before adding them', function () {
        view.listProjects(config, [{'name': 'foo'}, {'name': 'bar'}])
        view.listProjects(config, [{'name': 'foo'}, {'name': 'bar'}])

        expect($('#projects ul li').size()).toBe(2)
    })

    it('projects should only be included if the user has included them', function () {
        var config = {
            isReady: function () { return true },
            includesProject: function (name) { return name === 'foo' }
        }

        view.listProjects(config, [
            {'name': 'foo'},
            {'name': 'bar'}
        ])

        expect($('#projects ul li:first')).not.toHaveClass('included')
        expect($('#projects ul li:last')).toHaveClass('included')
    })

    describe('projects click', function () {
        it('project gets classes added', function () {
            view.listProjects(config, [
                {'name': 'foo'},
                {'name': 'bar'}
            ])
            var project = $('#projects ul li:first')
            expect(project).toHaveClass('included')
            expect(project).toHaveClass('no-text-selection')

            project.click()

            expect(project).not.toHaveClass('included')
        })

        it('project gets saved in local storage', function () {
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

            expect($('#projects ul li:last')).toHaveClass('included')
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
