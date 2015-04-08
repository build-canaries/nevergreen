var _ = require('lodash')

module.exports = {
    exists: function (key) {
        return !_.isEmpty(_.trim(localStorage.getItem(key)))
    },

    getObjectOr: function (key, defaultValues) {
        return this.exists(key) ? _.assign({}, defaultValues, JSON.parse(localStorage.getItem(key))) : defaultValues
    },

    getOr: function (key, defaultValue) {
        return this.exists(key) ? JSON.parse(localStorage.getItem(key)) : defaultValue
    },

    save: function (key, value) {
        if (!_.isNull(value) && !_.isUndefined(value)) {
            localStorage.setItem(key, JSON.stringify(value, trimReplacer))
        }
    },

    clear: function (key) {
        localStorage.removeItem(key)
    },

    isEmpty: function () {
        return localStorage.length === 0
    }
}

function trimReplacer(key, value) {
    if (_.isString(value)) {
        return _.trim(value)
    }
    return value
}