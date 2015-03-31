var repository = require('./repository')

module.exports = {
    getTrays: function () {
        return repository.getArrayOr('trays', [])
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

    saveTrays: function (trays) {
        repository.save('trays', trays)
    },

    saveTray: function (id, tray) {
        repository.saveObject(id, tray)
    }
}
