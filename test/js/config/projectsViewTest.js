var $ = require('jquery')
var projectView = require('../../../src/js/config/projectsView')

describe('view logic', function () {

    var storageRepositoryMock = {
        isReady: function () {
        },
        cctraySeen: function () {
        },
        projectSeen: function () {
        },
        saveIncludedProjects: function () {
        },
        includesProject: function () {
        }
    }

    beforeEach(function () {
        $('body').empty()
        $('body').append('<div id="projects"/><div id="cctray-url" />')

        view = projectView(storageRepositoryMock)
    })

    describe('adds projects to the dom', function () {
        it('prints a list of project names', function () {
            spyOn(storageRepositoryMock, 'cctraySeen').and.returnValue(false)
            spyOn(storageRepositoryMock, 'includesProject').and.returnValue(true)

            view.listProjects([
                {'name': 'foo'},
                {'name': 'bar'}
            ])

            expect($('#projects input').size()).toBe(2)
            expect($('#projects label:first').text().trim()).toEqual('bar')
        })

        it('clears out the projects before adding them', function () {
            view.listProjects([{'name': 'foo'}, {'name': 'bar'}])
            view.listProjects([{'name': 'foo'}, {'name': 'bar'}])

            expect($('#projects input').size()).toBe(2)
        })

        it('highlights any new projects if not first load', function () {
            spyOn(storageRepositoryMock, 'cctraySeen').and.returnValue(true)
            spyOn(storageRepositoryMock, 'projectSeen').and.returnValue(false)

            view.listProjects([
                {'name': 'foo'}
            ])

            expect($('#projects label:first').html()).toContain('foo <sup class="config-new-project">new</sup>')
        })

        it('does not highlight any new projects on first load as they are all new', function () {
            spyOn(storageRepositoryMock, 'cctraySeen').and.returnValue(false)

            view.listProjects([
                {'name': 'foo'},
                {'name': 'bar'}
            ])

            expect($('#projects label:first').html()).not.toContain('bar <sup class="config-new-project">new</sup>')
        })

        it('remembers what projects the user has selected previously', function () {
            spyOn(storageRepositoryMock, 'isReady').and.returnValue(true)
            spyOn(storageRepositoryMock, 'includesProject').and.callFake(function (val) {
                if (val === 'foo') return true
                if (val === 'bar') return false
            })

            view.listProjects([
                {'name': 'foo'},
                {'name': 'bar'}
            ])

            expect($('#projects input:first')).not.toBeChecked()
            expect($('#projects input:last')).toBeChecked()
        })
    })

    describe('projects click', function () {
        it('adds an included class when clicked', function () {
            view.listProjects([
                {'name': 'foo'},
                {'name': 'bar'}
            ])
            var project = $('#projects input:first')
            expect(project).toBeChecked()
            expect(project).toHaveClass('no-text-selection')

            project.click()

            expect(project).not.toHaveClass('included')
        })
    })

    describe('include and exclude all buttons', function () {
        beforeEach(function () {
            $('body').empty()
            $('body').append(
                '<div id="cctray-url" />' +
                '<input id="save-projects"/>' +
                '<input id="include-all"/>' +
                '<input id="exclude-all"/>' +
                '<div id="projects">' +
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
    })

})
