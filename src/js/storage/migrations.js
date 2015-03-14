var messages = require('../services/messages')
var successRepository = require('./successRepository')

module.exports = {
    migrate: function () {
        eggplantMigrations(successRepository)
    }
}

function eggplantMigrations(successRepository) {
    var successText = localStorage.getItem('successText')
    var successImageUrl = localStorage.getItem('successImageUrl')
    var successMessages = []

    pushIfSet(successMessages, messages.newMessage(successText))
    pushIfSet(successMessages, messages.newMessage(successImageUrl))

    if (successMessages.length > 0) {
        successRepository.saveSuccessMessages(successMessages)
    }

    localStorage.removeItem('successText')
    localStorage.removeItem('successImageUrl')
}

function pushIfSet(arr, val) {
    if (val.message && val.message.trim().length !== 0) {
        arr.push(val)
    }
}
