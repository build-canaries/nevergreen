var repository = require('./repository')
var messages = require('../controllers/messages')
var _ = require('lodash')

module.exports = {
    saveSuccessMessages: function (messages) {
        var filteredMessages = _.filter(messages, function (message) {
            return !_.isEmpty(message)
        })
        repository.save('successMessages', filteredMessages)
    },

    getSuccessMessages: function () {
        return repository.getArrayOr('successMessages', [])
    },

    hasSuccessMessages: function () {
        return repository.exists('successMessages')
    }
}
