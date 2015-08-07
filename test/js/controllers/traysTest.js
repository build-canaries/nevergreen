jest.dontMock('../../../src/js/controllers/trays')

describe('trays controller', function () {

    var trays

    beforeEach(function () {
        trays = require('../../../src/js/controllers/trays')
    })

    describe('requiresAuth', function () {
        it('true if tray has username and password', function () {
            expect(trays.requiresAuth({
                username: 'some-username',
                password: 'some-password'
            })).toBeTruthy()
        })

        it('false if the tray has no username', function () {
            expect(trays.requiresAuth({password: 'some-password'})).toBeFalsy()
        })

        it('false if the tray has no password', function () {
            expect(trays.requiresAuth({username: 'some-username'})).toBeFalsy()
        })

        it('false if the tray has no username or password', function () {
            expect(trays.requiresAuth({})).toBeFalsy()
        })
    })

    describe('projects', function () {
        it('includes the project name', function () {
            var actualProjects = trays.projects([], [], ['a'])

            expect(actualProjects).toContain(jasmine.objectContaining({name: 'a'}))
        })

        it('does not mark project as new if it is the first time the tray was loaded (previous projects is empty)', function () {
            var actualProjects = trays.projects([], [], ['a'])

            expect(actualProjects).toContain(jasmine.objectContaining({isNew: false}))
        })

        it('marks project as new if not previously loaded but not the first time the tray was loaded', function () {
            var actualProjects = trays.projects([], ['b'], ['a'])

            expect(actualProjects).toContain(jasmine.objectContaining({isNew: true}))
        })

        it('marks project as included', function () {
            var actualProjects = trays.projects(['a'], [], ['a'])

            expect(actualProjects).toContain(jasmine.objectContaining({included: true}))
        })

        it('marks project as not included', function () {
            var actualProjects = trays.projects([], [], ['a'])

            expect(actualProjects).toContain(jasmine.objectContaining({included: false}))
        })

        it('marks project as not included', function () {
            var actualProjects = trays.projects([], [], ['a'])

            expect(actualProjects).toContain(jasmine.objectContaining({included: false}))
        })

        it('marks project as removed', function () {
            var actualProjects = trays.projects([], ['a'], ['b'])

            expect(actualProjects).toContain(jasmine.objectContaining({
                name: 'a',
                wasRemoved: true
            }))
        })

        it('merges projects from included, previous and retrieved', function () {
            var actualProjects = trays.projects(['a', 'b'], ['c', 'd'], ['e', 'f'])

            expect(actualProjects).toEqual([
                jasmine.objectContaining({name: 'a'}),
                jasmine.objectContaining({name: 'b'}),
                jasmine.objectContaining({name: 'c'}),
                jasmine.objectContaining({name: 'd'}),
                jasmine.objectContaining({name: 'e'}),
                jasmine.objectContaining({name: 'f'})
            ])
        })
    })
})
