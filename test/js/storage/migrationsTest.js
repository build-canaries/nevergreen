jest.dontMock('node-uuid')
jest.dontMock('../../../src/js/storage/repository')
jest.dontMock('../../../src/js/storage/migrations')

var _ = require('lodash')
var migrations = require('../../../src/js/storage/migrations')

function expectToBeUnchanged(keys) {
    keys.map(function (key) {
        expect(localStorage.getItem(key)).toEqual(key)
    })
}

function expectToHaveBeenRemoved(keys) {
    keys.map(function (key) {
        expect(localStorage.getItem(key)).toBeNull()
    })
}

function addKeys(keys) {
    keys.map(function (key) {
        localStorage.setItem(key, key)
    })
}

describe('migrations', function () {

    describe('eggplant migrations', function () {
        beforeEach(function () {
            localStorage.clear()

            addKeys(['cctray', 'includedProjects', 'previousCctray', 'seenProjects', 'serverType', 'successImageUrl', 'successText'])
        })

        it('adds successMessages list by copying values from successText and successImageUrl', function () {
            migrations.eggplantMigrations()

            expect(localStorage.getItem('successMessages')).toEqual('successText,successImageUrl')
        })

        it('removes the previous success message/image entries', function () {
            migrations.eggplantMigrations()

            expectToHaveBeenRemoved(['successImageUrl', 'successText'])
        })

        it('does not touch all the other entries', function () {
            migrations.eggplantMigrations()

            expectToBeUnchanged(['cctray', 'includedProjects', 'previousCctray', 'seenProjects', 'serverType'])
        })
    })

    describe('fuzzy wuzzy migrations', function () {
        beforeEach(function () {
            localStorage.clear()

            addKeys(['cctray', 'includedProjects', 'previousCctray', 'seenProjects', 'serverType', 'successMessages', 'username', 'password', 'isAuthenticated', 'pollingTime'])
        })

        it('adds trays entry with a generated uuid', function () {
            migrations.fuzzyWuzzyMigrations()

            expect(localStorage.getItem('trays')).toMatch(/^\["\w{8}-\w{4}-\w{4}-\w{4}-\w{12}"]$/)
        })

        it('adds a json encoded tray under the same key as saved into the trays array', function () {
            migrations.fuzzyWuzzyMigrations()

            var trayId = _.first(JSON.parse(localStorage.getItem('trays')))
            var tray = JSON.parse(localStorage.getItem(trayId))

            expect(tray).toEqual(jasmine.objectContaining({
                url: 'cctray',
                includedProjects: 'includedProjects',
                previousProjects: 'seenProjects',
                serverType: 'serverType',
                username: 'username',
                password: 'password'
            }))
        })

        it('does not run if trays is already set up', function () {
            localStorage.setItem('trays', ['some-id'])

            spyOn(localStorage, 'setItem')

            migrations.fuzzyWuzzyMigrations()

            expect(localStorage.setItem).not.toHaveBeenCalled()
        })

        it('removes the migrated entries and previousCctray', function () {
            migrations.fuzzyWuzzyMigrations()

            expectToHaveBeenRemoved(['cctray', 'includedProjects', 'seenProjects', 'serverType', 'previousCctray', 'username', 'password', 'isAuthenticated'])
        })

        it('saves the success messages as json', function () {
            migrations.fuzzyWuzzyMigrations()

            expect(localStorage.getItem('successMessages')).toEqual('["successMessages"]')
        })

        it('does not touch all the other entries', function () {
            migrations.fuzzyWuzzyMigrations()

            expectToBeUnchanged(['pollingTime'])
        })
    })

})
