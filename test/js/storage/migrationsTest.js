var migrations = require('../../../src/js/storage/migrations')

describe('migrations', function () {

    describe('eggplant migrations', function () {
        beforeEach(function () {
            localStorage.clear()

            addKeys(['cctray', 'includedProjects', 'previousCctray', 'seenProjects', 'serverType', 'successImageUrl', 'successText'])
        })

        it('run (idempotently)', function () {
            migrations.migrate()
            migrations.migrate()
            migrations.migrate()

            expect(localStorage.getItem('successMessages')).toEqual('successText,successImageUrl')

            expectToHaveBeenRemoved(['successImageUrl', 'successText'])
            expectToBeUnchanged(['cctray', 'includedProjects', 'previousCctray', 'seenProjects', 'serverType'])
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