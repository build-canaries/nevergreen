var repository = require('./repository')
var messages = require('../controllers/messages')
var _ = require('lodash')

module.exports = {
    saveSuccessMessages: function (messages) {
        var filteredMessages = _.filter(messages, function (message) {
            return !_.isEmpty(message.value)
        })
        repository.save('successMessages', filteredMessages.map(function (message) {
            return message.value
        }))
    },

    getSuccessMessages: function () {
        return repository.getArrayOr('successMessages', []).map(function (value) {
            return messages.newMessage(value)
        })
    },

    hasSuccessMessages: function () {
        return repository.exists('successMessages')
    },

    randomSuccessMessage: function () {
        return randomFrom(this.getSuccessMessages())
    }
}

function randomFrom(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}
