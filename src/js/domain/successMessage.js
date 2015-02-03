var $ = require('jquery')

module.exports = {

    ifImage: function (message, trueCallback, falseCallback) {
        if (isUrl(message)) {
            trueCallback(message)
        } else {
            falseCallback(message)
        }
    }
}

function isUrl(message) {
    return startsWith(message, 'http')
}

function startsWith(s, prefix) {
    return s.lastIndexOf(prefix, 0) === 0
}