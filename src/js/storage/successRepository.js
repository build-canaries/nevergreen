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
        },

        randomSuccessMessage: function () {
            return randomFrom(this.getSuccessMessages())
        }
    }
}

function randomFrom(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}
