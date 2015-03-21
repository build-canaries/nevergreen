module.exports = {
    newMessage: function (value) {
        return {
            message: value, // Deprecated, use value instead
            value: value,
            isUrl: isUrl(value)
        }
    }
}

function isUrl(value) {
    return startsWith(value, 'http')
}

function startsWith(str, prefix) {
    return str && str.lastIndexOf(prefix, 0) === 0
}