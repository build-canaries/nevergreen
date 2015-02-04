module.exports = function (repository) {
    return {
        savePollingTime: function (time) {
            repository.save('pollingTime', time)
        },

        getPollingTime: function () {
            return repository.getOr('pollingTime', '5')
        },

        getPollingTimeInMilliseconds: function () {
            return this.getPollingTime() * 1000
        }
    }
}
