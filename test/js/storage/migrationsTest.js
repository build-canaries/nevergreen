/* global describe, it, beforeEach, spyOn, expect */

var migrations = require('../../../src/js/storage/migrations')

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

        it('runs idempotently', function () {
            migrations.eggplantMigrations()
            migrations.eggplantMigrations()
            migrations.eggplantMigrations()

            expect(localStorage.getItem('successMessages')).toEqual('successText,successImageUrl')

            expectToHaveBeenRemoved(['successImageUrl', 'successText'])
            expectToBeUnchanged(['cctray', 'includedProjects', 'previousCctray', 'seenProjects', 'serverType'])
        })
    })

    describe('fuzzy wuzzy migrations', function () {
        beforeEach(function () {
            localStorage.clear()

            addKeys(['cctray', 'includedProjects', 'previousCctray', 'seenProjects', 'serverType', 'successMessages', 'username', 'password'])
        })

        it('adds trays entry with a generated uuid', function () {
            migrations.fuzzyWuzzyMigrations()

            expect(localStorage.getItem('trays')).toMatch(/^\w{8}-\w{4}-\w{4}-\w{4}-\w{12}$/)
        })

        it('adds a json encoded tray under the same key as saved into the trays array', function () {
            migrations.fuzzyWuzzyMigrations()

            var trayId = localStorage.getItem('trays')
            var tray = JSON.parse(localStorage.getItem(trayId))

            expect(tray).toEqual(jasmine.objectContaining({
                url: 'cctray',
                includedProjects: 'includedProjects',
                retrievedProjects: 'seenProjects',
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

            expectToHaveBeenRemoved(['cctray', 'includedProjects', 'seenProjects', 'serverType', 'previousCctray', 'username', 'password'])
        })

        it('does not touch all the other entries', function () {
            migrations.fuzzyWuzzyMigrations()

            expectToBeUnchanged(['successMessages'])
        })
    })

})

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