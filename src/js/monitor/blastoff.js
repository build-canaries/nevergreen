module.exports = function () {
    var config = require('../config/config')
    var monitor = require('./monitor')

    var fiveSeconds = 5000

    monitor(config).init()

    // run immediately
    monitor(config).updateBuildMonitor()

    // now run every 5 seconds
    setInterval(function () {
        monitor(config).updateBuildMonitor()
    }, fiveSeconds)
}
