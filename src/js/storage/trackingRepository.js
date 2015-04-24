var repository = require('./repository')
var _ = require('lodash')

module.exports = {
    getTrays: function () {
        return repository.getOr('trays', [])
    },

    getTray: function (id) {
        return repository.getObjectOr(id, {
            url: '',
            username: '',
            password: '',
            includedProjects: [],
            previousProjects: []
        })
    },

    removeTray: function (id) {
        repository.clear(id)
    },

    getTraysContent: function () {
        return _.map(this.getTrays(), function (id) {
            return this.getTray(id)
        }, this)
    },

    saveTrays: function (trays) {
        repository.save('trays', trays)
    },

    saveTray: function (id, tray) {
        repository.save(id, tray)
    }
}
