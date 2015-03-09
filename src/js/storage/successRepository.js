module.exports = function (repository) {

    return {
        saveSuccessMessages: function (messages) {
            repository.save('successMessages', messages)
        },

        getSuccessMessages: function () {
            return repository.getArrayOr('successMessages', []).map(function (message) {
                return {
                    message: message,
                    isUrl: isUrl(message)
                }
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

function isUrl(message) {
    return startsWith(message, 'http')
}

function startsWith(s, prefix) {
    return s.lastIndexOf(prefix, 0) === 0
}