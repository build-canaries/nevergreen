var messages = require('../controllers/messages')
var successRepository = require('./successRepository')
var uuid = require('node-uuid')
var _ = require('lodash')
var repository = require('./repository')

module.exports = {
    migrate: function () {
        this.eggplantMigrations()
        this.fuzzyWuzzyMigrations()
    },

    eggplantMigrations: function () {
        var successText = localStorage.getItem('successText')
        var successImageUrl = localStorage.getItem('successImageUrl')
        var successMessages = []

        pushIfSet(successMessages, successText)
        pushIfSet(successMessages, successImageUrl)

        if (successMessages.length > 0) {
            successRepository.saveSuccessMessages(successMessages)
        }

        remove(['successText', 'successImageUrl'])
    },

    fuzzyWuzzyMigrations: function () {
        if (_.isEmpty(localStorage.getItem('trays'))) {
            var trayId = uuid.v4();
            repository.save('trays', trayId)
            repository.saveObject(trayId, {
                url: repository.getOr('cctray', ''),
                includedProjects: repository.getArrayOr('includedProjects', []),
                previousProjects: repository.getArrayOr('seenProjects', []),
                serverType: repository.getOr('serverType', ''),
                username: repository.getOr('username', ''),
                password: repository.getOr('password', '')
            })

            remove(['cctray', 'includedProjects', 'seenProjects', 'serverType', 'previousCctray', 'username', 'password', 'isAuthenticated'])
        }
    }
}

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
