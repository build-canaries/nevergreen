module.exports = {
    savePollingTime: function (time) {
        localStorage.setItem('pollingTime', time)
    },

    getPollingTime: function () {
        return getOr('pollingTime', '5')
    },

    getPollingTimeInMilliseconds: function () {
        return this.getPollingTime() * 1000
    }
}

function exists(key) {
    var val = localStorage.getItem(key)
    return val && val.trim().length !== 0
}

function getOr(key, defaultValue) {
    return exists(key) ? localStorage.getItem(key) : defaultValue
}

