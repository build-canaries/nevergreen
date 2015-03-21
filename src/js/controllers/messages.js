var successRepository = require('../storage/successRepository')

module.exports = {
    randomMessage: function (successCallback) {
        successCallback(randomFrom(successRepository.getSuccessMessages()))
    },

    isUrl: function (value) {
        return isUrl(value)
    }
}

function isUrl(value) {
    return startsWith(value, 'http')
}

function startsWith(str, prefix) {
    return str && str.lastIndexOf(prefix, 0) === 0
}

function randomFrom(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}
