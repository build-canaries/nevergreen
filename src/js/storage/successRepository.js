module.exports = {

    saveSuccessText: function (text) {
        localStorage.setItem('successText', text.trim())
    },

    getSuccessText: function () {
        return getOr('successText', '')
    },

    saveSuccessImageUrl: function (url) {
        localStorage.setItem('successImageUrl', url.trim())
    },

    getSuccessImageUrl: function () {
        return getOr('successImageUrl', '')
    },

    hasSuccessImageUrl: function () {
        return exists('successImageUrl')
    }
}

function exists(key) {
    var val = localStorage.getItem(key)
    return val && val.trim().length !== 0
}

function getOr(key, defaultValue) {
    return exists(key) ? localStorage.getItem(key) : defaultValue
}
