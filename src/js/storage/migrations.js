var messages = require('../controllers/messages')
var successRepository = require('./successRepository')
var uuid = require('node-uuid')
var _ = require('lodash')

module.exports = {
    migrate: function () {
        this.eggplantMigrations()
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
            localStorage.setItem('trays', trayId)
            localStorage.setItem(trayId, JSON.stringify({
                url: localStorage.getItem('cctray'),
                includedProjects: localStorage.getItem('includedProjects'),
                retrievedProjects: localStorage.getItem('seenProjects'),
                serverType: localStorage.getItem('serverType'),
                username: localStorage.getItem('username'),
                password: localStorage.getItem('password')
            }))

            remove(['cctray', 'includedProjects', 'seenProjects', 'serverType', 'previousCctray', 'username', 'password'])
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
