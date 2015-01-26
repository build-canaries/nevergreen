module.exports = function () {
    var storageRepository = require('../config/storageRepository')
    var monitor = require('./monitor')

    var fiveSeconds = 5000

    monitor(storageRepository).init()

    // run immediately
    monitor(storageRepository).updateBuildMonitor()

    // now run every 5 seconds
    setInterval(function () {
        monitor(storageRepository).updateBuildMonitor()
    }, fiveSeconds)
}
