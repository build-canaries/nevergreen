module.exports = function () {
    var trackingRepository = require('../storage/trackingRepository')
    var successRepository = require('../storage/successRepository')
    var monitor = require('./monitor')(trackingRepository, successRepository)

    var fiveSeconds = 5000

    monitor.init()

    // run immediately
    monitor.updateBuildMonitor()

    // now run every 5 seconds
    setInterval(function () {
        monitor.updateBuildMonitor()
    }, fiveSeconds)
}
