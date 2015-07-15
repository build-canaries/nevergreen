var repository = require('./repository')

module.exports = {
    getVersion: function () {
        return repository.getOr('version', '0.0.0')
    },

    saveVersion: function (version) {
        repository.save('version', version)
    }
}
