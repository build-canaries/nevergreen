module.exports = {
    exists: function (key) {
        var val = localStorage.getItem(key)
        return val && val.trim().length !== 0
    },

    getOr: function (key, defaultValue) {
        return this.exists(key) ? localStorage.getItem(key) : defaultValue
    },

    getArrayOr: function (key, defaultValue) {
        return this.exists(key) ? localStorage.getItem(key).split(',').map(unescapeCommas) : defaultValue
    },

    save: function (key, value) {
        if (value != null) {
            var savedValue = isArray(value) ? value.map(makeSafe) : trim(value)
            localStorage.setItem(key, savedValue)
        }
    }
}

function makeSafe(value) {
    return escapeCommas(trim(value))
}

function escapeCommas(value) {
    return value.replace(new RegExp(',', 'g'), '&#44;')
}

function unescapeCommas(value) {
    return value.replace(new RegExp('&#44;', 'g'), ',')
}

function isArray(value) {
    return value.constructor === Array
}

function trim(v) {
    return v.toString().trim()
}