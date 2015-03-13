var messages = require('../services/messages')

module.exports = function (repository) {

    return {
        saveSuccessMessages: function (messages) {
            repository.save('successMessages', messages.map(function (message) {
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
}

function randomFrom(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}
