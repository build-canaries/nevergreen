module.exports = function (repository) {

    return {
        saveSuccessMessages: function (messages) {
            repository.save('successMessages', messages)
        },

        getSuccessMessages: function () {
            return repository.getArrayOr('successMessages', [])
        },

        hasSuccessMessages: function () {
            return repository.exists('successMessages')
        }
    }
}
