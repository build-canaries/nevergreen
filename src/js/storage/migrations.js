var versionGateway = require('../gateways/versionGateway')
var repository = require('./repository')
var versionRepository = require('./versionRepository')
var semver = require('semver')

function saveLatestVersion() {
    versionGateway.getVersion().done(function (version) {
        versionRepository.saveVersion(version)
    })
}

function clearSettingsIfSavedByOlderVersion() {
    if (semver.lt(versionRepository.getVersion(), '0.7.0')) {
        console.log('Clearing local storage as it was saved by an older version, see issue #94 for more details!')

        repository.clear()
        saveLatestVersion()
    }
}

module.exports = {
    migrate: function () {
        clearSettingsIfSavedByOlderVersion()
    }
}
