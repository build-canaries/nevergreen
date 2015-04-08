var repository = require('./repository')
var _ = require('lodash')

module.exports = {
    saveSuccessMessages: function (messages) {
        var filteredMessages = _.filter(messages, function (message) {
            return !_.isEmpty(message)
        })
        repository.save('successMessages', filteredMessages)
    },

    getSuccessMessages: function () {
        return repository.getOr('successMessages', ['=(^.^)='])
    },

    hasSuccessMessages: function () {
        return repository.exists('successMessages')
    }
}
