var uuid = require('node-uuid')
var _ = require('lodash')
var repository = require('./repository')

function pushIfSet(arr, val) {
    if (!_.isEmpty(val)) {
        arr.push(val)
    }
}

function remove(keys) {
    _.forEach(keys, function (key) {
        localStorage.removeItem(key)
    })
}

function unescapeCommas(value) {
    return value.replace(new RegExp('&#44;', 'g'), ',')
}

function getArray(key) {
    return localStorage.getItem(key).split(',').map(unescapeCommas)
}

function escapeCommas(value) {
    return value.replace(new RegExp(',', 'g'), '&#44;')
}

function makeSafe(value) {
    return escapeCommas(_.trim(value))
}

module.exports = {
    migrate: function () {
        if (!repository.isEmpty()) {
            this.eggplantMigrations()
            this.fuzzyWuzzyMigrations()
        }
    },

    eggplantMigrations: function () {
        if (!repository.exists('successMessages')) {
            var successText = localStorage.getItem('successText')
            var successImageUrl = localStorage.getItem('successImageUrl')
            var successMessages = []

            pushIfSet(successMessages, successText)
            pushIfSet(successMessages, successImageUrl)

            if (successMessages.length > 0) {
                localStorage.setItem('successMessages', successMessages.map(makeSafe))
            }

            remove(['successText', 'successImageUrl'])
        }
    },

    fuzzyWuzzyMigrations: function () {
        if (!repository.exists('trays')) {
            var trayId = uuid.v4();
            repository.save('trays', [trayId])
            repository.save(trayId, {
                url: localStorage.getItem('cctray'),
                includedProjects: localStorage.getItem('includedProjects'),
                previousProjects: localStorage.getItem('seenProjects'),
                serverType: localStorage.getItem('serverType'),
                username: localStorage.getItem('username'),
                password: localStorage.getItem('password')
            })

            remove(['cctray', 'includedProjects', 'seenProjects', 'serverType', 'previousCctray', 'username', 'password', 'isAuthenticated'])

            // Save as json instead of csv
            repository.save('successMessages', getArray('successMessages'))

            // Add a version so migrating in future is easier
            repository.save('version-major', '0')
            repository.save('version-minor', '6')
            repository.save('version-revision', '0')
        }
    }
}
