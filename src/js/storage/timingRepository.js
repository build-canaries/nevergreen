var repository = require('./repository')

module.exports = {
    savePollingTime: function (time) {
        repository.save('pollingTime', time)
    },

    getPollingTime: function () {
        return parseInt(repository.getOr('pollingTime', 5))
    },

    getPollingTimeInMilliseconds: function () {
        return this.getPollingTime() * 1000
    }
}
